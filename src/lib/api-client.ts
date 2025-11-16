import type { WCProduct, CheckoutData } from "./woocommerce";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface ProductsListParams {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: "asc" | "desc";
}

interface ProductsListResponse {
  products: WCProduct[];
  total: number;
  totalPages: number;
}

interface ProductDetailResponse {
  product: WCProduct;
  relatedProducts?: WCProduct[];
}

interface CategoriesResponse {
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface CouponResponse {
  coupon: {
    id: number;
    code: string;
    amount: string;
    discount_type: string;
  };
  valid: boolean;
}

interface OrderResponse {
  order: {
    id: number;
    status: string;
    date_created: string;
    total: string;
    billing?: {
      first_name: string;
      last_name: string;
      email: string;
      address_1: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
    line_items?: Array<{
      name: string;
      quantity: number;
      total: string;
    }>;
    payment_method_title?: string;
  };
}

interface PaymentGatewaysResponse {
  gateways: Array<{
    id: string;
    title: string;
    enabled: boolean;
  }>;
}

interface CartValidationResponse {
  items: Array<{
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    in_stock: boolean;
    valid: boolean;
  }>;
  valid: boolean;
}

class ApiClient {
  private baseUrl = "";

  private async fetchJson<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Products
  async getProducts(params?: ProductsListParams): Promise<ProductsListResponse> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.per_page) searchParams.set("per_page", params.per_page.toString());
    if (params?.category) searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.orderby) searchParams.set("orderby", params.orderby);
    if (params?.order) searchParams.set("order", params.order);

    const url = `/api/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return this.fetchJson<ProductsListResponse>(url);
  }

  async getProduct(slug: string, includeRelated = false): Promise<ProductDetailResponse> {
    const searchParams = new URLSearchParams();
    if (includeRelated) searchParams.set("related", "true");

    const url = `/api/products/${slug}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return this.fetchJson<ProductDetailResponse>(url);
  }

  // Categories
  async getCategories(): Promise<CategoriesResponse> {
    return this.fetchJson<CategoriesResponse>("/api/categories");
  }

  // Orders
  async createOrder(data: CheckoutData): Promise<OrderResponse> {
    return this.fetchJson<OrderResponse>("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getOrder(orderId: number): Promise<OrderResponse> {
    return this.fetchJson<OrderResponse>(`/api/orders/${orderId}`);
  }

  // Cart
  async validateCart(items: Array<{ product_id: number; quantity: number }>): Promise<CartValidationResponse> {
    return this.fetchJson<CartValidationResponse>("/api/cart/validate", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
  }

  // Coupons
  async validateCoupon(code: string): Promise<CouponResponse> {
    return this.fetchJson<CouponResponse>("/api/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }

  // Payment Gateways
  async getPaymentGateways(): Promise<PaymentGatewaysResponse> {
    return this.fetchJson<PaymentGatewaysResponse>("/api/payment-gateways");
  }

  // Payment Processing
  async processPayment(orderId: number, paymentMethod: string): Promise<{
    success: boolean;
    paymentUrl: string | null;
    orderId: number;
    paymentMethod: string;
    instructions: string;
  }> {
    return this.fetchJson("/api/payment/process", {
      method: "POST",
      body: JSON.stringify({ orderId, paymentMethod }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type {
  ProductsListParams,
  ProductsListResponse,
  ProductDetailResponse,
  CategoriesResponse,
  CouponResponse,
  OrderResponse,
  PaymentGatewaysResponse,
  CartValidationResponse,
};
