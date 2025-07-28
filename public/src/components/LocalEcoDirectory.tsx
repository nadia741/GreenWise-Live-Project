
import React, { useState } from 'react';
import { MapPin, Star, Clock, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: number;
  address: string;
  phone: string;
  hours: string;
  description: string;
  certifications: string[];
}

const LocalEcoDirectory = () => {
  const [businesses] = useState<LocalBusiness[]>([
    {
      id: '1',
      name: 'Green Grocer Co-op',
      category: 'Organic Food',
      rating: 4.8,
      distance: 0.5,
      address: '123 Eco Street, Green City',
      phone: '(555) 123-4567',
      hours: '8 AM - 8 PM',
      description: 'Local organic produce and zero-waste grocery shopping',
      certifications: ['Organic Certified', 'Fair Trade']
    },
    {
      id: '2',
      name: 'Solar Solutions Plus',
      category: 'Renewable Energy',
      rating: 4.9,
      distance: 1.2,
      address: '456 Solar Ave, Eco Town',
      phone: '(555) 987-6543',
      hours: '9 AM - 6 PM',
      description: 'Professional solar panel installation and maintenance',
      certifications: ['NABCEP Certified', 'Green Business']
    }
  ]);

  return (
    <Card className="bg-gradient-to-br from-sage-50 to-forest-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-sage-100 rounded-lg">
            <MapPin className="h-6 w-6 text-sage-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-forest-700">Local Eco-Business Directory</h3>
            <p className="text-sm text-sage-600">Support sustainable businesses nearby</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {businesses.map((business) => (
            <div key={business.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-forest-700">{business.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(business.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({business.rating})</span>
                    <span className="text-sm text-tree-600">• {business.distance} mi away</span>
                  </div>
                </div>
                <Badge className="bg-tree-100 text-tree-700">{business.category}</Badge>
              </div>
              
              <p className="text-sm text-sage-600 mb-3">{business.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {business.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{business.hours}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-tree-600">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalEcoDirectory;
