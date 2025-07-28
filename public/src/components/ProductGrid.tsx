
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  // Enhanced product data with real images and professional descriptions
  const products = [
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
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cream-50 to-sage-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-forest-100 text-forest-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse"></span>
            Featured Collection
          </div>
          <h2 className="text-4xl sm:text-5xl font-outfit font-bold text-forest-700 mb-6">
            Sustainable Essentials for
            <span className="block text-tree-600">Conscious Living</span>
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of eco-friendly products that make a positive impact on the planet while enhancing your daily life
          </p>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-forest-700">2.5M+</div>
              <div className="text-sm text-sage-600">kg CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-forest-700">50K+</div>
              <div className="text-sm text-sage-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-forest-700">98%</div>
              <div className="text-sm text-sage-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-eco-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-outfit font-bold text-forest-700 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              Join thousands of conscious consumers making sustainable choices every day. 
              Every purchase contributes to a healthier planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-forest-600 hover:bg-forest-700 text-white font-semibold py-4 px-8 rounded-xl shadow-eco-lg hover-lift transition-all duration-300 transform hover:scale-105">
                View All Products
              </button>
              <button className="border-2 border-sage-300 text-sage-700 hover:bg-sage-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                Learn Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 border-t border-sage-200 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-forest-600 text-xl">🌱</span>
              </div>
              <div className="font-semibold text-forest-700">100% Sustainable</div>
              <div className="text-sm text-sage-600">Certified eco-friendly</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-forest-600 text-xl">🚚</span>
              </div>
              <div className="font-semibold text-forest-700">Free Shipping</div>
              <div className="text-sm text-sage-600">On orders over $50</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-forest-600 text-xl">↩️</span>
              </div>
              <div className="font-semibold text-forest-700">30-Day Returns</div>
              <div className="text-sm text-sage-600">Hassle-free policy</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-forest-600 text-xl">🔒</span>
              </div>
              <div className="font-semibold text-forest-700">Secure Payment</div>
              <div className="text-sm text-sage-600">Protected checkout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
