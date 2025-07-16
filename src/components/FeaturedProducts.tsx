
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Enhanced product data with more products
  const allProducts = [
    {
      id: '1',
      name: 'Organic Cotton Classic T-Shirt',
      price: 28.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 95,
      certifications: ['GOTS Certified', 'Fair Trade', 'Carbon Neutral'],
      carbonFootprint: '2.1kg CO₂ saved',
      isNew: true,
      description: 'Ultra-soft organic cotton tee made from sustainably grown cotton. Perfect for everyday wear with a conscience.',
    },
    {
      id: '2',
      name: 'Bamboo Athletic Performance Set',
      price: 78.00,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1506629905138-c3d9db2cd4b0?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 88,
      certifications: ['OEKO-TEX Standard', 'Cradle to Cradle'],
      carbonFootprint: '3.4kg CO₂ saved',
      isBestseller: true,
      description: 'Moisture-wicking bamboo fiber activewear that keeps you cool and comfortable during workouts.',
    },
    {
      id: '3',
      name: 'Insulated Stainless Steel Water Bottle',
      price: 32.50,
      originalPrice: 45.00,
      rating: 4.7,
      reviews: 512,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 92,
      certifications: ['BPA-Free', '100% Recyclable'],
      carbonFootprint: '0.8kg CO₂ saved',
      description: 'Double-wall vacuum insulation keeps drinks cold for 24hrs or hot for 12hrs. Made from premium stainless steel.',
    },
    {
      id: '4',
      name: 'Natural Hemp Rope Dog Toy',
      price: 16.99,
      rating: 4.6,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 85,
      certifications: ['100% Natural', 'Non-Toxic'],
      carbonFootprint: '0.5kg CO₂ saved',
      description: 'Durable hemp rope toy that\'s safe for pets and biodegradable. Hours of eco-friendly fun for your furry friend.',
    },
    {
      id: '5',
      name: 'Bamboo Kitchen Utensil Set',
      price: 34.00,
      rating: 4.8,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 90,
      certifications: ['FSC Certified', 'Plastic-Free'],
      carbonFootprint: '1.2kg CO₂ saved',
      description: 'Complete 6-piece bamboo kitchen set including spatulas, spoons, and serving utensils. Naturally antimicrobial.',
    },
    {
      id: '6',
      name: 'Zero Waste Shampoo Bar',
      price: 14.99,
      rating: 4.5,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 87,
      certifications: ['Cruelty-Free', 'Vegan', 'Plastic-Free'],
      carbonFootprint: '0.2kg CO₂ saved',
      description: 'Concentrated shampoo bar with natural ingredients. One bar equals 2-3 bottles of liquid shampoo.',
    },
    {
      id: '7',
      name: 'Recycled Canvas Weekend Tote',
      price: 42.00,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 88,
      certifications: ['Recycled Materials', 'Fair Trade'],
      carbonFootprint: '1.8kg CO₂ saved',
      description: 'Spacious tote bag made from recycled canvas with reinforced handles. Perfect for shopping or travel.',
    },
    {
      id: '8',
      name: 'Organic Baby Care Essential Kit',
      price: 52.99,
      rating: 4.9,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 95,
      certifications: ['USDA Organic', 'Hypoallergenic'],
      carbonFootprint: '1.1kg CO₂ saved',
      isNew: true,
      description: 'Complete organic baby care set with gentle lotions, soaps, and accessories. Safe for sensitive skin.',
    },
    // Additional products for page 2
    {
      id: '9',
      name: 'Solar LED Garden Lights Set',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.6,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 82,
      certifications: ['Energy Star', 'Weatherproof'],
      carbonFootprint: '3.2kg CO₂ saved',
      description: 'Set of 8 solar-powered LED lights for garden pathways. Automatic dusk-to-dawn operation.',
    },
    {
      id: '10',
      name: 'Reusable Silicone Food Storage Bags',
      price: 24.99,
      rating: 4.4,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1567958100051-3b84b75b3ba1?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 88,
      certifications: ['BPA-Free', 'Food Grade'],
      carbonFootprint: '1.5kg CO₂ saved',
      description: 'Airtight silicone bags that replace single-use plastic. Dishwasher safe and leak-proof.',
    },
    {
      id: '11',
      name: 'Sustainable Cork Yoga Mat',
      price: 68.00,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 91,
      certifications: ['Natural Cork', 'Non-Slip'],
      carbonFootprint: '2.3kg CO₂ saved',
      description: 'Premium cork yoga mat with natural rubber base. Antimicrobial and provides excellent grip.',
    },
    {
      id: '12',
      name: 'Organic Cotton Baby Onesies 3-Pack',
      price: 36.99,
      rating: 4.8,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 93,
      certifications: ['GOTS Certified', 'Hypoallergenic'],
      carbonFootprint: '0.9kg CO₂ saved',
      description: 'Soft organic cotton onesies in neutral colors. Perfect for sensitive baby skin.',
    }
  ];

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = allProducts.slice(startIndex, startIndex + productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-sage-50/30 to-tree-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span className="w-2 h-2 bg-tree-500 rounded-full animate-pulse"></span>
            Featured Sustainable Products
          </div>
          <h2 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            Discover Our
            <span className="block text-tree-600">Eco-Friendly Collection</span>
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked sustainable products that make a positive impact on our planet while enhancing your lifestyle
          </p>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {currentProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-center space-x-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-6 py-3 font-semibold border-tree-200 hover:bg-tree-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sage-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                    currentPage === i + 1
                      ? 'bg-tree-600 text-white shadow-lg'
                      : 'bg-sage-100 text-sage-600 hover:bg-tree-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-6 py-3 font-semibold border-tree-200 hover:bg-tree-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-tree-600 to-forest-600 rounded-3xl p-12 shadow-2xl text-white">
            <h3 className="text-3xl font-outfit font-bold mb-4">
              Ready to Shop More Sustainable Products?
            </h3>
            <p className="text-tree-100 mb-8 max-w-2xl mx-auto text-lg">
              Explore our full catalog of eco-friendly products and join the sustainable living movement.
            </p>
            <Button 
              size="lg"
              className="bg-white text-tree-600 hover:bg-cream-50 font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
