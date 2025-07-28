
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
}

const ProductReviews = ({ productId, reviews }: ProductReviewsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Review Submitted! ⭐",
      description: "Thank you for your feedback!",
    });
    
    setNewReview({ rating: 0, comment: '' });
    setIsSubmitting(false);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-forest-700">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <div className="text-sm text-sage-600">Based on {reviews.length} reviews</div>
        </div>
        
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
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
            <label className="block text-sm font-medium text-forest-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(rating => (
                <Star
                  key={rating}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    rating <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-sage-300 hover:text-amber-300'
                  }`}
                  onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2">Review</label>
            <Textarea
              placeholder="Share your experience with this product..."
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleSubmitReview}
            disabled={isSubmitting}
            className="bg-forest-700 hover:bg-forest-800"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div 
            key={review.id} 
            className="bg-white rounded-xl p-6 shadow-eco animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-forest-700">{review.userName[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-forest-700">{review.userName}</span>
                    {review.verified && (
                      <span className="bg-forest-100 text-forest-700 text-xs px-2 py-1 rounded-full">✓ Verified</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-sage-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-sage-400 hover:text-sage-600">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-forest-600 mb-3">{review.comment}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <Button variant="ghost" size="sm" className="text-sage-500 hover:text-sage-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
