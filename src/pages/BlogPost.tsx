
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, Share2, Heart } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();

  // Mock blog post data
  const post = {
    id: id,
    title: "10 Ways to Reduce Your Carbon Footprint at Home",
    content: `
      <p>Living sustainably doesn't have to be overwhelming. Small changes in your daily routine can make a significant impact on the environment. Here are ten practical ways to reduce your carbon footprint from the comfort of your home.</p>
      
      <h2>1. Switch to LED Light Bulbs</h2>
      <p>LED bulbs use up to 80% less energy than traditional incandescent bulbs and last much longer. This simple switch can significantly reduce your electricity consumption and save money on your energy bills.</p>
      
      <h2>2. Unplug Electronics When Not in Use</h2>
      <p>Many electronics continue to draw power even when turned off. Unplugging devices or using power strips with switches can eliminate this "phantom" energy use.</p>
      
      <h2>3. Optimize Your Home's Temperature</h2>
      <p>Adjust your thermostat by just a few degrees. In winter, lower it by 2-3 degrees, and in summer, raise it by the same amount. This can lead to substantial energy savings.</p>
      
      <h2>4. Reduce Water Consumption</h2>
      <p>Take shorter showers, fix leaky faucets, and consider installing low-flow showerheads and toilets. Every drop counts when it comes to conservation.</p>
      
      <h2>5. Choose Sustainable Transportation</h2>
      <p>Walk, bike, use public transportation, or carpool when possible. For longer distances, consider electric or hybrid vehicles.</p>
    `,
    author: "Sarah Green",
    date: "January 15, 2024",
    category: "Sustainability",
    readTime: "5 min read",
    image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'><rect fill='%23A3C3A7' width='800' height='400'/><circle cx='400' cy='200' r='80' fill='%23ffffff'/><text x='400' y='210' text-anchor='middle' fill='%23A3C3A7' font-size='20'>Eco Home</text></svg>",
    tags: ["sustainability", "home", "carbon-footprint", "environment"]
  };

  const relatedPosts = [
    {
      id: "2",
      title: "The Rise of Sustainable Fashion",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect fill='%237C9082' width='300' height='200'/><text x='150' y='105' text-anchor='middle' fill='%23ffffff' font-size='16'>Fashion</text></svg>"
    },
    {
      id: "3",
      title: "Zero Waste Kitchen Tips",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect fill='%238B7355' width='300' height='200'/><text x='150' y='105' text-anchor='middle' fill='%23ffffff' font-size='16'>Kitchen</text></svg>"
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link to="/blog" className="text-sage-600 hover:text-forest-700">
              ← Back to Blog
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-sage-100 text-sage-700 text-sm rounded-full">
                {post.category}
              </span>
              <span className="flex items-center text-sm text-sage-500">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-6 text-sage-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.date}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video mb-8 rounded-eco overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-forest-600 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-forest-700 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-sage-100 text-sage-700 text-sm rounded-full hover:bg-sage-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-sage-50 rounded-eco p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-sage-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-sage-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-forest-700">{post.author}</h3>
                <p className="text-sage-600 mb-2">
                  Environmental writer and sustainability advocate with over 10 years of experience in eco-friendly living.
                </p>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div>
            <h3 className="text-2xl font-outfit font-bold text-forest-700 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-eco shadow-eco overflow-hidden hover:shadow-eco-lg transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-forest-700 hover:text-sage-600 transition-colors">
                      {relatedPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
