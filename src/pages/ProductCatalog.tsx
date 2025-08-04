import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Filter, Grid, List, Search } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sustainabilityScore: number;
  inventory: number;
  averageRating: number;
  numReviews: number;
  sustainabilityFeatures: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  certifications: string[];
}

const ProductCatalog = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 100],
    sustainabilityFeatures: [] as string[],
    sortBy: 'featured'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<{
    products: Product[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  }>({
    products: [],
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  // Static data from our product model
  const categories = ['general', 'food', 'clothing', 'electronics', 'home', 'accessories'];
  const sustainabilityFeatures = [
    "Recyclable",
    "BPA-free",
    "Long-lasting",
    "Locally sourced",
    "No plastic packaging",
    "Bee-friendly harvesting",
    "Solar energy",
    "Durable materials",
    "No electricity required",
    "Plastic-free",
    "100% compostable",
    "Zero toxic chemicals",
    "Vegan",
    "Biodegradable",
    "Water-resistant",
    "Organic ingredients",
    "Compostable packaging",
    "No artificial additives",
    "Cruelty-free",
    "Plastic-free jar",
    "Natural ingredients"
  ];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (searchQuery) queryParams.append('search', searchQuery);
      if (filters.category !== 'all') queryParams.append('category', filters.category);
      if (filters.sustainabilityFeatures.length > 0) {
        filters.sustainabilityFeatures.forEach(feature => {
          queryParams.append('sustainabilityFeatures', feature);
        });
      }
      
      const minPrice = filters.priceRange[0];
      const maxPrice = filters.priceRange[1];
      if (minPrice > 0) queryParams.append('minPrice', minPrice.toString());
      if (maxPrice < 100) queryParams.append('maxPrice', maxPrice.toString());
      
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', '8');

      const response = await fetch(`/api/products?${queryParams.toString()}`);
      const data = await response.json();
      
      setProductData(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      sustainabilityFeatures: checked
        ? [...prev.sustainabilityFeatures, feature]
        : prev.sustainabilityFeatures.filter(f => f !== feature)
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 100],
      sustainabilityFeatures: [],
      sortBy: 'featured'
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Sustainable Products'}
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover eco-friendly products that make a positive impact on our planet
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-eco shadow-eco p-6 sticky top-24 animate-fade-in-scale">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-forest-700">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-forest-700 mb-3 block">Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(category) => {
                    setFilters(prev => ({ ...prev, category }));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-forest-700 mb-3 block">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => {
                    setFilters(prev => ({ ...prev, priceRange: value }));
                    setCurrentPage(1);
                  }}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>

              {/* Sustainability Features Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-forest-700 mb-3 block">Sustainability Features</Label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {sustainabilityFeatures.map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={filters.sustainabilityFeatures.includes(feature)}
                        onCheckedChange={(checked) => 
                          handleFeatureChange(feature, checked as boolean)
                        }
                      />
                      <Label htmlFor={feature} className="text-sm text-sage-600">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white rounded-eco shadow-eco p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className="text-sage-600">
                  {productData.totalProducts} products found
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={filters.sortBy} onValueChange={(value) => {
                  setFilters(prev => ({ ...prev, sortBy: value }));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border border-sage-200 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-forest-600 mx-auto"></div>
                <p className="mt-4 text-forest-600">Loading products...</p>
              </div>
            ) : productData.products.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
              }`}>
                {productData.products.map((product, index) => (
                  <div
                    key={product._id}
                    className="animate-fade-in-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard 
                      id={product._id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      category={product.category}
                      image={product.image}
                     
                      certifications={product.sustainabilityFeatures}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <Search className="h-16 w-16 text-sage-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-forest-700 mb-2">No products found</h3>
                <p className="text-sage-600">Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {productData.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="hover-scale"
                >
                  Previous
                </Button>
                
                {[...Array(productData.totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === productData.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 hover-scale"
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, productData.totalPages))}
                  disabled={currentPage === productData.totalPages}
                  className="hover-scale"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCatalog;
