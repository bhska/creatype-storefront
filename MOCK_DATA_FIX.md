# Mock Data Fix - WooCommerce API Error Resolution

## Problem
The application was throwing a runtime error:
```
consumerKey is required
```

This occurred because the WooCommerce API was trying to initialize with empty credentials from `.env.local`.

## Solution Applied

### 1. Conditional API Initialization
Changed the WooCommerce API from always initializing to conditional initialization:

```typescript
// Before (always initializes, fails with empty credentials)
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_SITE_URL || "",
  consumerKey: process.env.WC_CONSUMER_KEY || "",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "",
});

// After (only initializes if credentials exist)
let api: WooCommerceRestApi | null = null;

if (hasWooCommerceConfig) {
  api = new WooCommerceRestApi({ /* credentials */ });
}
```

### 2. Mock Data for Development
Added 12 mock products matching the homepage data:
- Elanor Retro Display Font
- Ravioli Whimsical Font
- Rockville Versatility Serif
- Kithara Sophisticated
- Astragon Modern Serif
- Marline Beautiful Sans
- Baginks Birkin Serif
- Bentley Monoline
- Brittany Signature Script
- Gistesy Signature
- Halimun Script Style
- Barcelony Signature

### 3. Fallback Functions
Updated all API functions to use mock data when WooCommerce is not configured:

#### `getProducts()`
- Supports category filtering
- Supports search functionality
- Implements pagination
- Returns mock data structure matching WooCommerce API

#### `getProduct(slug)`
- Finds product by slug from mock data
- Returns null if not found

#### `getProductById(id)`
- Finds product by ID from mock data
- Throws error if not found (matching real API behavior)

#### `getProductCategories()`
- Returns mock categories: Display, Serif, Sans Serif, Script, Brush

#### `createOrder(data)`
- Simulates order creation
- Returns mock order with random ID
- Logs warning about using mock data

#### `getOrder(orderId)`
- Returns mock order data

#### `validateCoupon(code)`
- Validates "rockvilleversatility5" coupon (15% off)
- Returns null for invalid codes

#### `getRelatedProducts(productId, limit)`
- Finds products in same category
- Returns up to `limit` products
- Falls back to first `limit` products if no matches

### 4. Developer Experience
Added console warnings when using mock data:
```
WooCommerce API not configured. Using mock data. 
Please update .env.local with your WooCommerce credentials.
```

## Benefits

### ✅ Works Without Configuration
- App runs immediately after cloning
- No WooCommerce setup required for development
- All pages render correctly

### ✅ Seamless Transition
- When you add real credentials to `.env.local`, it automatically switches to real API
- No code changes needed
- Mock data structure matches real API

### ✅ Full Functionality
- All shop features work:
  - Product listing with pagination
  - Category filtering
  - Search functionality
  - Product detail pages
  - Add to cart
  - Checkout process
  - Coupon validation

### ✅ Testing Friendly
- Can test UI/UX without backend
- Predictable data for screenshots
- Fast development iteration

## How to Use

### Development Mode (Using Mock Data)
Just run the app as-is:
```bash
bun run dev
```

The app will use mock data and show a console warning.

### Production Mode (Using Real WooCommerce)
Update `.env.local` with your actual credentials:

```env
NEXT_PUBLIC_WC_SITE_URL=https://your-actual-site.com
WC_CONSUMER_KEY=ck_your_actual_consumer_key
WC_CONSUMER_SECRET=cs_your_actual_consumer_secret
```

The app will automatically detect the credentials and use the real WooCommerce API.

## Testing Results

✅ **Build**: SUCCESSFUL  
✅ **All Pages Loading**: YES  
✅ **Shop Page**: Working with mock products  
✅ **Product Detail**: Working with mock data  
✅ **Checkout**: Working with mock orders  
✅ **Cart**: Fully functional  
✅ **Filtering**: Working (Display, Serif, Sans Serif, Script)  
✅ **Search**: Working  
✅ **Pagination**: Working  

## Mock Data Limitations

The mock data has these intentional limitations:
- Fixed set of 12 products
- No real payment processing
- Orders create mock IDs (not saved)
- Limited to pre-defined categories
- Single coupon code supported

These limitations don't affect the UI/UX and allow full testing of all features.

## Migration Path

When you're ready to connect to real WooCommerce:

1. **Install WooCommerce** on your WordPress site
2. **Create API Credentials** (WooCommerce > Settings > Advanced > REST API)
3. **Update `.env.local`** with your credentials
4. **Configure Products** in WooCommerce to match your needs
5. **Test the Connection** by checking console logs (warnings will disappear)
6. **Deploy** to production

## Files Modified

- `src/lib/woocommerce.ts` - Added conditional initialization and mock data

## No Breaking Changes

- All existing code continues to work
- Type definitions unchanged
- Component interfaces unchanged
- No migration needed for existing features

---

**Status**: ✅ Fixed and Working  
**Error**: Resolved  
**App State**: Fully Functional with Mock Data
