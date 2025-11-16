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
    url: process.env.NEXT_PUBLIC_WC_SITE_URL || "",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
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

// Mock products for development when WooCommerce is not configured
const mockProducts: WCProduct[] = [
  {
    id: 1,
    name: "Elanor Retro Display Font",
    slug: "elanor-retro-display-font",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 1, src: "https://ext.same-assets.com/1839301121/2981467988.png", alt: "Elanor Retro" }],
    categories: [{ id: 1, name: "Display", slug: "display" }],
    description: "<p>A retro display font perfect for vintage designs.</p>",
    short_description: "Retro display font for vintage designs",
    attributes: [],
    meta_data: [],
  },
  {
    id: 2,
    name: "Ravioli Whimsical Font",
    slug: "ravioli-whimsical-font",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 2, src: "https://ext.same-assets.com/1839301121/1908426588.png", alt: "Ravioli" }],
    categories: [{ id: 1, name: "Display", slug: "display" }],
    description: "<p>A whimsical display font for creative projects.</p>",
    short_description: "Whimsical display font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 3,
    name: "Rockville Versatility Serif",
    slug: "rockville-versatility-serif",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 3, src: "https://ext.same-assets.com/1839301121/550509967.png", alt: "Rockville" }],
    categories: [{ id: 2, name: "Serif", slug: "serif" }],
    description: "<p>A versatile serif font for professional designs.</p>",
    short_description: "Versatile serif font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 4,
    name: "Kithara Sophisticated",
    slug: "kithara-sophisticated",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 4, src: "https://ext.same-assets.com/1839301121/1998126962.png", alt: "Kithara" }],
    categories: [{ id: 2, name: "Serif", slug: "serif" }],
    description: "<p>Sophisticated serif font for elegant designs.</p>",
    short_description: "Sophisticated serif font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 5,
    name: "Astragon Modern Serif",
    slug: "astragon-modern-serif",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 5, src: "https://ext.same-assets.com/1839301121/1833752454.png", alt: "Astragon" }],
    categories: [{ id: 2, name: "Serif", slug: "serif" }],
    description: "<p>Modern serif font with clean lines.</p>",
    short_description: "Modern serif font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 6,
    name: "Marline Beautiful Sans",
    slug: "marline-beautiful-sans",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 6, src: "https://ext.same-assets.com/1839301121/2500002024.png", alt: "Marline" }],
    categories: [{ id: 3, name: "Sans Serif", slug: "sans-serif" }],
    description: "<p>Beautiful sans serif font for modern designs.</p>",
    short_description: "Beautiful sans serif",
    attributes: [],
    meta_data: [],
  },
  {
    id: 7,
    name: "Baginks Birkin Serif",
    slug: "baginks-birkin-serif",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 7, src: "https://ext.same-assets.com/1839301121/2577966116.png", alt: "Baginks" }],
    categories: [{ id: 2, name: "Serif", slug: "serif" }],
    description: "<p>Elegant serif font with distinctive character.</p>",
    short_description: "Elegant serif font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 8,
    name: "Bentley Monoline",
    slug: "bentley-monoline",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 8, src: "https://ext.same-assets.com/1839301121/1951798213.png", alt: "Bentley" }],
    categories: [{ id: 3, name: "Sans Serif", slug: "sans-serif" }],
    description: "<p>Monoline sans serif for clean typography.</p>",
    short_description: "Monoline sans serif",
    attributes: [],
    meta_data: [],
  },
  {
    id: 9,
    name: "Brittany Signature Script",
    slug: "brittany-signature-script",
    price: "29",
    regular_price: "29",
    sale_price: "",
    images: [{ id: 9, src: "https://ext.same-assets.com/1839301121/1103957144.jpeg", alt: "Brittany" }],
    categories: [{ id: 4, name: "Script", slug: "script" }],
    description: "<p>Elegant signature script for personal branding.</p>",
    short_description: "Signature script font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 10,
    name: "Gistesy Signature",
    slug: "gistesy-signature",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 10, src: "https://ext.same-assets.com/1839301121/3774480499.png", alt: "Gistesy" }],
    categories: [{ id: 4, name: "Script", slug: "script" }],
    description: "<p>Stylish signature font for creative projects.</p>",
    short_description: "Stylish signature font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 11,
    name: "Halimun Script Style",
    slug: "halimun-script-style",
    price: "25",
    regular_price: "25",
    sale_price: "",
    images: [{ id: 11, src: "https://ext.same-assets.com/1839301121/1342859359.png", alt: "Halimun" }],
    categories: [{ id: 4, name: "Script", slug: "script" }],
    description: "<p>Beautiful script style font.</p>",
    short_description: "Script style font",
    attributes: [],
    meta_data: [],
  },
  {
    id: 12,
    name: "Barcelony Signature",
    slug: "barcelony-signature",
    price: "19",
    regular_price: "19",
    sale_price: "",
    images: [{ id: 12, src: "https://ext.same-assets.com/1839301121/1850557146.jpeg", alt: "Barcelony" }],
    categories: [{ id: 4, name: "Script", slug: "script" }],
    description: "<p>Elegant signature font for logos.</p>",
    short_description: "Signature font for logos",
    attributes: [],
    meta_data: [],
  },
];

