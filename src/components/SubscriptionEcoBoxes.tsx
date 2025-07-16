
import React, { useState } from 'react';
import { Package, Calendar, Gift, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface EcoBox {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  items: string[];
  category: string;
  rating: number;
  subscribers: number;
}

const SubscriptionEcoBoxes = () => {
  const [boxes] = useState<EcoBox[]>([
    {
      id: '1',
      name: 'Zero Waste Starter Kit',
      description: 'Monthly box of plastic-free essentials for your home',
      price: 29.99,
      frequency: 'Monthly',
      items: ['Bamboo utensils', 'Reusable containers', 'Eco cleaning supplies', 'Surprise sustainable items'],
      category: 'Home & Living',
      rating: 4.7,
      subscribers: 2847
    },
    {
      id: '2',
      name: 'Organic Beauty Box',
      description: 'Natural skincare and beauty products delivered quarterly',
      price: 39.99,
      frequency: 'Quarterly',
      items: ['Organic face masks', 'Natural moisturizers', 'Eco-friendly makeup', 'Wellness supplements'],
      category: 'Beauty & Wellness',
      rating: 4.9,
      subscribers: 1923
    }
  ]);

  const { toast } = useToast();

  const subscribe = (box: EcoBox) => {
    toast({
      title: "📦 Subscription Started!",
      description: `You're now subscribed to ${box.name}. First box ships soon!`,
      duration: 4000,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-tree-50 to-sage-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-tree-100 rounded-lg">
            <Package className="h-6 w-6 text-tree-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">Subscription Eco-Boxes</h3>
            <p className="text-sm text-sage-600">Curated sustainable products delivered to you</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {boxes.map((box) => (
            <div key={box.id} className="bg-white rounded-lg p-6 shadow-sm border border-sage-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-forest-700 text-lg">{box.name}</h4>
                    <Badge className="bg-tree-100 text-tree-700">{box.category}</Badge>
                  </div>
                  <p className="text-sage-600 mb-3">{box.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{box.frequency}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span>{box.rating} ({box.subscribers} subscribers)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium text-forest-700 mb-2 flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  What's included:
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {box.items.map((item, index) => (
                    <div key={index} className="text-sm text-sage-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-tree-400 rounded-full"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-forest-700">${box.price}</span>
                  <span className="text-sm text-gray-500">per {box.frequency.toLowerCase()}</span>
                </div>
                <Button 
                  onClick={() => subscribe(box)}
                  className="bg-tree-600 hover:bg-tree-700"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Subscribe Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-tree-100 rounded-lg text-center">
          <h4 className="font-semibold text-tree-700 mb-2">🎁 Special Offer</h4>
          <p className="text-sm text-tree-600">
            Use code FIRSTBOX for 20% off your first subscription box!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionEcoBoxes;
