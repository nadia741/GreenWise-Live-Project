
import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-forest-800 text-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-sage-500 p-2 rounded-eco">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-outfit font-bold text-white">
                GreenWise
              </span>
            </div>
            <p className="text-cream-200 leading-relaxed">
              Making sustainable shopping accessible, transparent, and rewarding for everyone. 
              Together, we're building a greener future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-200 hover:text-sage-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-sage-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-sage-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-sage-300 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-outfit font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Products', 'Categories', 'Sustainability', 'Blog', 'About Us', 'How It Works'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cream-200 hover:text-sage-300 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-outfit font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Shipping Info', 'Returns', 'Size Guide', 'Contact Us', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cream-200 hover:text-sage-300 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-outfit font-semibold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sage-300" />
                <span className="text-cream-200">hello@greenwise.eco</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sage-300" />
                <span className="text-cream-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sage-300 mt-1" />
                <span className="text-cream-200">
                  123 Eco Street<br />
                  Green City, GC 12345
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-forest-700 border border-forest-600 rounded-l-btn text-cream-100 placeholder-cream-300 focus:outline-none focus:border-sage-400"
                />
                <button className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-2 rounded-r-btn transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-forest-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream-300 text-sm">
            © 2024 GreenWise. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-cream-300 hover:text-sage-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-cream-300 hover:text-sage-300 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-cream-300 hover:text-sage-300 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
