import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Truck, Shield, Recycle, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRewards } from '@/contexts/RewardsContext';
import OrderSuccessMessage from '@/components/OrderSuccessMessage';
import ProductReviews from '@/components/ProductReviews';
import ProductRecommendations from '@/components/ProductRecommendations';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { earnPoints } = useRewards();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Mock product data
  const product = {
    id: id,
    name: "Eco-Friendly Bamboo Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
    ],
    description: "Made from sustainable bamboo, this water bottle is perfect for eco-conscious individuals. Features double-wall insulation and leak-proof design with a sleek modern aesthetic.",
    features: [
      "100% sustainable bamboo construction",
      "Double-wall insulation keeps drinks cold for 24hrs",
      "Leak-proof design with secure cap",
      "BPA-free and food-grade materials",
      "Lightweight and durable",
      "Easy-grip ergonomic design"
    ],
    sustainability: {
      carbonSaved: "2.5kg CO₂",
      recyclable: true,
      sustainabilityScore: 9.2
    }
  };

  const mockReviews = [
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Johnson",
      rating: 5,
      comment: "Amazing quality! Love that it's eco-friendly and keeps my drinks cold all day. The bamboo texture feels premium and looks beautiful.",
      date: "2024-01-15",
      verified: true,
      helpful: 12
    },
    {
      id: "2",
      userId: "user2",
      userName: "Mike Chen",
      rating: 4,
      comment: "Great bottle, very sturdy. The bamboo finish looks beautiful and it's the perfect size for my daily needs.",
      date: "2024-01-10",
      verified: true,
      helpful: 8
    },
    {
      id: "3",
      userId: "user3",
      userName: "Emma Wilson",
      rating: 5,
      comment: "Best purchase I've made this year! Sustainable, functional, and stylish. Highly recommend to anyone looking to reduce plastic waste.",
      date: "2024-01-08",
      verified: true,
      helpful: 15
    }
  ];

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your cart.",
        duration: 4000,
      });
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    
    // Add to cart with animation
    const button = document.querySelector('.add-to-cart-main');
    if (button) {
      button.classList.add('cart-fly-animation');
    }

    // Add to cart
    addToCart({
      id: product.id!,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });

    // Notify about successful cart addition
    earnPoints(product.price * quantity);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsAddingToCart(false);
    
    toast({
      title: "Added to Cart! 🛒✨",
      description: `${quantity} x ${product.name} added successfully.`,
      duration: 4000,
    });

    // Remove animation class
    setTimeout(() => {
      if (button) {
        button.classList.remove('cart-fly-animation');
      }
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to proceed with your order.",
        duration: 4000,
      });
      navigate('/login');
      return;
    }

    // Mock successful order
    setShowOrderSuccess(true);
  };

  if (showOrderSuccess) {
    return (
      <OrderSuccessMessage 
        orderNumber="GW-2024-001"
        customerName="Eco Friend"
        onContinueShopping={() => setShowOrderSuccess(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl shadow-eco overflow-hidden animate-fade-in-scale">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover-lift ${
                    selectedImage === index ? 'ring-2 ring-forest-500 shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="ml-2 text-forest-600 font-medium">({product.reviews} reviews)</span>
                </div>
                {product.inStock && <Badge className="bg-forest-100 text-forest-700">✅ In Stock</Badge>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-4xl font-bold text-forest-700">${product.price}</span>
              <div className="flex items-center gap-4">
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                <Badge className="bg-coral-100 text-coral-700 text-lg px-3 py-1">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              </div>
            </div>

            {/* Sustainability Metrics */}
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
              <h3 className="font-semibold text-forest-700 mb-4 flex items-center text-lg">
                <Recycle className="h-6 w-6 mr-3 text-forest-600" />
                Environmental Impact
              </h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-bold text-forest-700 text-xl">{product.sustainability.carbonSaved}</div>
                  <div className="text-sage-600 text-sm">Carbon Saved</div>
                </div>
                <div>
                  <div className="font-bold text-forest-700 text-xl">{product.sustainability.sustainabilityScore}/10</div>
                  <div className="text-sage-600 text-sm">Eco Score</div>
                </div>
                <div>
                  <div className="font-bold text-forest-700 text-xl">✓ 100%</div>
                  <div className="text-sage-600 text-sm">Recyclable</div>
                </div>
              </div>
            </div>

            {/* Quantity and Actions - keeping existing code */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-forest-700">Quantity:</span>
              <div className="flex items-center border border-sage-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-none border-r"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-none border-l"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button 
                  className={`add-to-cart-main flex-1 bg-forest-700 hover:bg-forest-800 text-lg py-6 transition-all duration-300 ${
                    isAddingToCart ? 'animate-pulse' : 'hover:shadow-lg'
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCart className={`h-5 w-5 mr-2 ${isAddingToCart ? 'animate-bounce' : ''}`} />
                  {isAddingToCart ? 'Adding to Cart...' : `Add ${quantity} to Cart`}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`border-sage-300 hover:bg-sage-50 w-16 h-16 transition-all duration-300 ${
                    isLiked ? 'bg-coral-50 border-coral-300' : ''
                  }`}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    toast({
                      title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
                      description: isLiked ? "💔 Item removed" : "❤️ Item saved for later",
                      duration: 2000,
                    });
                  }}
                >
                  <Heart className={`h-6 w-6 transition-all duration-300 ${
                    isLiked ? 'fill-coral text-coral heart-bounce' : 'text-sage-600'
                  }`} />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-tree-600 hover:bg-tree-700 text-white text-lg py-6"
                onClick={handleBuyNow}
              >
                Buy Now - Express Checkout
              </Button>
              
              <div className="flex items-center gap-6 text-sm text-sage-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Free shipping on orders $25+
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  30-day return policy
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-4 text-lg">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-forest-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-forest-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-3 text-lg">Description</h3>
              <p className="text-forest-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16" id="reviews">
          <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-8">Customer Reviews</h2>
          <ProductReviews productId={product.id!} reviews={mockReviews} />
        </div>

        {/* Recommendations */}
        <div className="mb-16">
          <ProductRecommendations currentProductId={product.id} userId={user?.id} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
