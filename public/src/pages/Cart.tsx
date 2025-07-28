
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, Truck, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  // Calculate total carbon saved (assuming 2kg CO₂ per item for demo)
  const totalCarbonSaved = cartItems.reduce((sum, item) => sum + (2.0 * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="animate-bounce">
              <ShoppingBag className="h-24 w-24 text-sage-300 mx-auto mb-6" />
            </div>
            <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-4 animate-scale-in">Your Cart is Empty</h1>
            <p className="text-sage-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>Start shopping to build your sustainable lifestyle!</p>
            <Link to="/products">
              <Button className="bg-forest-700 hover:bg-forest-800 animate-scale-in hover:scale-110 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-8 animate-fade-in">
            Shopping Cart
            <span className="ml-4 text-lg text-sage-600">({getCartItemsCount()} items)</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-eco shadow-eco p-6 animate-scale-in">
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 pb-6 border-b border-sage-100 last:border-b-0 last:pb-0 animate-fade-in hover:bg-sage-50 rounded-lg p-4 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest-700 mb-1 hover:text-tree-600 transition-colors">{item.name}</h3>
                        <p className="text-sm text-sage-600 mb-2">Carbon saved: 2.0kg CO₂ per item</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-sage-200 rounded-lg overflow-hidden">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-sage-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-semibold min-w-[40px] text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-sage-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-forest-700 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-sage-600">${item.price} each</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-6 pt-6 border-t border-sage-100">
                  <Link to="/products">
                    <Button variant="outline" className="border-sage-300 hover:bg-sage-50 transition-all duration-300 hover:scale-105">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              {/* Environmental Impact */}
              <div className="bg-gradient-to-br from-sage-50 to-tree-50 rounded-eco p-6 animate-scale-in border border-sage-200" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-semibold text-forest-700 mb-4 flex items-center">
                  🌱 Environmental Impact
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-tree-600 animate-pulse">{totalCarbonSaved.toFixed(1)}kg CO₂</div>
                  <div className="text-sm text-sage-600">Carbon footprint reduced</div>
                  <div className="text-xs text-sage-500 mt-2">
                    Equivalent to planting {Math.round(totalCarbonSaved / 4)} trees 🌳
                  </div>
                </div>
              </div>
              
              
              {/* Order Summary */}
              <div className="bg-white rounded-eco shadow-eco p-6 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-semibold text-forest-700 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sage-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-sage-500 animate-pulse">
                      <Truck className="h-4 w-4 inline mr-1" />
                      Free shipping on orders over $50
                    </div>
                  )}
                  <div className="border-t border-sage-100 pt-3 flex justify-between text-lg font-bold">
                    <span className="text-forest-700">Total</span>
                    <span className="text-forest-700">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/checkout" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-forest-700 to-tree-600 hover:from-forest-800 hover:to-tree-700 transition-all duration-300 hover:scale-105 transform">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
