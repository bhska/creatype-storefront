# API Quick Reference

## Available API Endpoints

### Products
```typescript
// List products with filters
GET /api/products?page=1&per_page=12&category=serif&search=vintage

// Get single product (with optional related products)
GET /api/products/font-slug?related=true
```

### Categories
```typescript
// Get all product categories
GET /api/categories
```

### Orders
```typescript
// Create new order
POST /api/orders
Body: { billing, line_items, payment_method, payment_method_title }

// Get order details
GET /api/orders/123
```

### Cart
```typescript
// Validate cart items
POST /api/cart/validate
Body: { items: [{ product_id, quantity }] }
```

### Coupons
```typescript
// Validate coupon code
POST /api/coupons/validate
Body: { code: "SAVE15" }
```

### Payment
```typescript
// Get available payment gateways
GET /api/payment-gateways
```

## Client Usage

### Import API Client
```typescript
import { apiClient } from "@/lib/api-client";
```

### Common Operations

#### Fetch Products
```typescript
const result = await apiClient.getProducts({
  page: 1,
  per_page: 12,
  category: "serif", // or "display", "script", "sans-serif"
  search: "vintage"
});

console.log(result.products); // WCProduct[]
console.log(result.total); // Total count
console.log(result.totalPages); // Number of pages
```

#### Get Product Details
```typescript
// Without related products
const { product } = await apiClient.getProduct("font-slug");

// With related products
const { product, relatedProducts } = await apiClient.getProduct("font-slug", true);
```

#### Create Order
```typescript
const { order } = await apiClient.createOrder({
  billing: {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    address_1: "123 Main St",
    city: "New York",
    state: "NY",
    postcode: "10001",
    country: "US"
  },
  line_items: [
    { product_id: 123, quantity: 1 },
    { product_id: 456, quantity: 2 }
  ],
  payment_method: "paypal",
  payment_method_title: "PayPal"
});

console.log(order.id); // Order ID for confirmation page
```

#### Validate Coupon
```typescript
try {
  const { coupon, valid } = await apiClient.validateCoupon("SAVE15");
  
  if (valid) {
    // Calculate discount
    const discount = coupon.discount_type === "percent"
      ? total * (parseFloat(coupon.amount) / 100)
      : parseFloat(coupon.amount);
  }
} catch (error) {
  console.error("Invalid coupon");
}
```

#### Get Categories
```typescript
const { categories } = await apiClient.getCategories();

categories.forEach(cat => {
  console.log(cat.name, cat.slug);
});
```

#### Validate Cart
```typescript
const { items, valid } = await apiClient.validateCart([
  { product_id: 123, quantity: 1 },
  { product_id: 456, quantity: 2 }
]);

if (!valid) {
  // Some items are invalid or out of stock
  items.forEach(item => {
    if (!item.valid) {
      console.log(`Product ${item.product_id} is invalid`);
    }
  });
}
```

## Type Imports

```typescript
// WooCommerce types
import type { WCProduct, CheckoutData } from "@/lib/woocommerce";

// API response types
import type {
  ProductsListResponse,
  ProductDetailResponse,
  OrderResponse,
  CategoriesResponse,
  CouponResponse
} from "@/lib/api-client";
```

## Error Handling

### Standard Pattern
```typescript
try {
  const result = await apiClient.getProducts({ page: 1 });
  setProducts(result.products);
} catch (error) {
  console.error("Failed to load products:", error);
  toast.error("Failed to load products");
}
```

### With Loading State
```typescript
const [loading, setLoading] = useState(true);

async function fetchData() {
  setLoading(true);
  try {
    const result = await apiClient.getProducts();
    setProducts(result.products);
  } catch (error) {
    toast.error("Failed to load");
  } finally {
    setLoading(false);
  }
}
```

## Environment Variables Required

```env
# .env.local
NEXT_PUBLIC_WC_SITE_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Testing

### Check API Routes
```bash
# Start dev server
bun run dev

# Test endpoints
curl http://localhost:3000/api/products
curl http://localhost:3000/api/categories
curl -X POST http://localhost:3000/api/coupons/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"SAVE15"}'
```

### Run Tests
```bash
# Type check
bun run lint

# Build
bun run build
```

## Common Issues

### API Route Returns 500
- Check WooCommerce credentials in `.env.local`
- Verify WooCommerce site is accessible
- Check server logs for detailed error

### Type Errors
- Import types correctly: `import type { WCProduct } from ...`
- Use API client response types
- Check TypeScript version compatibility

### CORS Errors
- API routes are same-origin, no CORS needed
- If using external API, configure in `next.config.js`

## Adding New Endpoints

### 1. Create API Route
```typescript
// src/app/api/your-endpoint/route.ts
import { NextResponse } from "next/server";
import { yourFunction } from "@/lib/woocommerce";

export async function GET() {
  try {
    const data = await yourFunction();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
```

### 2. Add to API Client
```typescript
// src/lib/api-client.ts
async yourEndpoint(): Promise<YourResponse> {
  return this.fetchJson("/api/your-endpoint");
}
```

### 3. Use in Component
```typescript
const data = await apiClient.yourEndpoint();
```

---

**Last Updated:** November 16, 2025
**Version:** 1.0
**Status:** Production Ready
