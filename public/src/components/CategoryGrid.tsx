
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { categories, products } from '@/data/products';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const getCategoryProductCount = (categoryKey: string) => {
    return products.filter(product => product.category === categories[categoryKey as keyof typeof categories]?.name).length;
  };

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/products?category=${categoryKey}`);
  };

  const categoryData = [
    {
      key: 'Kids & Pets',
      icon: '🌸',
      title: 'Kids & Pets',
      description: 'Safe, sustainable products for your little ones and furry friends',
      count: getCategoryProductCount('Kids & Pets')
    },
    {
      key: 'Beauty & Personal Care',
      icon: '💎',
      title: 'Beauty & Personal Care',
      description: 'Natural, refillable beauty products for conscious consumers',
      count: getCategoryProductCount('Beauty & Personal Care')
    },
    {
      key: 'Home & Kitchen',
      icon: '🏮',
      title: 'Home & Kitchen',
      description: 'Sustainable solutions for cooking, cleaning, and living',
      count: getCategoryProductCount('Home & Kitchen')
    },
    {
      key: 'Bathroom Essentials',
      icon: '🧘',
      title: 'Bathroom Essentials',
      description: 'Plastic-free alternatives for your daily bathroom routine',
      count: getCategoryProductCount('Bathroom Essentials')
    },
    {
      key: 'Drinkware',
      icon: '🌊',
      title: 'Drinkware',
      description: 'Sustainable bottles and cups for hydration on-the-go',
      count: products.filter(p => p.category === 'Drinkware').length
    },
    {
      key: 'Bags',
      icon: '🌿',
      title: 'Bags & Accessories',
      description: 'Stylish bags made from sustainable materials',
      count: products.filter(p => p.category === 'Bags').length
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-cream-50 to-sage-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-forest-600 rounded mr-3 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <h2 className="text-3xl font-outfit font-bold text-forest-700">
              Shop by Category
            </h2>
          </div>
          <p className="text-sage-600 text-lg max-w-2xl">
            Discover sustainable products across all categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryData.map((category) => (
            <Card 
              key={category.key}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sage-200 bg-white/80 backdrop-blur-sm"
              onClick={() => handleCategoryClick(category.key)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <ChevronRight className="h-5 w-5 text-sage-400 group-hover:text-forest-600 transition-colors" />
                </div>
                
                <h3 className="font-outfit font-bold text-forest-700 text-lg mb-2 group-hover:text-tree-600 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-sage-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/products')}
            className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
