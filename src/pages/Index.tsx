import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ImpactSection from "@/components/ImpactSection";
import ProductSources from "@/components/ProductSources";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useCart } from "@/hooks/useCart";

const Index = () => {
  const { cartItems, getCartTotal } = useCart();

  // Calculate shopping-based stats
  const totalOrders =
    cartItems.length > 0 ? Math.max(1, Math.floor(cartItems.length / 3)) : 0;
  const totalSpent = getCartTotal();
  const co2Saved = (totalSpent * 0.035).toFixed(1); // 35g CO2 per dollar spent
  const treesPlanted = Math.floor(totalSpent / 15); // 1 tree per $15 spent

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <HeroSlider />

      <FeaturedProducts />

      {/* Product Sources Section */}
      <ProductSources />

      {/* Customer Reviews Section */}
      <CustomerReviewsSection />

      <ImpactSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
