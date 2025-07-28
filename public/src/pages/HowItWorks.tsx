
import React from 'react';
import { ShoppingCart, Leaf, Star, Truck, Heart, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Browse & Discover",
      description: "Explore our curated collection of sustainable products with detailed eco-impact information.",
      details: ["Search by category, brand, or sustainability features", "View detailed product certifications", "Compare environmental impact scores"]
    },
    {
      icon: Leaf,
      title: "Verify Sustainability",
      description: "Every product is verified for environmental standards and ethical production practices.",
      details: ["Third-party sustainability certifications", "Supply chain transparency", "Carbon footprint calculations"]
    },
    {
      icon: Star,
      title: "Read Reviews",
      description: "Check authentic reviews from verified customers who share your values.",
      details: ["Verified purchase badges", "Photo and video reviews", "Sustainability impact ratings"]
    },
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      description: "Simple checkout process with multiple payment options and eco-impact summary.",
      details: ["Secure payment processing", "Multiple payment methods", "Real-time impact calculation"]
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Eco-friendly packaging and carbon-neutral shipping to your door.",
      details: ["Plastic-free packaging", "Carbon-neutral shipping", "Order tracking available"]
    },
    {
      icon: Heart,
      title: "Make an Impact",
      description: "Track your positive environmental impact and join our community of conscious consumers.",
      details: ["Personal impact dashboard", "Community challenges", "Environmental progress tracking"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee on all products"
    },
    {
      icon: Leaf,
      title: "Verified Sustainable",
      description: "All products meet our strict sustainability standards"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free carbon-neutral shipping on orders over $75"
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-sage-500 to-forest-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Shopping sustainably has never been easier. Here's how GreenWise makes it simple to make eco-conscious choices.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-outfit font-bold text-forest-700 text-center mb-12">
              Your Journey to Sustainable Shopping
            </h2>
            
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-sage-500 rounded-full p-3">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="bg-sage-100 text-sage-700 rounded-full px-4 py-2 text-sm font-semibold">
                        Step {index + 1}
                      </div>
                    </div>
                    <h3 className="text-2xl font-outfit font-bold text-forest-700">{step.title}</h3>
                    <p className="text-lg text-sage-600">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sage-600">
                          <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Visual */}
                  <div className="flex-1">
                    <div className="bg-sage-100 rounded-eco p-8 text-center">
                      <step.icon className="h-24 w-24 text-sage-500 mx-auto mb-4" />
                      <p className="text-sage-600">Step {index + 1} Illustration</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-outfit font-bold text-forest-700 text-center mb-12">
              Why Choose GreenWise?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-eco p-6 text-center shadow-eco">
                  <feature.icon className="h-12 w-12 text-sage-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-forest-700 mb-2">{feature.title}</h3>
                  <p className="text-sage-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-outfit font-bold text-forest-700 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-cream-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-2">How do you verify product sustainability?</h3>
                <p className="text-sage-600">We work with third-party certification bodies and conduct our own supply chain audits to ensure every product meets our strict environmental and ethical standards.</p>
              </div>
              <div className="bg-cream-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-2">What payment methods do you accept?</h3>
                <p className="text-sage-600">We accept all major credit cards, PayPal, Apple Pay, Google Pay, and various digital payment methods for your convenience.</p>
              </div>
              <div className="bg-cream-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-2">What is your return policy?</h3>
                <p className="text-sage-600">We offer a 30-day money-back guarantee on all products. If you're not satisfied, simply return the item in its original condition for a full refund.</p>
              </div>
              <div className="bg-cream-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-2">How do you calculate carbon footprint?</h3>
                <p className="text-sage-600">We use lifecycle assessment methodology to calculate the carbon footprint of each product, from raw material extraction through production, shipping, and end-of-life disposal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Support Section */}
        <section className="py-16 bg-forest-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-outfit font-bold mb-6">Need Help?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our customer support team is here to help you make the best sustainable choices.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-cream-200">Available 24/7 for instant support</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-cream-200">help@greenwise.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-cream-200">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
