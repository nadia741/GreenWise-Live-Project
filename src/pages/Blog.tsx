
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
      excerpt: "Simple daily changes that can make a big difference for the environment.",
      author: "Green Team",
      date: "Dec 15, 2024",
      category: "Sustainability Tips",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop&auto=format",
      readTime: "5 min read"
    },
    {
      id: "2",
      title: "The Future of Sustainable Packaging",
      excerpt: "How innovative packaging solutions are revolutionizing e-commerce.",
      author: "Eco Expert",
      date: "Dec 12, 2024",
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop&auto=format",
      readTime: "8 min read"
    },
    {
      id: "3",
      title: "Building a Zero-Waste Kitchen",
      excerpt: "Essential products and tips for creating an eco-friendly kitchen.",
      author: "Sustainable Living",
      date: "Dec 10, 2024",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop&auto=format",
      readTime: "6 min read"
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
                
                <div className="flex items-center justify-between text-sm text-sage-500 mb-4 pb-4 border-b border-sage-100">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                  </div>
                </div>
                
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
          
          <Button className="bg-tree-600 hover:bg-tree-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
            Subscribe to Updates
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
