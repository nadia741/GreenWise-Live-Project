
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Truck, Shield, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRewards } from '@/contexts/RewardsContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { earnPoints } = useRewards();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentTab, setCurrentTab] = useState('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    billingIsSame: true,
    saveInfo: false
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || !shippingInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping information.",
        duration: 3000,
      });
      return;
    }
    setCurrentTab('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv || !paymentInfo.cardName) {
      toast({
        title: "Missing Payment Information",
        description: "Please fill in all payment details.",
        duration: 3000,
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Award points for each item purchased
      cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        earnPoints(itemTotal);
      });
      
      // Clear cart and show success
      clearCart();
      
      toast({
        title: "🎉 Order Placed Successfully!",
        description: `Your order of $${total.toFixed(2)} has been processed. You've earned sustainability points!`,
        duration: 5000,
      });

      // Redirect to success page
      navigate('/');
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24 text-center">
          <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-4">Your cart is empty</h1>
          <p className="text-sage-600 mb-8">Add some eco-friendly products to get started!</p>
          <Button onClick={() => navigate('/products')} className="bg-forest-700 hover:bg-forest-800">
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 ${currentTab === 'shipping' ? 'bg-forest-700' : 'bg-forest-700'} text-white rounded-full flex items-center justify-center text-sm`}>1</div>
                <span className={`ml-2 ${currentTab === 'shipping' ? 'text-forest-700' : 'text-forest-700'} font-medium`}>Shipping</span>
              </div>
              <div className={`w-16 h-1 ${currentTab === 'payment' ? 'bg-forest-700' : 'bg-sage-300'}`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 ${currentTab === 'payment' ? 'bg-forest-700' : 'bg-sage-300'} text-white rounded-full flex items-center justify-center text-sm`}>2</div>
                <span className={`ml-2 ${currentTab === 'payment' ? 'text-forest-700' : 'text-sage-600'}`}>Payment</span>
              </div>
              <div className="w-16 h-1 bg-sage-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-sage-200 text-sage-400 rounded-full flex items-center justify-center text-sm">3</div>
                <span className="ml-2 text-sage-400">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-eco shadow-eco p-6">
                <h2 className="text-2xl font-outfit font-bold text-forest-700 mb-6">Checkout</h2>
                
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="shipping" className="mt-6">
                    <form onSubmit={handleShippingSubmit} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-forest-700 mb-4">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input 
                              id="firstName" 
                              value={shippingInfo.firstName}
                              onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                              placeholder="John" 
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input 
                              id="lastName" 
                              value={shippingInfo.lastName}
                              onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                              placeholder="Doe" 
                              required
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                            placeholder="john@example.com" 
                            required
                          />
                        </div>
                        <div className="mt-4">
                          <Label htmlFor="address">Address *</Label>
                          <Input 
                            id="address" 
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                            placeholder="123 Main Street" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input 
                              id="city" 
                              value={shippingInfo.city}
                              onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                              placeholder="New York" 
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input 
                              id="state" 
                              value={shippingInfo.state}
                              onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                              placeholder="NY" 
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code *</Label>
                            <Input 
                              id="zip" 
                              value={shippingInfo.zip}
                              onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                              placeholder="10001" 
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="billing-same" 
                          checked={shippingInfo.billingIsSame}
                          onCheckedChange={(checked) => setShippingInfo({...shippingInfo, billingIsSame: checked as boolean})}
                        />
                        <Label htmlFor="billing-same">Billing address same as shipping</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="save-info" 
                          checked={shippingInfo.saveInfo}
                          onCheckedChange={(checked) => setShippingInfo({...shippingInfo, saveInfo: checked as boolean})}
                        />
                        <Label htmlFor="save-info">Save this information for next time</Label>
                      </div>

                      <Button type="submit" className="w-full bg-forest-700 hover:bg-forest-800">
                        Continue to Payment
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="mt-6">
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-forest-700 mb-4">Payment Method</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="credit-card" name="payment" className="text-forest-700" defaultChecked />
                            <Label htmlFor="credit-card" className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Credit Card
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input 
                            id="cardNumber" 
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456" 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input 
                              id="expiry" 
                              value={paymentInfo.expiry}
                              onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                              placeholder="MM/YY" 
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input 
                              id="cvv" 
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                              placeholder="123" 
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input 
                            id="cardName" 
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                            placeholder="John Doe" 
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setCurrentTab('shipping')}
                          className="flex-1"
                        >
                          Back to Shipping
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1 bg-forest-700 hover:bg-forest-800"
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              {/* Environmental Impact */}
              <div className="bg-sage-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4 flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  Your Impact
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-700">{(cartItems.length * 1.2).toFixed(1)}kg CO₂</div>
                  <div className="text-sm text-sage-600">Carbon footprint reduced</div>
                  <div className="text-xs text-sage-500 mt-2">
                    🌱 Equivalent to planting {cartItems.length} tree{cartItems.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-eco shadow-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-forest-700 text-sm">{item.name}</div>
                        <div className="text-xs text-sage-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-sage-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-600">Shipping</span>
                    <span className="text-sage-700">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-sage-100 pt-2">
                    <span className="text-forest-700">Total</span>
                    <span className="text-forest-700">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-sage-500">
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure checkout
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    Free returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
