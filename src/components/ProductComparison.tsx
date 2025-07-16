
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, Recycle, Award } from 'lucide-react';
import { products } from '@/data/products';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  sustainabilityScore: number;
  certifications: string[];
  carbonFootprint: string;
  image: string;
}

interface ProductComparisonProps {
  comparedProducts: string[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

const ProductComparison = ({ comparedProducts, onRemoveProduct, onClearAll }: ProductComparisonProps) => {
  if (comparedProducts.length === 0) return null;

  const compareProducts = products.filter(p => comparedProducts.includes(p.id));

  return (
    <div className="bg-white rounded-eco shadow-eco p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-outfit font-bold text-forest-700">
          Product Comparison ({compareProducts.length})
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearAll}
          className="text-sage-600 hover:text-sage-800"
        >
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sage-200">
              <th className="text-left py-4 px-2 font-medium text-sage-600">Product</th>
              {compareProducts.map(product => (
                <th key={product.id} className="text-center py-4 px-2 min-w-[200px]">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveProduct(product.id)}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200"
                    >
                      <X className="h-3 w-3 text-red-600" />
                    </Button>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                    />
                    <div className="font-semibold text-forest-700 text-sm">
                      {product.name}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-sage-100">
            <tr>
              <td className="py-3 px-2 font-medium text-sage-700">Price</td>
              {compareProducts.map(product => (
                <td key={product.id} className="py-3 px-2 text-center">
                  <span className="text-lg font-bold text-forest-700">
                    ${product.price}
                  </span>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="py-3 px-2 font-medium text-sage-700">Rating</td>
              {compareProducts.map(product => (
                <td key={product.id} className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="py-3 px-2 font-medium text-sage-700">Sustainability Score</td>
              {compareProducts.map(product => (
                <td key={product.id} className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Recycle className="h-4 w-4 text-forest-600" />
                    <span className="font-bold text-forest-700">
                      {product.sustainabilityScore}/100
                    </span>
                  </div>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="py-3 px-2 font-medium text-sage-700">Carbon Impact</td>
              {compareProducts.map(product => (
                <td key={product.id} className="py-3 px-2 text-center">
                  <span className="text-forest-600 font-medium">
                    {product.carbonFootprint}
                  </span>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="py-3 px-2 font-medium text-sage-700">Certifications</td>
              {compareProducts.map(product => (
                <td key={product.id} className="py-3 px-2">
                  <div className="space-y-1">
                    {product.certifications.slice(0, 2).map(cert => (
                      <Badge key={cert} className="bg-forest-100 text-forest-700 text-xs block">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                    {product.certifications.length > 2 && (
                      <span className="text-xs text-sage-500">
                        +{product.certifications.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductComparison;
