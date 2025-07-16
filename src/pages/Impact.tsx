
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Globe, Leaf, Droplets, Zap } from 'lucide-react';

const Impact = () => {
  const impactMetrics = [
    {
      icon: <Leaf className="h-12 w-12 text-tree-600" />,
      value: "2,866",
      label: "Tons CO₂ Saved",
      update: "+3 this update",
      color: "border-tree-300"
    },
    {
      icon: <div className="text-4xl">🌲</div>,
      value: "15,272",
      label: "Trees Planted",
      update: "+5 this update",
      color: "border-forest-300"
    },
    {
      icon: <Droplets className="h-12 w-12 text-blue-600" />,
      value: "150M",
      label: "Liters Water Saved",
      update: "+6K this update",
      color: "border-blue-300"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      value: "100%",
      label: "Renewable Energy",
      update: "Next target: 110%",
      color: "border-yellow-300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <Globe className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            Our Environmental Impact
          </h1>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto mb-8">
            See the positive change we're making together for our planet.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-tree-600 rounded-full animate-pulse"></div>
            <span className="font-semibold">Live Data</span>
            <span className="text-sm">Pause Updates</span>
          </div>
        </div>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactMetrics.map((metric, index) => (
            <div 
              key={index}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border-l-4 ${metric.color} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-scale`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-6">
                {metric.icon}
              </div>
              <div className="text-4xl font-outfit font-bold text-forest-700 mb-2">
                {metric.value}
              </div>
              <div className="text-sage-600 font-medium mb-4">
                {metric.label}
              </div>
              <div className="text-sm text-sage-500">
                {metric.update}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-tree-600 to-forest-600 rounded-3xl p-12 text-white text-center shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl font-outfit font-bold mb-6">
              Every Purchase Makes a Difference
            </h2>
            <p className="text-tree-100 text-lg mb-8 max-w-2xl mx-auto">
              When you shop with us, you're not just buying products – you're investing 
              in a sustainable future for our planet.
            </p>
            <Button 
              className="bg-white text-tree-600 hover:bg-cream-50 font-semibold px-8 py-4 rounded-xl shadow-lg text-lg"
              onClick={() => window.location.href = '/products'}
            >
              <div className="flex items-center">
                <div className="mr-2">🛍️</div>
                Start Shopping
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Impact;
