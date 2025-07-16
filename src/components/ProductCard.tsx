
import React, { useState } from 'react';
import { Heart, Star, Leaf, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  sustainabilityScore: number;
  certifications: string[];
  carbonFootprint: string;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  sustainabilityScore,
  certifications = [], // Default to empty array
  carbonFootprint,
  isNew = false,
  isBestseller = false,
  description = "",
  category = "",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = wishlistItems.some(item => item.id === id);

  const getSustainabilityColor = (score: number) => {
    if (score >= 90) return 'bg-tree-500';
    if (score >= 70) return 'bg-forest-500';
    return 'bg-sage-500';
  };

  const getSustainabilityText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Fair';
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "🔒 Sign Up Required",
        description: "Please sign up or sign in to add items to your cart.",
        duration: 3000,
      });
      navigate('/signup');
      return;
    }
    
    setIsAddingToCart(true);
    
    // Create magical flying animation
    const cartButton = e.currentTarget as HTMLElement;
    const rect = cartButton.getBoundingClientRect();
    
    // Create flying product element with sparkles
    const flyingElement = document.createElement('div');
    flyingElement.className = 'fixed z-[9999] pointer-events-none';
    flyingElement.style.left = `${rect.left + rect.width / 2}px`;
    flyingElement.style.top = `${rect.top + rect.height / 2}px`;
    flyingElement.style.transform = 'translate(-50%, -50%)';
    flyingElement.innerHTML = `
      <div class="relative">
        <div class="w-16 h-16 bg-gradient-to-br from-tree-500 to-tree-600 rounded-2xl flex items-center justify-center text-white shadow-2xl animate-bounce-in">
          <img src="${image}" alt="${name}" class="w-12 h-12 object-cover rounded-xl" />
        </div>
        <div class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
      </div>
    `;
    
    document.body.appendChild(flyingElement);
    
    // Animate to cart with magical trail
    setTimeout(() => {
      flyingElement.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      flyingElement.style.transform = 'translate(400px, -250px) scale(0.1) rotate(720deg)';
      flyingElement.style.opacity = '0';
    }, 100);
    
    // Remove element after animation
    setTimeout(() => {
      document.body.removeChild(flyingElement);
    }, 1300);

    // Add to cart
    addToCart({ id, name, price, image });

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsAddingToCart(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "🔒 Sign Up Required",
        description: "Please sign up or sign in to add items to your wishlist.",
        duration: 3000,
      });
      navigate('/signup');
      return;
    }

    if (!isInWishlist) {
      addToWishlist({ id, name, price, image });
      setIsLiked(true);
      setTimeout(() => setIsLiked(false), 600);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden hover:-translate-y-4 cursor-pointer border border-sage-100 hover:border-tree-300 animate-fade-in-scale card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
      data-product-id={id}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-72 bg-gradient-to-br from-sage-50 via-tree-50 to-cream-100">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        
        {/* Magical overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-tree-600/20 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Badges with cute animations */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-gradient-to-r from-tree-500 to-tree-600 text-white font-semibold px-3 py-1 shadow-lg animate-wiggle">
              ✨ New
            </Badge>
          )}
          {isBestseller && (
            <Badge className="bg-gradient-to-r from-coral to-orange-500 text-white font-semibold px-3 py-1 shadow-lg animate-glow">
              🔥 Bestseller
            </Badge>
          )}
        </div>

        {/* Action Buttons with enhanced animations */}
        <div className={`absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className={`bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-125 transition-all duration-300 hover-glow ${
              isInWishlist || isLiked ? 'bg-red-50 animate-heartbeat' : ''
            }`}
            onClick={handleWishlist}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isInWishlist || isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-125 transition-all duration-300 hover-glow"
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
          >
            <Eye className="h-5 w-5 text-gray-600 hover:text-tree-600 transition-colors" />
          </Button>
        </div>

        {/* Sustainability Score with float animation */}
        <div className="absolute bottom-4 left-4 animate-float">
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl border border-white/50">
            <Leaf className="h-4 w-4 text-tree-500 animate-wiggle" />
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getSustainabilityColor(sustainabilityScore)} animate-pulse`}></div>
              <span className="text-sm font-semibold text-forest-700">
                {getSustainabilityText(sustainabilityScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Rating and Carbon Footprint */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 transition-all duration-300 hover:scale-125 ${
                    i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">({reviews})</span>
          </div>
          <div className="text-xs text-tree-600 font-semibold bg-tree-50 px-3 py-1 rounded-full border border-tree-200 hover:bg-tree-100 transition-colors">
            {carbonFootprint}
          </div>
        </div>

        {/* Product Name with shimmer effect */}
        <h3 className="font-outfit font-bold text-forest-700 line-clamp-2 leading-tight text-lg hover:text-tree-600 transition-colors shimmer">
          {name}
        </h3>

        {/* Category */}
        {category && (
          <div className="text-sm text-sage-600 font-medium">
            {category}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-sage-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Certifications with stagger animation - Fixed to handle undefined certifications */}
        <div className="flex flex-wrap gap-2">
          {certifications && certifications.length > 0 && certifications.slice(0, 2).map((cert, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`text-xs text-tree-600 border-tree-200 bg-tree-50 hover:bg-tree-100 transition-all duration-300 hover:scale-105 stagger-${index + 1}`}
            >
              {cert}
            </Badge>
          ))}
          {certifications && certifications.length > 2 && (
            <Badge variant="outline" className="text-xs text-tree-600 border-tree-200 bg-tree-50 stagger-3">
              +{certifications.length - 2} more
            </Badge>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-sage-100">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-outfit font-bold text-forest-700">
              ${price}
            </span>
            {originalPrice && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through">
                  ${originalPrice}
                </span>
                <span className="text-xs text-tree-600 font-semibold animate-pulse">
                  Save ${(originalPrice - price).toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <Button 
            size="sm"
            className={`bg-gradient-to-r from-tree-600 to-tree-700 hover:from-tree-700 hover:to-tree-800 text-white rounded-xl font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 btn-eco ${
              isAddingToCart ? 'animate-pulse scale-95' : ''
            }`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className={`h-4 w-4 mr-2 ${isAddingToCart ? 'animate-bounce' : ''}`} />
            {isAddingToCart ? (
              <span className="flex items-center">
                <div className="spinner mr-2"></div>
                Adding...
              </span>
            ) : (
              'Add to Cart'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
