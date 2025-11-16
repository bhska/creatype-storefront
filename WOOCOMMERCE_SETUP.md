# WooCommerce Integration Setup Guide

## Overview
This guide explains how to set up and configure the WooCommerce API integration for the Creatype Studio font marketplace.

## Prerequisites
- A WordPress site with WooCommerce installed
- WooCommerce REST API credentials
- Node.js/Bun installed

## Setup Instructions

### 1. Configure WooCommerce API Credentials

1. Log in to your WordPress admin dashboard
2. Navigate to **WooCommerce > Settings > Advanced > REST API**
3. Click **Add key** to create new API credentials
4. Fill in the following:
   - **Description**: Creatype Storefront
   - **User**: Select an admin user
   - **Permissions**: Read/Write
5. Click **Generate API key**
6. Copy the **Consumer key** and **Consumer secret**

### 2. Configure Environment Variables

Update the `.env.local` file in the project root:

```env
# WooCommerce API Configuration
NEXT_PUBLIC_WC_SITE_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Set to 'yes' to enable debug mode
WC_DEBUG=no
```

**Important**: Replace the placeholder values with your actual credentials.

### 3. Install Dependencies

```bash
bun install
```

The project includes `@woocommerce/woocommerce-rest-api` for API integration.

### 4. WooCommerce Product Configuration

For optimal compatibility, configure your WooCommerce products as follows:

#### Product Categories
- Serif
- Sans Serif
- Script
- Display
- Brush

#### Product Attributes (for license types)
Create a custom attribute called "License Type" with values:
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
- Upload high-quality font preview images
- Recommended: 1200x900px or 16:9 aspect ratio
- Include multiple preview images showing the font in use

### 5. Run the Development Server

```bash
bun run dev
```

Visit `http://localhost:3000` to see the storefront.

## Features Implemented

### Shop Page (`/shop`)
- Product grid with filtering by category
- Search functionality
- Pagination
- WooCommerce product integration

### Product Detail Page (`/product/[slug]`)
- Dynamic product loading
- Image gallery with thumbnails
- Interactive Type Tester component
- License pricing sidebar
- Related products section
- Add to cart functionality

### Checkout Page (`/checkout`)
- Cart management (add, update, remove items)
- Billing form with validation
- Coupon code support
- Multiple payment methods (PayPal, Credit Cards)
- Order summary with real-time calculations
- WooCommerce order creation

### Shared Components
- Header with cart badge
- Footer with links
- Responsive design
- Dark theme matching design specs

## API Service Layer

The WooCommerce integration is handled in `src/lib/woocommerce.ts`:

```typescript
// Fetch products
const { products, total, totalPages } = await getProducts({
  page: 1,
  per_page: 12,
  category: "serif",
  search: "vintage"
});

// Get single product
const product = await getProduct("font-slug");

// Create order
const order = await createOrder({
  billing: { /* billing data */ },
  line_items: [ /* cart items */ ],
  payment_method: "paypal"
});
```

## Cart Management

The cart is managed client-side using React Context (`src/lib/cart-context.tsx`):

```typescript
const { items, addItem, removeItem, updateQuantity, totalPrice } = useCart();

// Add item to cart
addItem({
  product_id: 123,
  name: "Font Name",
  price: 25,
  quantity: 1,
  license: "Desktop License"
});
```

Cart data is persisted in localStorage for cross-session persistence.

## Testing

```bash
# Lint code
bun run lint

# Build for production
bun run build

# Start production server
bun run start
```

## Troubleshooting

### API Connection Issues
- Verify your WooCommerce site URL is correct
- Ensure API credentials are valid
- Check that WooCommerce REST API is enabled
- Verify CORS settings on your WordPress site

### Product Images Not Loading
- Check image URLs in WooCommerce
- Ensure images are publicly accessible
- Configure Next.js image domains in `next.config.js`

### Cart Not Persisting
- Check browser localStorage is enabled
- Verify CartProvider wraps your app
- Check browser console for errors

## Security Considerations

- **Never commit** `.env.local` to version control
- Keep WooCommerce API credentials secure
- Use environment variables for sensitive data
- Implement rate limiting on production
- Enable HTTPS for production deployments

## Next Steps

1. **Configure Payment Gateways**: Set up PayPal and Stripe in WooCommerce
2. **Test Orders**: Place test orders to verify the checkout flow
3. **Customize Emails**: Configure WooCommerce order confirmation emails
4. **Add Analytics**: Integrate Google Analytics or similar
5. **Deploy**: Deploy to production (Vercel, Netlify, etc.)

## Support

For issues or questions:
- Check WooCommerce REST API documentation
- Review Next.js documentation
- Check the project's GitHub issues

## License

This storefront implementation follows the design specifications provided and integrates with WooCommerce for e-commerce functionality.
