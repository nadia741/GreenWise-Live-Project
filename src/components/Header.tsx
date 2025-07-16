import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Leaf, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useRewards } from '@/contexts/RewardsContext';
import { getSpellingSuggestions } from '@/utils/spellCheck';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount, getWishlistItemsCount } = useCart();
  const { points: sustainabilityScore } = useRewards();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchSuggestions([]);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const suggestions = getSpellingSuggestions(value);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  const applySuggestion = (suggestion: string) => {
    const newQuery = searchQuery.split(' ').map(word => {
      const suggestions = getSpellingSuggestions(word);
      return suggestions.includes(suggestion) ? suggestion : word;
    }).join(' ');
    setSearchQuery(newQuery);
    setSearchSuggestions([]);
  };

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/impact', label: 'Impact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sage-200 shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group hover-scale">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-tree-500 to-forest-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-tree-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-outfit font-bold text-forest-700">
                Green<span className="text-tree-600">Wise</span>
              </h1>
              <p className="text-xs text-sage-500 leading-none">Sustainable Marketplace</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sage-700 hover:text-tree-600 font-medium transition-colors duration-200 relative group story-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
              <Input
                type="text"
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 py-3 w-full border-sage-200 focus:border-tree-400 rounded-xl bg-white/80 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-tree-600 hover:bg-tree-700 text-white px-4 py-2 rounded-lg"
              >
                Search
              </Button>
            </form>
            
            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-sage-200 rounded-lg shadow-lg mt-1 z-50 animate-fade-in">
                <div className="p-2 text-sm text-sage-600 border-b">Did you mean:</div>
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => applySuggestion(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-tree-50 text-tree-600 capitalize"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-sage-600 hover:text-tree-600"
              onClick={() => {
                const query = prompt('Search for products...');
                if (query?.trim()) {
                  navigate(`/products?search=${encodeURIComponent(query.trim())}`);
                }
              }}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Sustainability Score */}
            <div className="hidden sm:flex items-center space-x-2 text-sage-600">
              <span className="text-sm">Score:</span>
              <span className="font-bold text-tree-600">{sustainabilityScore}</span>
            </div>

            {/* User Auth Buttons */}
            {!isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sage-600 hover:text-tree-600"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-tree-600 hover:bg-tree-700 text-white"
                  onClick={() => navigate('/signup')}
                >
                  Join Now
                </Button>
              </div>
            )}

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-sage-600 hover:text-tree-600 relative hover-scale"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden lg:inline text-sm font-medium">Wishlist</span>
              {getWishlistItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getWishlistItemsCount()}
                </span>
              )}
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-sage-600 hover:text-tree-600 relative hover-scale"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden lg:inline text-sm font-medium">Cart</span>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-tree-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {getCartItemsCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-sage-600 hover:text-tree-600 hover-scale"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline text-sm font-medium">
                    {isAuthenticated ? user?.firstName : 'Account'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-md border border-sage-200">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center">
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup" className="flex items-center">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sage-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-sage-200 py-4 bg-white/95 backdrop-blur-md animate-slide-in-right">
            <nav className="flex flex-col space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sage-700 hover:text-tree-600 font-medium py-2 px-4 rounded-lg hover:bg-tree-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
