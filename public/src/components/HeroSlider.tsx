
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import heroSlide4 from '@/assets/hero-slide-4.jpg';
import heroSlide5 from '@/assets/hero-slide-5.jpg';

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
      image: heroSlide1,
      cta: "Shop Now",
      ctaLink: "/products",
      theme: 'dark'
    },
    {
      id: 2,
      title: "Nature's Finest Selection",
      subtitle: "Organic & Sustainable",
      description: "Handpicked eco-friendly products in harmony with nature. Experience the perfect blend of sustainability and quality.",
      image: heroSlide2,
      cta: "Explore",
      ctaLink: "/products",
      theme: 'dark'
    },
    {
      id: 3,
      title: "Clean Living Essentials",
      subtitle: "Modern Eco-Lifestyle",
      description: "Transform your home with sustainable products that bring nature indoors. Clean, modern, and environmentally conscious.",
      image: heroSlide3,
      cta: "Discover",
      ctaLink: "/products",
      theme: 'light'
    },
    {
      id: 4,
      title: "Garden Fresh Collection",
      subtitle: "Naturally Beautiful",
      description: "Embrace sustainable fashion and lifestyle products that grow with nature's rhythm. Fresh, vibrant, and eco-friendly.",
      image: heroSlide4,
      cta: "Shop Green",
      ctaLink: "/products",
      theme: 'dark'
    },
    {
      id: 5,
      title: "Ocean-Inspired Sustainability",
      subtitle: "Protecting Our Planet",
      description: "Eco-friendly products that honor our oceans and planet. Every purchase supports environmental protection initiatives.",
      image: heroSlide5,
      cta: "Make Impact",
      ctaLink: "/products",
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
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-sage-600/80 hover:bg-sage-700/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition-all duration-300 z-20 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-sage-600/80 hover:bg-sage-700/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition-all duration-300 z-20 hover:scale-110 active:scale-95"
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
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              index === currentSlide 
                ? 'bg-sage-500 border-sage-300 scale-125 shadow-lg' 
                : 'bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/70 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-sage-500 to-tree-500 transition-all duration-1000 ease-linear shadow-sm"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
