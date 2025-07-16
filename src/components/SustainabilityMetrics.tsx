
import React from 'react';
import { Leaf, Droplets, TreePine, Package } from 'lucide-react';

interface SustainabilityMetricsProps {
  orders?: number;
  spent?: number;
  co2Saved?: string;
  treesPlanted?: number;
}

const SustainabilityMetrics = ({ 
  orders = 0, 
  spent = 0, 
  co2Saved = "0.0", 
  treesPlanted = 0 
}: SustainabilityMetricsProps) => {
  const metrics = [
    {
      icon: <Package className="h-8 w-8 text-tree-600" />,
      value: orders.toString(),
      label: "Total Orders",
      color: "border-tree-300"
    },
    {
      icon: <div className="text-3xl">💰</div>,
      value: `$${spent.toFixed(2)}`,
      label: "Total Spent",
      color: "border-yellow-300"
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      value: `${co2Saved}kg`,
      label: "CO₂ Saved",
      color: "border-blue-300"
    },
    {
      icon: <TreePine className="h-8 w-8 text-forest-600" />,
      value: treesPlanted.toString(),
      label: "Trees Planted",
      color: "border-forest-300"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-tree-50/20 to-sage-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-6">
            Your Sustainability Impact
          </h2>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto">
            Track your positive environmental impact through sustainable shopping
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
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
              <div className="text-sage-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityMetrics;
