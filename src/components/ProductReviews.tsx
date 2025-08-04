import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { api, Review } from "@/services/api";
import { Flag, Star, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await api.reviews.getProductReviews(productId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to leave a review.",
      });
      return;
    }

    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newReviewData = await api.reviews.createReview(
        productId,
        newReview.rating,
        newReview.comment,
        user.token
      );

      setReviews((prev) => [newReviewData, ...prev]);

      toast({
        title: "Review Submitted! ⭐",
        description: "Thank you for your feedback!",
      });

      setNewReview({ rating: 0, comment: "" });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-forest-600 mx-auto mb-4"></div>
          <p className="text-forest-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-forest-600 hover:bg-forest-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-forest-700">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-sage-600">
            Based on {reviews.length} reviews
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length;
            const percentage =
              reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={rating} className="flex items-center gap-3 text-sm">
                <span className="w-8">{rating}★</span>
                <div className="flex-1 bg-sage-100 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sage-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a Review */}
      <div className="bg-sage-50 rounded-xl p-6 border border-sage-200">
        <h4 className="font-semibold text-forest-700 mb-4">Write a Review</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    rating <= newReview.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-sage-300 hover:text-amber-300"
                  }`}
                  onClick={() => setNewReview((prev) => ({ ...prev, rating }))}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2">
              Review
            </label>
            <Textarea
              placeholder="Share your experience with this product..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleSubmitReview}
            disabled={isSubmitting}
            className="bg-forest-700 hover:bg-forest-800"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sage-600">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div
              key={review._id}
              className="bg-white rounded-xl p-6 shadow-eco animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-forest-700">
                      {review.user.name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-forest-700">
                        {review.user.name}
                      </span>
                      <span className="bg-forest-100 text-forest-700 text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-sage-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sage-400 hover:text-sage-600"
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-forest-600 mb-3">{review.comment}</p>

              <div className="flex items-center gap-4 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sage-500 hover:text-sage-700"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
