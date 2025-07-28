
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center parallax-bg overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/20 via-transparent to-sage-500/30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-forest-500 text-sm font-medium sustainability-badge">
            🌱 Join 50,000+ eco-conscious shoppers
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-outfit font-bold text-white leading-tight">
            Shop Smarter.
            <br />
            <span className="bg-gradient-to-r from-sage-300 to-cream-400 bg-clip-text text-transparent">
              Shop Sustainable.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-cream-100/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands making eco-conscious choices daily. Discover verified sustainable products 
            that don't compromise on quality or style.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-sage-500 hover:bg-sage-600 text-white font-semibold px-8 py-4 rounded-btn shadow-eco-lg hover-lift text-lg"
            >
              Explore Products
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-forest-500 font-semibold px-8 py-4 rounded-btn text-lg"
            >
              How It Works
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-outfit font-bold text-white">2.5M</div>
              <div className="text-sm text-cream-200">CO2 Saved (kg)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-outfit font-bold text-white">15K</div>
              <div className="text-sm text-cream-200">Eco Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-outfit font-bold text-white">98%</div>
              <div className="text-sm text-cream-200">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-eco">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-cream-200 text-sm">Scroll to explore</span>
          <ArrowDown className="h-6 w-6 text-cream-200" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-sage-400/20 rounded-full blur-xl animate-pulse-eco"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-coral/20 rounded-full blur-xl animate-pulse-eco" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-sky/20 rounded-full blur-xl animate-pulse-eco" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
