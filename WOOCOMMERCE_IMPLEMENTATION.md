# WooCommerce Implementation Guide

## Overview

This document provides a comprehensive guide to the WooCommerce integration implemented in the Creatype Studio font marketplace. The implementation includes complete product browsing, cart management, and checkout functionality.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [API Reference](#api-reference)
5. [Usage Examples](#usage-examples)
6. [Testing](#testing)

## Features

### ✅ Product Management
- **Product Listing**: Browse all products with pagination
- **Product Filtering**: Filter by category (Serif, Sans Serif, Display, Script, Brush)
- **Product Search**: Full-text search across product names and descriptions
- **Product Details**: Detailed product pages with image galleries
- **Related Products**: Display similar products based on category
- **Product Categories**: Dynamic category management

### ✅ Cart Management
- **Add to Cart**: Add products with different license types
- **Update Cart**: Modify quantities or remove items
- **Cart Persistence**: Local storage for cross-session cart retention
- **Cart Validation**: Server-side validation of cart items
- **Real-time Totals**: Automatic calculation of subtotals and totals

### ✅ Checkout Process
- **Billing Form**: Comprehensive billing information collection
- **Payment Methods**: Support for PayPal and Credit Card payments
- **Coupon System**: Apply discount coupons to orders
- **Order Creation**: Create orders in WooCommerce
- **Order Confirmation**: Professional order confirmation page

### ✅ Additional Features
- **Customer Management**: Create and manage customer accounts
- **Product Reviews**: Fetch and create product reviews
- **Payment Gateways**: Dynamic payment gateway detection
- **Shipping Methods**: Support for multiple shipping options
- **Mock Data**: Development mode with mock data when WooCommerce is not configured

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── api/                      # Next.js API routes
│   │   ├── products/
│   │   │   ├── route.ts         # GET products list
│   │   │   └── [slug]/
│   │   │       └── route.ts     # GET single product
│   │   ├── orders/
│   │   │   ├── route.ts         # POST create order
│   │   │   └── [id]/
│   │   │       └── route.ts     # GET order details
│   │   └── cart/
│   │       └── validate/
│   │           └── route.ts     # POST validate cart
│   ├── shop/
│   │   └── page.tsx             # Product listing page
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx         # Product detail page
│   ├── checkout/
│   │   └── page.tsx             # Checkout page
│   └── order-confirmation/
│       └── [id]/
│           └── page.tsx         # Order confirmation page
├── lib/
│   ├── woocommerce.ts           # WooCommerce API client
│   └── cart-context.tsx         # React Context for cart state
└── components/
    ├── Header.tsx               # Header with cart badge
    ├── Footer.tsx               # Footer component
    ├── ProductCard.tsx          # Product card component
    ├── PricingSidebar.tsx       # License pricing sidebar
    └── TypeTester.tsx           # Interactive type testing tool
```

### Data Flow

1. **Client-Side Cart Management**
   - Cart state managed via React Context (`CartProvider`)
   - Data persisted in localStorage
   - Real-time updates across components

2. **Server-Side WooCommerce Integration**
   - API routes handle WooCommerce authentication
   - Secure API key management via environment variables
   - Error handling and validation

3. **Hybrid Approach**
   - Products fetched directly from WooCommerce
   - Cart managed client-side for performance
   - Orders created server-side for security

## Setup Instructions

### 1. Install Dependencies

The required dependencies are already installed:
- `@woocommerce/woocommerce-rest-api`: Official WooCommerce REST API client

### 2. Configure Environment Variables

Update your `.env.local` file:

```env
# WooCommerce API Configuration
NEXT_PUBLIC_WC_SITE_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WC_DEBUG=no
```

**How to get WooCommerce credentials:**

1. Log in to your WordPress admin
2. Go to **WooCommerce > Settings > Advanced > REST API**
3. Click **Add key**
4. Set permissions to **Read/Write**
5. Copy the Consumer key and Consumer secret

### 3. Configure WooCommerce Product Structure

For optimal compatibility, structure your WooCommerce products as follows:

#### Product Categories
- Serif
- Sans Serif
- Display
- Script
- Brush

#### Product Attributes
Create a custom attribute called "License Type" with these options:
- Desktop License ($25)
- Web Font License ($49)
- Extended License ($199)
- Social Media Content Creator ($199)
- Logo Licenses ($179)
- App/Game Licenses ($349)
- Server License ($549)
- Broadcast License ($1499)
- Corporate License ($3499)

#### Product Images
- Upload high-quality preview images
- Recommended: 1200x900px or 16:9 aspect ratio
- Include multiple angles/samples

### 4. Configure Next.js Image Domains

Add your WooCommerce site domain to `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ['your-wordpress-site.com'],
  },
};
```

### 5. Run the Development Server

```bash
bun run dev
# or
npm run dev
```

Visit `http://localhost:3000`

## API Reference

### WooCommerce API Functions

#### Product Management

```typescript
// Get products with filtering and pagination
getProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: "asc" | "desc";
})

// Get single product by slug
getProduct(slug: string)

// Get product by ID
getProductById(id: number)

// Get product categories
getProductCategories()

// Get related products
getRelatedProducts(productId: number, limit?: number)
```

#### Order Management

```typescript
// Create new order
createOrder(data: CheckoutData)

// Get order details
getOrder(orderId: number)
```

#### Customer Management

```typescript
// Create new customer
createCustomer(data: {
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  password?: string;
  billing?: object;
  shipping?: object;
})

// Get customer details
getCustomer(customerId: number)
```

#### Reviews

```typescript
// Get product reviews
getProductReviews(productId: number)

// Create product review
createProductReview(data: {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
})
```

#### Coupons

```typescript
// Validate coupon code
validateCoupon(code: string)
```

#### Payment & Shipping

```typescript
// Get enabled payment gateways
getPaymentGateways()

// Get shipping methods
getShippingMethods()
```

### Cart Context API

```typescript
// Access cart context
const {
  items,          // Array of cart items
  addItem,        // Add item to cart
  removeItem,     // Remove item from cart
  updateQuantity, // Update item quantity
  clearCart,      // Clear entire cart
  totalItems,     // Total number of items
  totalPrice,     // Total cart price
} = useCart();
```

### Next.js API Routes

#### GET /api/products
Fetch products with filtering

**Query Parameters:**
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 12)
- `category`: Category slug
- `search`: Search query
- `orderby`: Sort field (default: "date")
- `order`: Sort order "asc" or "desc" (default: "desc")
- `action`: Set to "categories" to fetch categories

