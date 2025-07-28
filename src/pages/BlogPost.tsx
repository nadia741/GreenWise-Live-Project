
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, Share2, Heart } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Blog posts data
  const blogPosts = [
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

Making these changes gradually ensures they become lasting habits rather than temporary efforts. Start with one or two changes that feel manageable, then build momentum as these behaviors become routine. Every small action contributes to a larger positive impact on our planet.`,
      tags: ["sustainability", "home", "carbon-footprint", "environment"]
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

The economic benefits of sustainable packaging are becoming clear. While initial costs may be higher, companies often see reduced material usage, lower shipping costs due to lighter weights, and improved brand perception. Consumer loyalty increasingly favors environmentally responsible brands, making sustainable packaging a competitive advantage rather than just an environmental imperative.`,
      tags: ["packaging", "innovation", "sustainability", "ecommerce"]
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

The transition to zero-waste doesn't happen overnight. Start with one area, master those changes, then gradually expand to other aspects of your kitchen routine.`,
      tags: ["zero-waste", "kitchen", "lifestyle", "sustainability"]
    }
  ];

  const post = blogPosts.find(p => p.id === id) || blogPosts[0];

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
            <div className="text-forest-600 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
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
