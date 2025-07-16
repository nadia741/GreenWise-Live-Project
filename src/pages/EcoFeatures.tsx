
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EcoRecommendations from '@/components/EcoRecommendations';
import RealTimeImpactTracker from '@/components/RealTimeImpactTracker';
import CommunityEcoChallenges from '@/components/CommunityEcoChallenges';
import CarbonOffsetMarketplace from '@/components/CarbonOffsetMarketplace';
import SustainabilityCalculator from '@/components/SustainabilityCalculator';
import LocalEcoDirectory from '@/components/LocalEcoDirectory';
import SubscriptionEcoBoxes from '@/components/SubscriptionEcoBoxes';
import { Sparkles, Target, Calculator, MapPin, Package, Coins, Users, Activity, Brain, Leaf } from 'lucide-react';

const EcoFeatures = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Recommendations",
      description: "Get personalized sustainability suggestions based on your lifestyle and preferences."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Real-time Impact Tracking",
      description: "Monitor your environmental impact with live metrics and progress tracking."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Eco-Challenges",
      description: "Join thousands of users in gamified sustainability challenges and competitions."
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Carbon Offset Marketplace",
      description: "Buy and sell verified carbon credits to offset your environmental footprint."
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Sustainability Calculator",
      description: "Assess your lifestyle's environmental impact with our interactive scoring tool."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Eco-Business Directory",
      description: "Discover and support sustainable businesses in your local area."
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Subscription Eco-Boxes",
      description: "Receive curated sustainable products delivered monthly to your door."
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-forest-600 to-tree-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Sparkles className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-5xl font-outfit font-bold mb-6">
            Advanced Eco Features
          </h1>
          <p className="text-xl text-tree-100 max-w-3xl mx-auto mb-8">
            Discover cutting-edge tools and features designed to help you live more sustainably, 
            track your impact, and connect with like-minded eco-warriors around the world.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm text-tree-200">Eco Features</div>
            </div>
            <div className="w-px h-12 bg-tree-400"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-tree-200">Active Users</div>
            </div>
            <div className="w-px h-12 bg-tree-400"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-sm text-tree-200">CO₂ Tons Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
              Everything You Need for Sustainable Living
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Our comprehensive suite of eco-friendly tools helps you make informed decisions, 
              track progress, and connect with the global sustainability community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-sage-100">
                <div className="p-3 bg-tree-50 rounded-lg w-fit mb-4 text-tree-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-forest-700 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sage-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-16 bg-gradient-to-br from-sage-50 to-tree-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
              Try Our Features
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Experience the power of our eco-friendly tools with live, interactive demos
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <EcoRecommendations />
            <RealTimeImpactTracker />
          </div>
          
          <div className="mb-8">
            <CommunityEcoChallenges />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CarbonOffsetMarketplace />
            <SustainabilityCalculator />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LocalEcoDirectory />
            <SubscriptionEcoBoxes />
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              We're constantly innovating to bring you more powerful sustainability tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-tree-100 to-sage-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-forest-700 mb-2">AR Product Visualization</h3>
              <p className="text-sage-600">See how eco-products look in your space before buying</p>
            </div>
            <div className="bg-gradient-to-br from-forest-100 to-tree-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-forest-700 mb-2">Blockchain Verification</h3>
              <p className="text-sage-600">Verify sustainability claims with blockchain technology</p>
            </div>
            <div className="bg-gradient-to-br from-sage-100 to-forest-100 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-xl font-semibold text-forest-700 mb-2">Social Impact Sharing</h3>
              <p className="text-sage-600">Share your environmental achievements on social platforms</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EcoFeatures;
