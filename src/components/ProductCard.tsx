import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/auth/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, Heart, Leaf, ShoppingCart, Star } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  certifications: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  category?: string;
  description?: string;
  sustainabilityScore?: number;
  averageRating?: number;
  numReviews?: number;
  sustainabilityFeatures?: string[];
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  certifications = [],
  isNew = false,
  isBestseller = false,
  description = "",
  category = "",
  sustainabilityScore = 0,
  averageRating = 0,
  numReviews = 0,
  sustainabilityFeatures = [],
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const { toast } = useToast();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isInWishlistCheck = isInWishlist(id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: "🔒 Sign Up Required",
        description: "Please sign up or sign in to add items to your cart.",
        duration: 3000,
      });
      navigate("/signup");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Create magical flying animation
      const cartButton = e.currentTarget as HTMLElement;
      const rect = cartButton.getBoundingClientRect();

      // Create flying product element with sparkles
      const flyingElement = document.createElement("div");
      flyingElement.className = "fixed z-[9999] pointer-events-none";
      flyingElement.style.left = `${rect.left + rect.width / 2}px`;
      flyingElement.style.top = `${rect.top + rect.height / 2}px`;
      flyingElement.style.transform = "translate(-50%, -50%)";
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
        flyingElement.style.transition =
          "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        flyingElement.style.transform =
          "translate(400px, -250px) scale(0.1) rotate(720deg)";
        flyingElement.style.opacity = "0";
      }, 100);

      // Remove element after animation
      setTimeout(() => {
        if (document.body.contains(flyingElement)) {
          document.body.removeChild(flyingElement);
        }
      }, 1300);

      // Add to cart
      addToCart({ id, name, price, image, quantity: 1 });

      toast({
        title: "🛒 Added to Cart!",
        description: `${name} has been added to your cart.`,
        duration: 3000,
      });

      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: "🔒 Sign Up Required",
        description: "Please sign up or sign in to add items to your wishlist.",
        duration: 3000,
      });
      navigate("/signup");
      return;
    }

    setIsAddingToWishlist(true);

    try {
      if (isInWishlistCheck) {
        await removeFromWishlist(id);
        toast({
          title: "💔 Removed from Wishlist",
          description: "Item removed from your wishlist.",
          duration: 2000,
        });
      } else {
        await addToWishlist({
          _id: id,
          name,
          price,
          image,
          description,
          category,
          sustainabilityScore: sustainabilityScore || 0,
          inventory: 100, // Default inventory
          averageRating: averageRating || 0,
          numReviews: numReviews || 0,
          sustainabilityFeatures: sustainabilityFeatures || [],
        });
        setIsLiked(true);
        setTimeout(() => setIsLiked(false), 600);
        toast({
          title: "❤️ Added to Wishlist!",
          description: `${name} has been saved for later.`,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="group bg-white rounded-3xl shadow-eco hover:shadow-eco-lg transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up border border-sage-100/50 hover:border-tree-200"
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
          loading="lazy"
        />

        {/* Magical overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-tree-600/20 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

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
        <div
          className={`absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ${
            isHovered
              ? "opacity-100 transform translate-x-0"
              : "opacity-0 transform translate-x-8"
          }`}
        >
          <Button
            size="sm"
            variant="secondary"
            className={`bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-125 transition-all duration-300 hover-glow ${
              isInWishlistCheck || isLiked ? "bg-red-50 animate-heartbeat" : ""
            }`}
            onClick={handleWishlist}
            disabled={isAddingToWishlist}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                isInWishlistCheck || isLiked
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-600 hover:text-red-500"
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
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        {/* Product Title & Category */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-tree-500" />
            <span className="text-sm text-sage-600 capitalize">{category}</span>
          </div>
          <h3 className="font-outfit font-bold text-xl text-forest-700 mb-2 line-clamp-2 group-hover:text-tree-600 transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sage-600 text-sm line-clamp-2 mb-3">
              {description}
            </p>
          )}
        </div>

        {/* Rating & Reviews */}
        {averageRating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-sage-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-sage-600">
              {averageRating.toFixed(1)} ({numReviews} reviews)
            </span>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {certifications.slice(0, 2).map((cert, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-tree-100 text-tree-700 text-xs px-2 py-1 font-medium hover:bg-tree-200 transition-colors"
              >
                {cert}
              </Badge>
            ))}
            {certifications.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{certifications.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Price & Cart Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-forest-700">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-sage-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            className={`bg-gradient-to-r from-tree-500 to-tree-600 hover:from-tree-600 hover:to-tree-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-glow ${
              isAddingToCart ? "animate-pulse" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
