const API_BASE_URL = "/api";

// Timeout for API requests (5 seconds)
const API_TIMEOUT = 5000;

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  product: {
    _id: string;
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sustainabilityScore: number;
  inventory: number;
  averageRating: number;
  numReviews: number;
  sustainabilityFeatures: string[];
}

export interface ProductsResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: {
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced fetch with timeout and retry logic
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  retries = 0
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Retry on network errors if retries available
    if (
      retries < MAX_RETRIES &&
      error instanceof Error &&
      (error.name === "AbortError" || error.message.includes("fetch"))
    ) {
      console.warn(
        `API request failed, retrying... (${retries + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchWithTimeout(url, options, retries + 1);
    }

    throw error;
  }
};

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Login failed" }));
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Registration failed" }));
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },
};

export const reviewApi = {
  // PUBLIC - No token required
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/reviews/product/${productId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return response.json();
  },

  // PUBLIC - No token required
  getRecentReviews: async (limit: number = 6): Promise<Review[]> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/reviews/recent/${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recent reviews");
    }

    return response.json();
  },

  // PRIVATE - Token required
  createReview: async (
    productId: string,
    rating: number,
    comment: string,
    token: string
  ): Promise<Review> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/reviews/product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to create review" }));
      throw new Error(error.message || "Failed to create review");
    }

    return response.json();
  },
};

export const wishlistApi = {
  // PRIVATE - Token required
  getWishlist: async (token: string): Promise<Product[]> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/users/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    return response.json();
  },

  // PRIVATE - Token required
  addToWishlist: async (
    productId: string,
    token: string
  ): Promise<Product[]> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/users/wishlist/${productId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to add to wishlist" }));
      throw new Error(error.message || "Failed to add to wishlist");
    }

    return response.json();
  },

  // PRIVATE - Token required
  removeFromWishlist: async (
    productId: string,
    token: string
  ): Promise<Product[]> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/users/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to remove from wishlist" }));
      throw new Error(error.message || "Failed to remove from wishlist");
    }

    return response.json();
  },
};

export const productsApi = {
  // PUBLIC - No token required
  getProducts: async (
    params: Record<string, string> = {}
  ): Promise<ProductsResponse> => {
    const queryParams = new URLSearchParams(params);
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/products?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  // PUBLIC - No token required
  getProduct: async (productId: string): Promise<Product> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/products/${productId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  },
};

export const orderApi = {
  // PRIVATE - Token required
  createOrder: async (
    orderData: {
      orderItems: {
        name: string;
        quantity: number;
        image: string;
        price: number;
        product: string;
      }[];
      shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
      };
      totalPrice: number;
    },
    token: string
  ): Promise<Order> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to create order" }));
      throw new Error(error.message || "Failed to create order");
    }

    return response.json();
  },

  // PRIVATE - Token required
  getUserOrders: async (token: string): Promise<Order[]> => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  },

  // PRIVATE - Token required
  getOrderById: async (orderId: string, token: string): Promise<Order> => {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return response.json();
  },
};

export const api = {
  auth: authApi,
  reviews: reviewApi,
  wishlist: wishlistApi,
  products: productsApi,
  orders: orderApi,
};

export default api;
