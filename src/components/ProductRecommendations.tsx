
import React from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductRecommendationsProps {
  userId?: string;
  currentProductId?: string;
  limit?: number;
}

const ProductRecommendations = ({ userId, currentProductId, limit = 4 }: ProductRecommendationsProps) => {
  // Simple recommendation algorithm - in a real app this would use ML/AI
  const getRecommendations = () => {
    let recommendedProducts = products.filter(p => p.id !== currentProductId);
    
    // Simple algorithm: prioritize bestsellers and highly rated items
    recommendedProducts = recommendedProducts
      .sort((a, b) => {
        const scoreA = (a.isBestseller ? 2 : 0) + (a.rating * 0.5) + (a.sustainabilityScore * 0.01);
        const scoreB = (b.isBestseller ? 2 : 0) + (b.rating * 0.5) + (b.sustainabilityScore * 0.01);
        return scoreB - scoreA;
      })
      .slice(0, limit);
      
    return recommendedProducts;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-sage-50 to-tree-50 rounded-eco p-8 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-forest-100 rounded-lg">
          <Sparkles className="h-6 w-6 text-forest-600 animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl font-outfit font-bold text-forest-700">
            Recommended for You
          </h3>
          <p className="text-sage-600">Curated based on your eco-friendly preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <div 
            key={product.id}
            className="animate-fade-in-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
