import React from 'react';
import { CheckCircle, Package, Truck, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shippingAddress: string;
}

const OrderConfirmationEmail = ({ 
  orderNumber, 
  customerName, 
  items, 
  total, 
  shippingAddress 
}: OrderConfirmationEmailProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-sage-200 rounded-eco shadow-eco overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-tree-600 to-forest-600 text-white p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl font-outfit font-bold mb-2">Order Confirmed!</h1>
        <p className="text-tree-100">Thank you for your eco-friendly purchase, {customerName}</p>
      </div>

      {/* Order Details */}
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-tree-600" />
            <h2 className="text-xl font-semibold text-forest-700">Order #{orderNumber}</h2>
          </div>
          
          <div className="bg-sage-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-forest-700 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-sage-600">{item.name} (x{item.quantity})</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-sage-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-forest-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-tree-600" />
                <h3 className="font-semibold text-forest-700">Delivery Address</h3>
              </div>
              <p className="text-sage-600 text-sm">{shippingAddress}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-tree-600" />
                <h3 className="font-semibold text-forest-700">Payment Method</h3>
              </div>
              <p className="text-sage-600 text-sm">Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-tree-50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-tree-600" />
            <h3 className="font-semibold text-forest-700">Your Environmental Impact</h3>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-tree-700 mb-1">
              {(items.length * 1.2).toFixed(1)}kg CO₂ Saved
            </div>
            <p className="text-tree-600 text-sm">
              🌱 Equivalent to planting {items.length} tree{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <h3 className="font-semibold text-forest-700 mb-4">What's Next?</h3>
          <div className="space-y-3 text-sm text-sage-600 mb-6">
            <p>• We're preparing your order for shipment</p>
            <p>• You'll receive a tracking number within 24 hours</p>
            <p>• Have your cash ready for delivery (exact change appreciated)</p>
            <p>• Expected delivery: 3-5 business days</p>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full bg-tree-600 hover:bg-tree-700">
              Track Your Order
            </Button>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-sage-50 p-6 text-center border-t border-sage-200">
        <p className="text-sm text-sage-600 mb-2">
          Questions about your order? Contact us at support@greenwise.com
        </p>
        <p className="text-xs text-sage-500">
          Thank you for choosing sustainable products and helping protect our planet! 🌍
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationEmail;