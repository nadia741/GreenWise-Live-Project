
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  verified: boolean;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Portland, OR",
      rating: 5,
      text: "Amazing sustainable products! The quality is outstanding and I love knowing my purchases help the environment.",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23A3C3A7'/><circle cx='35' cy='40' r='3' fill='%23000'/><circle cx='65' cy='40' r='3' fill='%23000'/><path d='M35,70 Q50,80 65,70' stroke='%23000' stroke-width='2' fill='none'/></svg>",
      verified: true
    },
    {
      id: 2,
      name: "Mike Chen",
      location: "San Francisco, CA",
      rating: 5,
      text: "Fast shipping, excellent customer service, and products that align with my values. Highly recommended!",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%238B7355'/><circle cx='35' cy='40' r='3' fill='%23000'/><circle cx='65' cy='40' r='3' fill='%23000'/><path d='M35,70 Q50,80 65,70' stroke='%23000' stroke-width='2' fill='none'/></svg>",
      verified: true
    },
    {
      id: 3,
      name: "Emily Davis",
      location: "Austin, TX",
      rating: 5,
      text: "The bamboo products I ordered exceeded my expectations. Great quality and eco-friendly packaging!",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%237C9082'/><circle cx='35' cy='40' r='3' fill='%23000'/><circle cx='65' cy='40' r='3' fill='%23000'/><path d='M35,70 Q50,80 65,70' stroke='%23000' stroke-width='2' fill='none'/></svg>",
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-forest-700 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made the switch to sustainable living
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-cream-50 rounded-eco p-6 shadow-eco hover:shadow-eco-lg transition-all duration-300">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                    }`} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-forest-600 mb-6 italic">"{testimonial.text}"</p>

              {/* Customer Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold text-forest-700">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <span className="ml-2 text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-sage-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-forest-700">50,000+</div>
            <div className="text-sm text-sage-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-forest-700">4.9/5</div>
            <div className="text-sm text-sage-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-forest-700">99%</div>
            <div className="text-sm text-sage-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-forest-700">24/7</div>
            <div className="text-sm text-sage-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
