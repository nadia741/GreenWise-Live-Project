
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User, Clock, BookOpen } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const posts = [
    {
      id: "1",
      title: "10 Ways to Reduce Your Carbon Footprint",
      excerpt: "Simple daily changes that can make a big difference for the environment and your wallet.",
      author: "Green Team",
      date: "Dec 15, 2024",
      category: "Sustainability Tips",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop&auto=format",
      readTime: "5 min read",
      content: `Living sustainably doesn't require drastic lifestyle changes. Small, consistent actions can significantly reduce your environmental impact while often saving money in the process. Here are ten practical ways to start your eco-friendly journey today.

Transportation is one of the biggest contributors to personal carbon footprints. Consider walking, cycling, or using public transport for short trips. When driving is necessary, plan multiple errands in one trip to maximize efficiency. Carpooling and working from home when possible can further reduce transportation emissions.

Energy consumption at home offers numerous opportunities for improvement. Switch to LED light bulbs, which use 75% less energy than traditional incandescent bulbs. Unplug electronics when not in use, as many devices draw power even when turned off. Adjust your thermostat by just 2-3 degrees to save significant energy without sacrificing comfort.

Water conservation is equally important. Take shorter showers, fix leaky faucets promptly, and consider installing low-flow fixtures. Running full loads in dishwashers and washing machines maximizes efficiency per cycle.

Food choices have a substantial environmental impact. Reduce meat consumption, especially beef, which has a high carbon footprint. Buy local, seasonal produce when possible, and minimize food waste by meal planning and proper storage. Composting food scraps creates nutrient-rich soil while keeping organic waste out of landfills.

Making these changes gradually ensures they become lasting habits rather than temporary efforts. Start with one or two changes that feel manageable, then build momentum as these behaviors become routine. Every small action contributes to a larger positive impact on our planet.`
    },
    {
      id: "2",
      title: "The Future of Sustainable Packaging",
      excerpt: "How innovative packaging solutions are revolutionizing e-commerce and reducing waste.",
      author: "Eco Expert",
      date: "Dec 12, 2024",
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop&auto=format",
      readTime: "8 min read",
      content: `The packaging industry is undergoing a revolutionary transformation as companies respond to growing environmental concerns and consumer demand for sustainable solutions. Traditional plastic packaging, which can take hundreds of years to decompose, is being replaced by innovative materials that protect products while minimizing environmental impact.

Biodegradable materials are at the forefront of this revolution. Mushroom-based packaging, made from mycelium, offers excellent protection while decomposing naturally within weeks. Seaweed-based wrapping provides a waterproof barrier that dissolves harmlessly in water. These materials perform as well as traditional plastics while leaving no lasting environmental footprint.

Plant-based plastics derived from corn starch, sugarcane, and other renewable resources are becoming increasingly sophisticated. These bioplastics can be engineered to have specific properties like strength, flexibility, or barrier protection, making them suitable for various applications from food packaging to shipping materials.

Reusable packaging systems are gaining traction in e-commerce. Companies are developing returnable containers that customers can send back for cleaning and reuse. This circular approach eliminates single-use packaging entirely, though it requires sophisticated logistics to track and process returned items.

Smart packaging technology is enhancing sustainability efforts. QR codes and embedded sensors can track products throughout their lifecycle, optimizing packaging sizes, reducing waste, and providing consumers with disposal instructions. Some packages even indicate optimal storage conditions to extend product life.

The economic benefits of sustainable packaging are becoming clear. While initial costs may be higher, companies often see reduced material usage, lower shipping costs due to lighter weights, and improved brand perception. Consumer loyalty increasingly favors environmentally responsible brands, making sustainable packaging a competitive advantage rather than just an environmental imperative.`
    },
    {
      id: "3",
      title: "Building a Zero-Waste Kitchen",
      excerpt: "Essential products and tips for creating an eco-friendly kitchen that minimizes waste.",
      author: "Sustainable Living",
      date: "Dec 10, 2024",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop&auto=format",
      readTime: "6 min read",
      content: `Creating a zero-waste kitchen is an achievable goal that can significantly reduce your household's environmental impact while often saving money on groceries and supplies. The key is replacing single-use items with durable, reusable alternatives and developing habits that minimize food waste.

Start by auditing your current kitchen waste. Track what you throw away for a week to identify the biggest problem areas. Common culprits include food packaging, expired produce, single-use utensils, and disposable cleaning supplies. Understanding your waste patterns helps prioritize which changes will have the greatest impact.

Food storage is crucial for a zero-waste kitchen. Replace plastic bags and containers with glass jars, beeswax wraps, and silicone food covers. These alternatives keep food fresh longer and can be used indefinitely. Invest in a variety of sizes to accommodate different foods, from bulk grains to leftover soup.

Meal planning dramatically reduces food waste. Plan weekly menus before shopping, use a detailed grocery list, and buy only what you need. Choose versatile ingredients that can be used in multiple recipes throughout the week. When possible, buy in bulk to reduce packaging waste, bringing your own containers to stores that allow it.

Composting transforms food scraps into valuable soil amendment. Even apartment dwellers can compost using small countertop systems or worm bins. Fruit and vegetable peels, coffee grounds, and eggshells all make excellent compost material. This diverts organic waste from landfills while creating nutrient-rich soil for plants.

Cleaning supplies can be simplified and made more sustainable. Basic ingredients like vinegar, baking soda, and castile soap can handle most cleaning tasks effectively. Make your own all-purpose cleaners and dish soap to eliminate plastic bottles and harsh chemicals. Reusable cleaning cloths replace paper towels for most tasks.

The transition to zero-waste doesn't happen overnight. Start with one area, master those changes, then gradually expand to other aspects of your kitchen routine.`
    }
  ];

  const categories = ["Sustainability Tips", "Innovation", "Lifestyle"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        {/* Blog Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            Sustainability Blog
          </h1>
          <p className="text-xl text-sage-600 max-w-2xl mx-auto">
            Tips, guides, and insights for living a more sustainable life
          </p>
        </div>

        {/* Featured Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-sage-200 animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 bg-tree-100 text-tree-700 text-sm rounded-full font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center text-sage-500 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h2 className="text-xl font-outfit font-bold text-forest-700 mb-3 line-clamp-2 group-hover:text-tree-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-sage-600 mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-tree-600 hover:text-tree-700 font-semibold transition-colors group"
                >
                  Read Article
                  <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Educational Resources Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-tree-600" />
              <div className="w-6 h-6 bg-tree-600 rounded"></div>
              <div className="w-4 h-4 bg-forest-600 rounded"></div>
            </div>
          </div>
          
          <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-4">
            Educational Resources
          </h2>
          <p className="text-sage-600 max-w-2xl mx-auto mb-8">
            Complete blog with sustainability guides, educational content, videos, and infographics about sustainable living coming soon!
          </p>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
