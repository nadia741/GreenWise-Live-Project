
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ProductSources = () => {
  const sourceCountries = [
    {
      country: 'Costa Rica',
      flag: '🇨🇷',
      specialty: 'Organic Coffee & Sustainable Agriculture',
      description: 'Premium organic coffee beans and eco-friendly farming practices'
    },
    {
      country: 'Denmark',
      flag: '🇩🇰',
      specialty: 'Clean Energy & Sustainable Design',
      description: 'Innovative eco-friendly products and renewable energy solutions'
    },
    {
      country: 'India',
      flag: '🇮🇳',
      specialty: 'Natural Textiles & Handcrafted Goods',
      description: 'Organic cotton, bamboo textiles, and traditional craftsmanship'
    },
    {
      country: 'New Zealand',
      flag: '🇳🇿',
      specialty: 'Pure Beauty & Natural Wellness',
      description: 'Organic skincare, natural beauty products, and wellness essentials'
    }
  ];

  const sourcingPromises = [
    'Fair trade partnerships with local communities',
    'Carbon-neutral shipping and packaging',
    'Regular quality and sustainability audits'
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-sage-50 to-tree-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
            Sourced Globally, Sourced Responsibly
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            We partner with trusted suppliers across four key regions to bring you 
            the finest sustainable products from around the world
          </p>
        </div>

        {/* Source Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sourceCountries.map((source, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-sage-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{source.flag}</div>
                <h3 className="font-outfit font-bold text-forest-700 text-lg mb-2">
                  {source.country}
                </h3>
                <h4 className="font-semibold text-tree-600 text-sm mb-3">
                  {source.specialty}
                </h4>
                <p className="text-sage-600 text-sm leading-relaxed">
                  {source.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sourcing Promise */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-sage-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-outfit font-bold text-forest-700 mb-4">
              Our Sourcing Promise
            </h3>
            <p className="text-sage-600 max-w-2xl mx-auto">
              Every product we source meets our strict sustainability and ethical standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sourcingPromises.map((promise, index) => (
              <div key={index} className="flex items-center justify-center text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-tree-50 rounded-full mb-3">
                    <CheckCircle className="h-6 w-6 text-tree-600" />
                  </div>
                  <p className="text-forest-700 font-medium text-sm">
                    {promise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSources;
