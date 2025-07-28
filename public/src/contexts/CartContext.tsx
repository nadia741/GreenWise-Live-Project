
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
  shippingAddress: string;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  orderHistory: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getWishlistItemsCount: () => number;
  getOrderCount: () => number;
  completeOrder: (shippingInfo: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const { toast } = useToast();

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantityToAdd = item.quantity || 1;
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem
        );
      }
      return [...prev, { 
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: quantityToAdd 
      }];
    });

    toast({
      title: "🛒 Added to Cart!",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart.",
      duration: 2000,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.find(wishItem => wishItem.id === item.id);
      if (exists) {
        toast({
          title: "Already in Wishlist",
          description: "This item is already in your wishlist.",
          duration: 2000,
        });
        return prev;
      }
      toast({
        title: "❤️ Added to Wishlist!",
        description: `${item.name} has been saved for later.`,
        duration: 3000,
      });
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "💔 Removed from Wishlist",
      description: "Item removed from your wishlist.",
      duration: 2000,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const completeOrder = (shippingInfo: any) => {
    const orderNumber = `GW${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      id: orderNumber,
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      total: getCartTotal(),
      status: 'processing',
      shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`
    };
    
    setOrderHistory(prev => [newOrder, ...prev]);
    clearCart();
    return orderNumber;
  };

  const getOrderCount = () => {
    return orderHistory.length;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getWishlistItemsCount = () => {
    return wishlistItems.length;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      orderHistory,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToWishlist,
      removeFromWishlist,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      getWishlistItemsCount,
      getOrderCount,
      completeOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
