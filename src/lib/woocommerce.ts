import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Check if WooCommerce credentials are configured
const hasWooCommerceConfig = !!(
  process.env.NEXT_PUBLIC_WC_SITE_URL &&
  process.env.WC_CONSUMER_KEY &&
  process.env.WC_CONSUMER_SECRET
);

// Initialize WooCommerce API client only if credentials are available
let api: WooCommerceRestApi | null = null;

if (hasWooCommerceConfig) {
  api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WC_SITE_URL!,
    consumerKey: process.env.WC_CONSUMER_KEY!,
    consumerSecret: process.env.WC_CONSUMER_SECRET!,
    version: "wc/v3",
    queryStringAuth: true,
  });
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  description: string;
  short_description: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  meta_data: Array<{
    key: string;
    value: string;
  }>;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
  meta_data?: Array<{
    key: string;
    value: string;
  }>;
}

export interface CheckoutData {
  billing: {
    first_name: string;
    last_name: string;
    company?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone?: string;
  };
  line_items: CartItem[];
  payment_method: string;
  payment_method_title: string;
  coupon_lines?: Array<{
    code: string;
  }>;
}

// Product Management
export async function getProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: "asc" | "desc";
}) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("products", {
      page: params?.page || 1,
      per_page: params?.per_page || 12,
      category: params?.category,
      search: params?.search,
      orderby: params?.orderby || "date",
      order: params?.order || "desc",
    });
    return {
      products: response.data as WCProduct[],
      total: Number.parseInt(response.headers["x-wp-total"] || "0"),
      totalPages: Number.parseInt(response.headers["x-wp-totalpages"] || "0"),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(slug: string) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("products", { slug });
    const products = response.data as WCProduct[];
    return products[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getProductById(id: number) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get(`products/${id}`);
    return response.data as WCProduct;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

export async function getProductCategories() {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("products/categories", {
      per_page: 100,
      hide_empty: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Payment Gateways
export async function getPaymentGateways() {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("payment_gateways");
    return response.data.filter((gateway: { enabled: boolean }) => gateway.enabled);
  } catch (error) {
    console.error("Error fetching payment gateways:", error);
    return [];
  }
}

// Shipping Methods
export async function getShippingMethods() {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("shipping_methods");
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return [];
  }
}

// Cart Management (using WooCommerce API)
export async function addToCart(productId: number, quantity = 1, variationId?: number) {
  try {
    // Note: WooCommerce doesn't have a built-in cart API for headless
    // You'll need to use WooCommerce Store API or implement custom endpoints
    // For now, we'll handle cart client-side with localStorage/context
    return { success: true, product_id: productId, quantity };
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

// Checkout & Orders
export async function createOrder(data: CheckoutData) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.post("orders", data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrder(orderId: number) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

// Customer Management
export async function createCustomer(data: {
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  password?: string;
  billing?: object;
  shipping?: object;
}) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.post("customers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

export async function getCustomer(customerId: number) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get(`customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}

// Product Reviews
export async function getProductReviews(productId: number) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("products/reviews", {
      product: [productId],
      per_page: 100,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return [];
  }
}

export async function createProductReview(data: {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
}) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.post("products/reviews", data);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

export async function validateCoupon(code: string) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const response = await api.get("coupons", { code });
    const coupons = response.data;
    return coupons[0] || null;
  } catch (error) {
    console.error("Error validating coupon:", error);
    return null;
  }
}

// Related Products
export async function getRelatedProducts(productId: number, limit = 4) {
  if (!api) {
    throw new Error("WooCommerce API not configured. Please set WC_CONSUMER_KEY and WC_CONSUMER_SECRET in your .env.local file.");
  }

  try {
    const product = await getProductById(productId);
    if (!product.categories.length) {
      return [];
    }

    const categoryId = product.categories[0].id;
    const response = await api.get("products", {
      category: categoryId.toString(),
      per_page: limit + 1,
      exclude: [productId],
    });

    return (response.data as WCProduct[]).slice(0, limit);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default api;
