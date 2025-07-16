
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Filter, Grid, List, Search } from 'lucide-react';
import { products, categories } from '@/data/products';

const ProductCatalog = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [filters, setFilters] = useState({
    category: 'all',
    subcategory: 'all',
    priceRange: [0, 100],
    certifications: [] as string[],
    sustainabilityScore: 0,
    sortBy: 'featured'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 8;

  const allCategories = [...Object.keys(categories), ...products.map(p => p.category).filter(c => c && !Object.keys(categories).includes(c))].filter((value, index, self) => self.indexOf(value) === index);
  const allCertifications = [...new Set(products.flatMap(p => p.certifications))];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        const matchesSubcategory = product.subcategory?.toLowerCase().includes(query);
        const matchesCertifications = product.certifications.some(cert => 
          cert.toLowerCase().includes(query)
        );
        
        if (!matchesName && !matchesDescription && !matchesCategory && !matchesSubcategory && !matchesCertifications) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && filters.subcategory !== 'all' && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Certifications filter
      if (filters.certifications.length > 0) {
        const hasRequiredCertifications = filters.certifications.every(cert =>
          product.certifications.includes(cert)
        );
        if (!hasRequiredCertifications) {
          return false;
        }
      }

      // Sustainability score filter
      if (product.sustainabilityScore < filters.sustainabilityScore) {
        return false;
      }

      return true;
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'sustainability':
        filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // featured
        filtered.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchQuery, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCertificationChange = (certification: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      certifications: checked
        ? [...prev.certifications, certification]
        : prev.certifications.filter(c => c !== certification)
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      subcategory: 'all',
      priceRange: [0, 100],
      certifications: [],
      sustainabilityScore: 0,
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

              {/* Category & Subcategory Filters */}
              <CategoryFilter
                selectedCategory={filters.category}
                selectedSubcategory={filters.subcategory}
                onCategoryChange={(category) => {
                  setFilters(prev => ({ ...prev, category, subcategory: 'all' }));
                  setCurrentPage(1);
                }}
                onSubcategoryChange={(subcategory) => {
                  setFilters(prev => ({ ...prev, subcategory }));
                  setCurrentPage(1);
                }}
              />

              {/* Price Range Filter */}
              <div className="mb-6 mt-6">
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
                  className="w-full"
                />
              </div>

              {/* Sustainability Score Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-forest-700 mb-3 block">
                  Minimum Sustainability Score: {filters.sustainabilityScore}
                </Label>
                <Slider
                  value={[filters.sustainabilityScore]}
                  onValueChange={(value) => {
                    setFilters(prev => ({ ...prev, sustainabilityScore: value[0] }));
                    setCurrentPage(1);
                  }}
                  max={100}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Certifications Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-forest-700 mb-3 block">Certifications</Label>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {allCertifications.map(certification => (
                    <div key={certification} className="flex items-center space-x-2">
                      <Checkbox
                        id={certification}
                        checked={filters.certifications.includes(certification)}
                        onCheckedChange={(checked) => 
                          handleCertificationChange(certification, checked as boolean)
                        }
                      />
                      <Label htmlFor={certification} className="text-sm text-sage-600">
                        {certification}
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
                  {filteredProducts.length} products found
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
                    <SelectItem value="sustainability">Most Sustainable</SelectItem>
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
            {paginatedProducts.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8' 
                  : 'space-y-6'
              }`}>
                {paginatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard {...product} />
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
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="hover-scale"
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
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