**Response:**
```json
{
  "products": [...],
  "total": 50,
  "totalPages": 5
}
```

#### GET /api/products/[slug]
Fetch single product

**Query Parameters:**
- `related`: Set to "true" to include related products

**Response:**
```json
{
  "product": {...},
  "relatedProducts": [...]
}
```

#### POST /api/orders
Create new order

**Request Body:**
```json
{
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "address_1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postcode": "10001",
    "country": "US",
    "email": "john@example.com"
  },
  "line_items": [
    {
      "product_id": 123,
      "quantity": 1
    }
  ],
  "payment_method": "paypal",
  "payment_method_title": "PayPal",
  "coupon_lines": [
    {
      "code": "DISCOUNT10"
    }
  ]
}
```

**Response:**
```json
{
  "order": {
    "id": 5678,
    "status": "processing",
    "total": "50.00",
    ...
  }
}
```

#### GET /api/orders/[id]
Get order details

**Response:**
```json
{
  "order": {
    "id": 5678,
    "status": "processing",
    "date_created": "2024-01-15T10:30:00",
    "total": "50.00",
    "billing": {...},
    "line_items": [...]
  }
}
```

#### POST /api/cart/validate
Validate cart items

**Request Body:**
```json
{
  "items": [
    {
      "product_id": 123,
      "quantity": 1
    }
  ]
}
```

**Response:**
```json
{
  "items": [
    {
      "product_id": 123,
      "name": "Product Name",
      "price": 25.00,
      "quantity": 1,
      "in_stock": true,
      "valid": true
    }
  ],
  "valid": true
}
```

## Usage Examples

### Adding a Product to Cart

```typescript
import { useCart } from "@/lib/cart-context";

function ProductPage() {
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.images[0]?.src,
      slug: product.slug,
      license: "Desktop License",
    });
  };

  return <button onClick={() => handleAddToCart(product)}>Add to Cart</button>;
}
```

### Fetching Products

```typescript
import { getProducts } from "@/lib/woocommerce";

async function ShopPage() {
  const { products, total, totalPages } = await getProducts({
    page: 1,
    per_page: 12,
    category: "serif",
    search: "vintage",
  });

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Creating an Order

```typescript
import { createOrder } from "@/lib/woocommerce";
import { useCart } from "@/lib/cart-context";

