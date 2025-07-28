
import React from 'react';
import { Leaf, Globe, Users, Recycle } from 'lucide-react';

const ImpactSection = () => {
  const impactStats = [
    {
      icon: Leaf,
      number: '2.5M kg',
      label: 'CO₂ Reduced',
      description: 'Carbon emissions prevented through sustainable products',
      color: 'from-tree-500 to-forest-500'
    },
    {
      icon: Globe,
      number: '150K+',
      label: 'Trees Saved',
      description: 'Through plastic-free and recycled materials',
      color: 'from-sage-500 to-tree-500'
    },
    {
      icon: Users,
      number: '50K+',
      label: 'Eco Warriors',
      description: 'Community members making sustainable choices',
      color: 'from-forest-500 to-sage-600'
    },
    {
      icon: Recycle,
      number: '1M+',
      label: 'Items Recycled',
      description: 'Products made from recycled materials',
      color: 'from-tree-600 to-forest-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-tree-50/30 to-sage-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Globe className="h-4 w-4" />
            Our Environmental Impact
          </div>
          <h2 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            Making a Real
            <span className="block text-tree-600">Difference Together</span>
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Every purchase you make contributes to a healthier planet. Here's the collective impact we've achieved together.
          </p>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="relative group animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-tree-100">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-outfit font-bold text-forest-700 mb-2">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-tree-600 mb-3">
                  {stat.label}
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-forest-600 to-tree-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-outfit font-bold mb-6">Our Mission</h3>
          <p className="text-xl text-tree-100 max-w-4xl mx-auto leading-relaxed mb-8">
            We're committed to making sustainable living accessible and rewarding for everyone. 
            By partnering with ethical brands and conscious consumers, we're building a marketplace 
            that prioritizes people and planet over profit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">🌱</div>
              <div className="font-semibold mb-1">Sustainable First</div>
              <div className="text-tree-100 text-sm">Every product meets our strict eco standards</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">🤝</div>
              <div className="font-semibold mb-1">Fair Trade</div>
              <div className="text-tree-100 text-sm">Supporting ethical labor practices worldwide</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">🔄</div>
              <div className="font-semibold mb-1">Circular Economy</div>
              <div className="text-tree-100 text-sm">Promoting reuse, recycling, and regeneration</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
