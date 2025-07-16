
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  theme: 'light' | 'dark';
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Sustainable Living Made Simple",
      subtitle: "Eco-Conscious Shopping",
      description: "Discover premium eco-friendly products that don't compromise on quality or style. Join 50,000+ conscious consumers making a difference.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      cta: "Shop Collection",
      ctaLink: "/products",
      theme: 'dark'
    },
    {
      id: 2,
      title: "Carbon Neutral Delivery",
      subtitle: "Free Shipping on Orders $75+",
      description: "Every order plants a tree and offsets carbon emissions. Experience guilt-free shopping with our carbon-neutral delivery service.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
      cta: "Learn More",
      ctaLink: "/how-it-works",
      theme: 'dark'
    },
    {
      id: 3,
      title: "Certified Organic Collection",
      subtitle: "Premium Quality Guaranteed",
      description: "Handpicked organic products with verified certifications. From fashion to home goods, experience the finest sustainable materials.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      cta: "Browse Organic",
      ctaLink: "/products?category=organic",
      theme: 'light'
    },
    {
      id: 4,
      title: "Plastic-Free Initiative",
      subtitle: "Zero Waste Packaging",
      description: "All our packaging is 100% compostable or recyclable. Join our mission to eliminate single-use plastics from e-commerce.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3",
      cta: "Our Mission",
      ctaLink: "/about",
      theme: 'dark'
    },
    {
      id: 5,
      title: "Summer Eco-Collection 2024",
      subtitle: "Limited Edition - 50% Off",
      description: "Sustainable summer essentials crafted from renewable materials. Limited time offer on our exclusive eco-conscious collection.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      cta: "Shop Sale",
      ctaLink: "/products?sale=true",
      theme: 'light'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative h-full">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${
                slide.theme === 'dark' 
                  ? 'bg-gradient-to-r from-black/60 via-black/40 to-transparent' 
                  : 'bg-gradient-to-r from-white/70 via-white/50 to-transparent'
              }`}></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <div className={`space-y-6 ${
                    index === currentSlide ? 'animate-fade-in' : ''
                  }`}>
                    {/* Badge */}
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      slide.theme === 'dark' 
                        ? 'bg-sage-500/20 text-sage-100 backdrop-blur-sm' 
                        : 'bg-forest-500/20 text-forest-700 backdrop-blur-sm'
                    }`}>
                      🌱 {slide.subtitle}
                    </div>

                    {/* Main Headline */}
                    <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold leading-tight ${
                      slide.theme === 'dark' ? 'text-white' : 'text-forest-700'
                    }`}>
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className={`text-lg sm:text-xl leading-relaxed max-w-xl ${
                      slide.theme === 'dark' ? 'text-cream-100/90' : 'text-forest-600'
                    }`}>
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        size="lg" 
                        className="bg-sage-500 hover:bg-sage-600 text-white font-semibold px-8 py-4 rounded-btn shadow-eco-lg hover-lift text-lg transition-all duration-300"
                        onClick={() => window.location.href = slide.ctaLink}
                      >
                        {slide.cta}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className={`font-semibold px-8 py-4 rounded-btn text-lg transition-all duration-300 ${
                          slide.theme === 'dark' 
                            ? 'border-2 border-white text-white hover:bg-white hover:text-forest-700' 
                            : 'border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white'
                        }`}
                        onClick={() => window.location.href = '/how-it-works'}
                      >
                        Learn More
                      </Button>
                    </div>

                    {/* Impact Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-8 max-w-lg">
                      <div className="text-center">
                        <div className={`text-2xl sm:text-3xl font-outfit font-bold ${
                          slide.theme === 'dark' ? 'text-white' : 'text-forest-700'
                        }`}>2.5M</div>
                        <div className={`text-sm ${
                          slide.theme === 'dark' ? 'text-cream-200' : 'text-sage-600'
                        }`}>CO₂ Saved (kg)</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl sm:text-3xl font-outfit font-bold ${
                          slide.theme === 'dark' ? 'text-white' : 'text-forest-700'
                        }`}>15K+</div>
                        <div className={`text-sm ${
                          slide.theme === 'dark' ? 'text-cream-200' : 'text-sage-600'
                        }`}>Eco Products</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl sm:text-3xl font-outfit font-bold ${
                          slide.theme === 'dark' ? 'text-white' : 'text-forest-700'
                        }`}>98%</div>
                        <div className={`text-sm ${
                          slide.theme === 'dark' ? 'text-cream-200' : 'text-sage-600'
                        }`}>Happy Customers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full shadow-eco transition-all duration-300 z-20 hover-scale"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full shadow-eco transition-all duration-300 z-20 hover-scale"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-sage-400 transition-all duration-1000 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