async function handleCheckout(billingData) {
  const { items, clearCart } = useCart();

  const orderData = {
    billing: billingData,
    line_items: items.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    })),
    payment_method: "paypal",
    payment_method_title: "PayPal",
  };

  try {
    const order = await createOrder(orderData);
    clearCart();
    router.push(`/order-confirmation/${order.id}`);
  } catch (error) {
    console.error("Failed to create order:", error);
  }
}
```

### Applying a Coupon

```typescript
import { validateCoupon } from "@/lib/woocommerce";

async function applyCoupon(code) {
  const coupon = await validateCoupon(code);
  
  if (coupon) {
    // Apply discount
    const discountAmount = calculateDiscount(totalPrice, coupon);
    setDiscount(discountAmount);
  } else {
    // Show error
    toast.error("Invalid coupon code");
  }
}
```

## Testing

### Running Tests

```bash
# Type check
bun run lint

# Build for production
bun run build

# Start production server
bun run start
```

### Manual Testing Checklist

#### Product Browsing
- [ ] Products load on shop page
- [ ] Filtering by category works
- [ ] Search functionality works
- [ ] Pagination works correctly
- [ ] Product detail page loads
- [ ] Related products display

#### Cart Functionality
- [ ] Add to cart works
- [ ] Cart badge updates
- [ ] Cart persists across page refreshes
- [ ] Update quantity works
- [ ] Remove from cart works
- [ ] Cart totals calculate correctly

#### Checkout Process
- [ ] Billing form validates required fields
- [ ] Coupon codes apply correctly
- [ ] Payment method selection works
- [ ] Order creates successfully
- [ ] Redirects to confirmation page
- [ ] Cart clears after order

#### Order Confirmation
- [ ] Order details display correctly
- [ ] Order items show
- [ ] Billing information shows
- [ ] Action buttons work

### WooCommerce Configuration Required

**⚠️ Important:** The app requires valid WooCommerce credentials to function. Without proper configuration:
- All API calls will throw errors
- Products will not load
- Orders cannot be created
- The app will display error messages

**You MUST configure WooCommerce credentials** in `.env.local` before running the app.

## Troubleshooting

### Products Not Loading

**Issue:** Products page is empty or shows loading indefinitely

**Solutions:**
1. Check WooCommerce API credentials in `.env.local`
2. Verify WooCommerce REST API is enabled in WordPress
3. Check browser console for CORS errors
4. Ensure WooCommerce site URL is correct

### Cart Not Persisting

**Issue:** Cart clears on page refresh

**Solutions:**
1. Check browser localStorage is enabled
2. Verify CartProvider wraps the app in `layout.tsx`
3. Check browser console for errors

### Order Creation Fails

**Issue:** Orders fail to create or show errors

**Solutions:**
1. Check all required billing fields are filled
2. Verify WooCommerce API has write permissions
3. Check product IDs are valid
4. Review server logs for detailed errors

### Image Loading Issues

**Issue:** Product images don't load

**Solutions:**
1. Add image domains to `next.config.js`
2. Verify image URLs are publicly accessible
3. Check image format is supported (JPEG, PNG, WebP)

## Security Considerations

### API Key Protection
- **Never commit** `.env.local` to version control
- Use environment variables for all sensitive data
- API keys are server-side only (not exposed to browser)

### Order Validation
- Server-side validation of all order data
- Product prices verified from WooCommerce
- Cart validation before checkout

### Payment Security
- Payment processing handled by WooCommerce
- No credit card data stored in the app
- Use HTTPS in production

## Next Steps

### Recommended Enhancements
1. **Authentication**: Add user login/registration
2. **My Account**: Order history and downloads page
3. **Wishlist**: Save favorite products
4. **Product Variations**: Support for variable products
5. **Advanced Filtering**: Price range, ratings, etc.
6. **Email Notifications**: Order confirmations via email
7. **Analytics**: Track conversions and user behavior
8. **Performance**: Add caching and CDN
9. **SEO**: Product schema markup and meta tags
10. **Mobile App**: React Native version

### Production Deployment
1. Set up production environment variables
2. Configure payment gateways in WooCommerce
3. Set up SSL certificates
4. Configure CDN for assets
5. Set up monitoring and error tracking
6. Test payment flows thoroughly
7. Set up automated backups

## Support

For issues or questions:
- Check WooCommerce REST API documentation: https://woocommerce.github.io/woocommerce-rest-api-docs/
- Check Next.js documentation: https://nextjs.org/docs
- Review this implementation guide

## License

This implementation follows the Creatype Studio design specifications and integrates with WooCommerce for e-commerce functionality.