// Product Management
export async function getProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: "asc" | "desc";
}) {
  // Use mock data if WooCommerce is not configured
  if (!api) {
    console.warn("WooCommerce API not configured. Using mock data. Please update .env.local with your WooCommerce credentials.");
    
    let filteredProducts = [...mockProducts];
    
    // Apply category filter
    if (params?.category && params.category !== "all") {
      filteredProducts = filteredProducts.filter(p => 
        p.categories.some(c => c.slug === params.category)
      );
    }
    
    // Apply search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const page = params?.page || 1;
    const perPage = params?.per_page || 12;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedProducts = filteredProducts.slice(start, end);
    
    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / perPage),
    };
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
  // Use mock data if WooCommerce is not configured
  if (!api) {
    const product = mockProducts.find(p => p.slug === slug);
    return product || null;
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
  // Use mock data if WooCommerce is not configured
  if (!api) {
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
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
  // Use mock data if WooCommerce is not configured
  if (!api) {
    return [
      { id: 1, name: "Display", slug: "display" },
      { id: 2, name: "Serif", slug: "serif" },
      { id: 3, name: "Sans Serif", slug: "sans-serif" },
      { id: 4, name: "Script", slug: "script" },
      { id: 5, name: "Brush", slug: "brush" },
    ];
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
  // Mock order creation if WooCommerce is not configured
  if (!api) {
    console.warn("WooCommerce API not configured. Simulating order creation.");
    return {
      id: Math.floor(Math.random() * 10000),
      status: "processing",
      date_created: new Date().toISOString(),
      total: "0",
      ...data,
    };
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
  // Mock order fetch if WooCommerce is not configured
  if (!api) {
    return {
      id: orderId,
      status: "processing",
      date_created: new Date().toISOString(),
      total: "0",
    };
  }

  try {
    const response = await api.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

export async function validateCoupon(code: string) {
  // Mock coupon validation if WooCommerce is not configured
  if (!api) {
    if (code.toLowerCase() === "rockvilleversatility5") {
      return {
        id: 1,
        code: code,
        amount: "15",
        discount_type: "percent",
      };
    }
    return null;
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
  // Use mock data if WooCommerce is not configured
  if (!api) {
    const product = mockProducts.find(p => p.id === productId);
    if (!product || !product.categories.length) {
      return mockProducts.slice(0, limit);
    }
    
    const categorySlug = product.categories[0].slug;
    const related = mockProducts
      .filter(p => p.id !== productId && p.categories.some(c => c.slug === categorySlug))
      .slice(0, limit);
    
    return related.length > 0 ? related : mockProducts.slice(0, limit);
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
