import { api, Review } from "@/services/api";
import { AlertCircle, Quote, RefreshCw, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const CustomerReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await api.reviews.getRecentReviews(6);
      setReviews(data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setError(
        "Unable to load reviews. Please check your connection and try again."
      );
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentReviews();
  }, []);

  const retryFetch = () => {
    fetchRecentReviews();
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-forest-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-forest-700 mb-4">
              Unable to Load Reviews
            </h3>
            <p className="text-sage-600 mb-6 max-w-md mx-auto">{error}</p>
            <Button
              onClick={retryFetch}
              className="bg-forest-600 hover:bg-forest-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show the section if there are no reviews
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Quote className="h-4 w-4" />
            Customer Reviews
          </div>
          <h2 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            What Our Customers
            <span className="block text-tree-600">Are Saying</span>
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Real feedback from real customers who chose sustainable living with
            GreenWise
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review._id}
              className="bg-gradient-to-br from-sage-50 to-tree-50 rounded-2xl p-8 shadow-eco hover:shadow-eco-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="h-10 w-10 text-tree-500 opacity-60" />
              </div>

              {/* Review Content */}
              <div className="mb-6">
                <p className="text-forest-600 leading-relaxed text-lg italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-sage-300"
                    }`}
                  />
                ))}
                <span className="text-sage-600 font-medium ml-2">
                  {review.rating}/5
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-forest-700 text-lg">
                    {review.user.name[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-forest-700">
                    {review.user.name}
                  </div>
                  <div className="text-sage-600 text-sm">
                    Reviewed {review.product.name}
                  </div>
                </div>
              </div>

              {/* Product Tag */}
              <div className="mt-4 pt-4 border-t border-sage-200">
                <div className="flex items-center gap-3">
                  {review.product.image && (
                    <img
                      src={review.product.image}
                      alt={review.product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="text-sm">
                    <div className="font-medium text-forest-700">
                      {review.product.name}
                    </div>
                    <div className="text-sage-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-gradient-to-br from-forest-50 to-tree-50 rounded-3xl p-12 shadow-eco max-w-4xl mx-auto border border-sage-100">
            <h3 className="text-3xl font-outfit font-bold text-forest-700 mb-4">
              Join Thousands of Happy Customers
            </h3>
            <p className="text-xl text-sage-600 mb-8 max-w-2xl mx-auto">
              Experience the quality and sustainability that our customers love.
              Start your eco-friendly journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center bg-forest-600 hover:bg-forest-700 text-white font-bold py-4 px-8 rounded-xl shadow-eco hover:shadow-eco-lg transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center border-2 border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 font-bold py-4 px-8 rounded-xl transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
