
import React, { useState } from 'react';
import { Leaf, TrendingUp, Shield, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CarbonCredit {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  verified: boolean;
  projectType: string;
  co2Amount: number;
  vintage: string;
  seller: string;
}

const CarbonOffsetMarketplace = () => {
  const [credits] = useState<CarbonCredit[]>([
    {
      id: '1',
      title: 'Amazon Rainforest Conservation',
      description: 'Protecting 1,000 hectares of pristine rainforest in Brazil',
      price: 12.50,
      location: 'Brazil',
      verified: true,
      projectType: 'Forest Conservation',
      co2Amount: 1,
      vintage: '2024',
      seller: 'Green Forest Initiative'
    },
    {
      id: '2',
      title: 'Solar Farm Development',
      description: 'Supporting renewable energy infrastructure in rural India',
      price: 8.75,
      location: 'India',
      verified: true,
      projectType: 'Renewable Energy',
      co2Amount: 1,
      vintage: '2024',
      seller: 'SolarTech Solutions'
    },
    {
      id: '3',
      title: 'Mangrove Restoration',
      description: 'Replanting mangroves along Indonesian coastlines',
      price: 15.00,
      location: 'Indonesia',
      verified: true,
      projectType: 'Reforestation',
      co2Amount: 1,
      vintage: '2024',
      seller: 'Ocean Blue Foundation'
    }
  ]);

  const { toast } = useToast();

  const buyCredit = (credit: CarbonCredit) => {
    toast({
      title: "🌱 Carbon Credit Purchased!",
      description: `You've offset ${credit.co2Amount} ton of CO₂ with ${credit.title}`,
      duration: 4000,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-forest-50 to-sage-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-forest-100 rounded-lg">
            <Leaf className="h-6 w-6 text-forest-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">Carbon Offset Marketplace</h3>
            <p className="text-sm text-sage-600">Buy verified carbon credits to offset your footprint</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {credits.map((credit) => (
            <div key={credit.id} className="bg-white rounded-lg p-6 shadow-sm border border-sage-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-forest-700 text-lg">{credit.title}</h4>
                    {credit.verified && (
                      <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sage-600 mb-3">{credit.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{credit.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Vintage {credit.vintage}</span>
                    </div>
                    <Badge variant="outline" className="text-tree-600 border-tree-200">
                      {credit.projectType}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold text-forest-700">
                      ${credit.price}
                    </div>
                    <div className="text-sm text-gray-500">per ton CO₂</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-tree-600">
                      {credit.co2Amount} ton
                    </div>
                    <div className="text-xs text-gray-500">CO₂ offset</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">Sold by {credit.seller}</div>
                  <Button 
                    onClick={() => buyCredit(credit)}
                    className="bg-forest-600 hover:bg-forest-700"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Buy Credit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-tree-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-tree-700">Your Carbon Portfolio</h4>
              <p className="text-sm text-tree-600">Total offset: 12.5 tons CO₂</p>
            </div>
            <Button variant="outline" className="border-tree-300 text-tree-600">
              View Portfolio
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonOffsetMarketplace;
