import { useAuth } from "@/contexts/auth";
import { api, Product, Order } from "@/services/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  wishlistLoading: boolean;
  orderHistory: Order[];
  orderLoading: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getOrderCount: () => number;
  addToWishlist: (item: Product) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  createOrder: (shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  }) => Promise<Order>;
  refreshOrders: () => Promise<void>;
}

export type { CartContextType };

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("greenwise_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("greenwise_cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("greenwise_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load wishlist from database when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      if (user?.token) {
        try {
          setWishlistLoading(true);
          const wishlist = await api.wishlist.getWishlist(user.token);
          setWishlistItems(wishlist || []);
        } catch (error) {
          console.error("Error loading wishlist:", error);
          setWishlistItems([]);
        } finally {
          setWishlistLoading(false);
        }
      } else {
        setWishlistItems([]);
        setWishlistLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  // Load orders from database when user changes
  useEffect(() => {
    const loadOrders = async () => {
      if (user?.token) {
        try {
          setOrderLoading(true);
          const orders = await api.orders.getUserOrders(user.token);
          setOrderHistory(orders || []);
        } catch (error) {
          console.error("Error loading orders:", error);
          setOrderHistory([]);
        } finally {
          setOrderLoading(false);
        }
      } else {
        setOrderHistory([]);
        setOrderLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // Load order history from database when user changes
  useEffect(() => {
    const loadOrders = async () => {
      if (user?.token) {
        try {
          setOrderLoading(true);
          const orders = await api.orders.getUserOrders(user.token);
          setOrderHistory(orders || []);
        } catch (error) {
          console.error("Error loading order history:", error);
          setOrderHistory([]);
        } finally {
          setOrderLoading(false);
        }
      } else {
        setOrderHistory([]);
        setOrderLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // Cart functions (localStorage-based)
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getOrderCount = () => {
    return orderHistory.length;
  };

  // Order functions (database-based, requires authentication)
  const createOrder = async (shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  }): Promise<Order> => {
    if (!user?.token) {
      throw new Error("Please sign in to place an order");
    }

    if (cartItems.length === 0) {
      throw new Error("Your cart is empty");
    }

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.id, // Using the product ID
        })),
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.zipCode,
          country: shippingAddress.country || "United States",
        },
        totalPrice: getCartTotal(),
      };

      const order = await api.orders.createOrder(orderData, user.token);

      // Clear cart after successful order
      clearCart();

      // Refresh order history
      await refreshOrders();

      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const refreshOrders = async () => {
    if (!user?.token) return;

    try {
      setOrderLoading(true);
      const orders = await api.orders.getUserOrders(user.token);
      setOrderHistory(orders || []);
    } catch (error) {
      console.error("Error refreshing orders:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  // Wishlist functions (database-based, requires authentication)
  const addToWishlist = async (item: Product) => {
    if (!user?.token) {
      throw new Error("Please sign in to add items to your wishlist");
    }

    try {
      const updatedWishlist = await api.wishlist.addToWishlist(
        item._id,
        user.token
      );
      setWishlistItems(updatedWishlist || []);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!user?.token) {
      throw new Error("Please sign in to manage your wishlist");
    }

    try {
      const updatedWishlist = await api.wishlist.removeFromWishlist(
        id,
        user.token
      );
      setWishlistItems(updatedWishlist || []);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item._id === id);
  };

  const value: CartContextType = {
    cartItems,
    wishlistItems,
    wishlistLoading,
    orderHistory,
    orderLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getOrderCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    createOrder,
    refreshOrders,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
