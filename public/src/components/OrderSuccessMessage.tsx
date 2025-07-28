
import React from 'react';
import { CheckCircle, Package, Truck, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderSuccessMessageProps {
  orderNumber: string;
  customerName: string;
  onContinueShopping: () => void;
}

const OrderSuccessMessage = ({ orderNumber, customerName, onContinueShopping }: OrderSuccessMessageProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-fade-in-up shadow-eco-xl">
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-forest-100 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-forest-600 animate-bounce" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-coral rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🎉</span>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-outfit font-bold text-forest-700 mb-2">
          Order Confirmed! 
        </h2>
        <p className="text-sage-600 mb-6">
          Thank you {customerName}! Your eco-friendly order is on its way! 🌱
        </p>

        {/* Order Details */}
        <div className="bg-forest-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Package className="h-5 w-5 text-forest-600" />
            <span className="font-semibold text-forest-700">Order #{orderNumber}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-forest-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-forest-600" />
              </div>
              <div className="text-forest-600 font-medium">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-sage-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Package className="h-4 w-4 text-sage-600" />
              </div>
              <div className="text-sage-600">Packaging</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Truck className="h-4 w-4 text-gray-600" />
              </div>
              <div className="text-gray-600">Shipping</div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-forest-50 to-sage-50 rounded-xl p-4 mb-6 border border-forest-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-forest-600" />
            <span className="font-semibold text-forest-700">Eco Impact</span>
          </div>
          <p className="text-sm text-forest-600">
            Your purchase saved <strong>2.8kg CO₂</strong> compared to conventional products! 🌍
          </p>
        </div>

        {/* Cute Messages */}
        <div className="text-sm text-sage-600 mb-6 space-y-1">
          <p>🐝 You're bee-ing amazing for choosing sustainable!</p>
          <p>📧 Order confirmation sent to your email</p>
          <p>🚚 Expected delivery: 3-5 business days</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-forest-600 hover:bg-forest-700 text-white py-3"
            onClick={onContinueShopping}
          >
            Continue Shopping 🛍️
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-sage-300 text-sage-600 hover:bg-sage-50"
          >
            Track Your Order 📦
          </Button>
        </div>

        {/* Thank You Note */}
        <div className="mt-6 pt-4 border-t border-sage-200">
          <p className="text-xs text-sage-500">
            Thank you for making a difference! Every sustainable choice counts! 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessMessage;
