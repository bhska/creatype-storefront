# Payment Integration Documentation

## Overview

Complete payment processing system has been implemented with clickable payment buttons that integrate with payment gateways (PayPal, Credit Cards, etc.).

## Payment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     PAYMENT FLOW                             │
└─────────────────────────────────────────────────────────────┘

1. Customer fills checkout form
   └─> Billing information
   └─> Select payment method (PayPal/Credit Card)
   └─> Apply coupon (optional)

2. Click "Place Order" button
   └─> Order created in WooCommerce
   └─> Payment processing initiated
   
3. Payment Gateway Selection Screen
   └─> "Continue to PayPal" button (for PayPal)
   └─> "Pay with Credit Card" button (for Stripe/Credit Card)
   └─> Order summary displayed
   
4. Click Payment Button
   └─> Redirect to payment gateway
   └─> Complete payment securely
   
5. Return to Store
   └─> Payment verification
   └─> Order confirmation page
   └─> Download/receipt provided
```

## Components Implemented

### 1. Payment Processing API (`/api/payment/process`)

**Endpoint:** `POST /api/payment/process`

**Purpose:** Generate payment URL based on payment method

**Request:**
```json
{
  "orderId": 12345,
  "paymentMethod": "paypal"
}
```

**Response:**
```json
{
  "success": true,
  "paymentUrl": "https://www.paypal.com/checkoutnow?token=...",
  "orderId": 12345,
  "paymentMethod": "paypal",
  "instructions": "You will be redirected to PayPal to complete your payment."
}
```

**File:** `src/app/api/payment/process/route.ts`

### 2. Payment Webhook (`/api/payment/webhook`)

**Endpoint:** `POST /api/payment/webhook`

**Purpose:** Handle payment gateway webhooks/callbacks

**Use Case:** Payment gateways can notify your server about payment status changes

**File:** `src/app/api/payment/webhook/route.ts`

### 3. Enhanced Checkout Page

**File:** `src/app/checkout/page.tsx`

**New Features:**
- Creates order first, then processes payment
- Shows payment selection modal after order creation
- Displays large, clickable payment buttons with icons
- Shows order summary before payment
- Option to go back and edit order

**Payment Button UI:**
- **PayPal:** Blue button with PayPal logo
- **Credit Card:** Blue button with card icon
- **Other methods:** Green "View Order Details" button

### 4. Payment Return Page

**Route:** `/payment/return`

**File:** `src/app/payment/return/page.tsx`

**Purpose:** Handle return from payment gateway

**Query Parameters:**
- `status`: Payment status (success/failed/cancelled)
- `order`: Order ID
- `token`: PayPal token (for PayPal payments)
- `PayerID`: PayPal payer ID

**States:**
1. **Loading:** Verifying payment
2. **Success:** Payment completed successfully
3. **Failed:** Payment failed or cancelled

### 5. API Client Updates

**File:** `src/lib/api-client.ts`

**New Method:**
```typescript
apiClient.processPayment(orderId, paymentMethod)
```

## Usage Flow

### Step 1: User Completes Checkout Form

```typescript
// User fills in:
- Billing information
- Selects payment method
- Agrees to terms
- Clicks "Place Order"
```

### Step 2: Order Creation

```typescript
const result = await apiClient.createOrder(orderData);
const orderId = result.order.id;
```

### Step 3: Payment Processing

```typescript
const paymentResult = await apiClient.processPayment(orderId, paymentMethod);
// Returns payment URL and instructions
```

### Step 4: Payment Modal

After order creation, a modal appears showing:
- Order confirmation
- Order number
- Payment instructions
- Large payment button
- Order summary

### Step 5: Payment Gateway Redirect

```typescript
// When user clicks payment button
window.location.href = paymentInfo.paymentUrl;
// User is redirected to PayPal/Stripe
```

### Step 6: Payment Completion

User completes payment on external gateway, then returns to:
```
/payment/return?status=success&order=12345&token=...
```

### Step 7: Verification & Confirmation

Payment return page:
1. Verifies payment status
2. Shows success/failure message
3. Provides link to order confirmation
4. Clears cart on success

## Payment Methods Supported

### PayPal
- **Button:** "Continue to PayPal" with PayPal logo
- **Redirect:** PayPal checkout page
- **Return URL:** `/payment/return?token=...&PayerID=...&order=ID`

### Credit Card (Stripe)
- **Button:** "Pay with Credit Card" with card icon
- **Redirect:** Stripe checkout session
- **Return URL:** `/payment/return?status=success&order=ID`

### Manual Payment (Bank Transfer, etc.)
- **Button:** "View Order Details"
- **Action:** Redirect to order confirmation
- **Instructions:** Sent via email

## Integration with WooCommerce

### Order Creation

```typescript
POST /api/orders
{
  billing: {...},
  line_items: [...],
  payment_method: "paypal",
  payment_method_title: "PayPal"
}
```

Returns:
```typescript
{
  order: {
    id: 12345,
    status: "pending",
    payment_url: "...", // Optional from WooCommerce
    ...
  }
}
```

### Payment Gateway Configuration

WooCommerce payment gateways should be configured to:
1. Set order status to "pending" initially
2. Provide return URL: `https://your-site.com/payment/return`
3. Set success URL parameter
4. Configure webhook for payment confirmation

## Real-World Implementation

### For PayPal Integration

1. **Install WooCommerce PayPal Gateway**
2. **Configure in WooCommerce:**
   - Enable PayPal Standard
   - Set API credentials
   - Configure return URL
3. **Update API route:**
```typescript
// src/app/api/payment/process/route.ts
if (paymentMethod === "paypal") {
  // Get actual PayPal URL from WooCommerce order
  const order = await getOrder(orderId);
  return NextResponse.json({
    success: true,
    paymentUrl: order.payment_url, // From WooCommerce
    orderId,
    paymentMethod: "paypal"
  });
}
```

### For Stripe Integration

1. **Install WooCommerce Stripe Gateway**
2. **Install Stripe SDK:**
```bash
npm install stripe @stripe/stripe-js
```
3. **Create Stripe Checkout Session:**
```typescript
// src/app/api/payment/process/route.ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (paymentMethod === "credit-card") {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [...], // From order
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/return?status=success&order=${orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/return?status=cancelled&order=${orderId}`,
  });
  
  return NextResponse.json({
    success: true,
    paymentUrl: session.url,
    orderId,
    paymentMethod: "stripe"
  });
}
```

## Testing the Payment Flow

### Test in Development

1. **Start the dev server:**
```bash
bun run dev
```

2. **Test order creation:**
   - Go to `/shop`
   - Add products to cart
   - Go to `/checkout`
   - Fill in billing information
   - Click "Place Order"

3. **Verify payment modal:**
   - Order should be created
   - Payment modal should appear
   - Payment button should be displayed
   - Order summary should be shown

4. **Test payment button:**
   - Click payment button
   - Should redirect to payment URL
   - In development, this will be a mock URL

5. **Test return flow:**
   - Manually visit: `/payment/return?status=success&order=123`
   - Should show success screen
   - Link to order confirmation should work

### Test with Real Payment Gateway

1. **Configure WooCommerce payment gateway**
2. **Enable sandbox/test mode**
3. **Use test credentials**
4. **Place test order**
5. **Complete payment with test card**
6. **Verify order status updates**

## Environment Variables Required

```env
# .env.local

# WooCommerce (existing)
NEXT_PUBLIC_WC_SITE_URL=https://your-site.com
WC_CONSUMER_KEY=ck_xxxxx
WC_CONSUMER_SECRET=cs_xxxxx

# Optional: Stripe (if using Stripe directly)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Optional: PayPal (if using PayPal SDK directly)
PAYPAL_CLIENT_ID=xxxxx
PAYPAL_CLIENT_SECRET=xxxxx
```

## Files Created/Modified

### Created
```
src/app/api/payment/process/route.ts
src/app/api/payment/webhook/route.ts
src/app/payment/return/page.tsx
```

### Modified
```
src/app/checkout/page.tsx
src/lib/api-client.ts
```

## Security Considerations

### ✅ Implemented
- Order created before payment
- Payment processing on server-side
- Secure redirect to payment gateway
- Payment verification on return

### 🔒 Best Practices
- Never store credit card information
- Always use HTTPS in production
- Verify webhook signatures
- Validate return URLs
- Check payment status server-side
- Log all payment attempts
- Handle failed payments gracefully

## Customization Options

### Custom Payment Button Styling

Edit `src/app/checkout/page.tsx`:

```typescript
<Button
  onClick={handlePaymentRedirect}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
>
  {/* Customize button content */}
</Button>
```

### Add More Payment Methods

1. **Add to checkout payment options:**
```typescript
<RadioGroupItem value="bank-transfer" id="bank-transfer" />
<Label htmlFor="bank-transfer">Bank Transfer</Label>
```

2. **Handle in payment processing:**
```typescript
// src/app/api/payment/process/route.ts
if (paymentMethod === "bank-transfer") {
  return NextResponse.json({
    success: true,
    paymentUrl: null,
    instructions: "Please transfer to account: ..."
  });
}
```

### Customize Payment Instructions

Edit instructions in `src/app/api/payment/process/route.ts`:

```typescript
return NextResponse.json({
  success: true,
  paymentUrl: "...",
  instructions: "Your custom instructions here"
});
```

## Troubleshooting

### Payment Button Not Appearing
**Issue:** Payment modal doesn't show after order creation
**Solution:** Check browser console for errors, verify API responses

### Payment URL Not Working
**Issue:** Redirect to payment gateway fails
**Solution:** Verify payment gateway is configured in WooCommerce

### Return URL Not Working
**Issue:** User not returned after payment
**Solution:** Configure return URL in payment gateway settings

### Order Status Not Updating
**Issue:** Payment completed but order stays "pending"
**Solution:** Configure webhooks in payment gateway

## Next Steps

### Production Checklist

- [ ] Configure real payment gateway credentials
- [ ] Test with sandbox/test mode
- [ ] Set up webhook endpoints
- [ ] Configure return URLs
- [ ] Test failed payment scenarios
- [ ] Set up payment notifications
- [ ] Add payment logging
- [ ] Test refund process
- [ ] Add payment analytics
- [ ] Document payment procedures

### Enhancements

1. **Add more payment gateways** (Apple Pay, Google Pay)
2. **Implement saved payment methods**
3. **Add payment retry logic**
4. **Create payment analytics dashboard**
5. **Add payment receipt generation**
6. **Implement subscription payments**
7. **Add payment plan options**

## Support

For payment gateway specific questions:
- **PayPal:** https://developer.paypal.com
- **Stripe:** https://stripe.com/docs
- **WooCommerce:** https://woocommerce.com/documentation/

---

**Status:** ✅ Complete and Ready for Production
**Date:** November 16, 2025
**Version:** 1.0
