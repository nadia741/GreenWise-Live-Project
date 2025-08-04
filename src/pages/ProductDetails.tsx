import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrderSuccessMessage from "@/components/OrderSuccessMessage";
import ProductRecommendations from "@/components/ProductRecommendations";
import ProductReviews from "@/components/ProductReviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useCart } from "@/hooks/useCart";
import { useRewards } from "@/contexts/RewardsContext";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Minus,
  Plus,
  Recycle,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sustainabilityScore: number;
  inventory: number;
  averageRating: number;
  numReviews: number;
  sustainabilityFeatures: string[];
  createdAt: string;
  updatedAt: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useCart();
  const { user } = useAuth();
  const { earnPoints } = useRewards();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the product is in the wishlist
  const isInWishlist = wishlistItems.some((item) => item._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Product not found");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Generate multiple image views for the product (using the same image with different parameters)
  const productImages = product
    ? [
        product.image,
        `${product.image}&brightness=1.1`,
        `${product.image}&contrast=1.1`,
      ]
    : [];

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your cart.",
        duration: 4000,
      });
      navigate("/login");
      return;
    }

    if (!product) return;

    setIsAddingToCart(true);

    // Add to cart with animation
    const button = document.querySelector(".add-to-cart-main");
    if (button) {
      button.classList.add("cart-fly-animation");
    }

    // Add to cart
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    // Notify about successful cart addition
    earnPoints(product.price * quantity);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsAddingToCart(false);

    toast({
      title: "Added to Cart! 🛒✨",
      description: `${quantity} x ${product.name} added successfully.`,
      duration: 4000,
    });

    // Remove animation class
    setTimeout(() => {
      if (button) {
        button.classList.remove("cart-fly-animation");
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
      navigate("/login");
      return;
    }

    // Mock successful order
    setShowOrderSuccess(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-forest-600 mx-auto mb-4"></div>
            <p className="text-forest-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error || "Product not found"}</p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-forest-600 hover:bg-forest-700"
            >
              Browse Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover-lift ${
                    selectedImage === index
                      ? "ring-2 ring-forest-500 shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.averageRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-forest-600 font-medium">
                    ({product.numReviews} reviews)
                  </span>
                </div>
                {product.inventory > 0 && (
                  <Badge className="bg-forest-100 text-forest-700">
                    ✅ In Stock ({product.inventory} left)
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-4xl font-bold text-forest-700">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Sustainability Metrics */}
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
              <h3 className="font-semibold text-forest-700 mb-4 flex items-center text-lg">
                <Recycle className="h-6 w-6 mr-3 text-forest-600" />
                Environmental Impact
              </h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="font-bold text-forest-700 text-xl">
                    {product.sustainabilityScore}/10
                  </div>
                  <div className="text-sage-600 text-sm">Eco Score</div>
                </div>
                <div>
                  <div className="font-bold text-forest-700 text-xl">
                    {product.sustainabilityFeatures.length}
                  </div>
                  <div className="text-sage-600 text-sm">Eco Features</div>
                </div>
              </div>
            </div>

            {/* Sustainability Features */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-3 text-lg">
                Sustainability Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sustainabilityFeatures.map((feature, index) => (
                  <Badge key={index} className="bg-tree-100 text-tree-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
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
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setQuantity(Math.min(quantity + 1, product.inventory))
                  }
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
                    isAddingToCart ? "animate-pulse" : "hover:shadow-lg"
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.inventory === 0}
                >
                  <ShoppingCart
                    className={`h-5 w-5 mr-2 ${
                      isAddingToCart ? "animate-bounce" : ""
                    }`}
                  />
                  {isAddingToCart
                    ? "Adding to Cart..."
                    : product.inventory === 0
                    ? "Out of Stock"
                    : `Add ${quantity} to Cart`}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-sage-300 hover:bg-sage-50 w-12 h-12 transition-all duration-300 ${
                    isLiked ? "bg-coral-50 border-coral-300" : ""
                  }`}
                  onClick={() => {
                    if (!user) {
                      toast({
                        title: "Sign In Required",
                        description: "Please sign in to manage your wishlist",
                        duration: 3000,
                      });
                      navigate("/login");
                      return;
                    }

                    if (isInWishlist) {
                      removeFromWishlist(id!);
                      setIsLiked(false);
                    } else {
                      addToWishlist({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                        category: product.category,
                        sustainabilityScore: product.sustainabilityScore,
                        inventory: product.inventory,
                        averageRating: product.averageRating,
                        numReviews: product.numReviews,
                        sustainabilityFeatures: product.sustainabilityFeatures,
                      });
                      setIsLiked(true);
                    }
                  }}
                >
                  <Heart
                    className={`h-8 w-8 transition-all duration-300 ${
                      isInWishlist || isLiked
                        ? "fill-coral text-coral heart-bounce"
                        : "text-sage-600"
                    }`}
                  />
                </Button>
              </div>

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

            {/* Description */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-3 text-lg">
                Description
              </h3>
              <p className="text-forest-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16" id="reviews">
          <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-8">
            Customer Reviews
          </h2>
          <ProductReviews productId={product._id} />
        </div>

        {/* Recommendations */}
        <div className="mb-16">
          <ProductRecommendations
            currentProductId={product._id}
            userId={user?._id}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
