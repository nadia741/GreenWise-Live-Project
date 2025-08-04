import { api, Product } from "@/services/api";
import { AlertCircle, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const FeaturedProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productsPerPage = 8;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await api.products.getProducts({
        page: currentPage.toString(),
        limit: productsPerPage.toString(),
      });

      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(
        "Unable to load products. Please check your connection and try again."
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const retryFetch = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-tree-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-forest-600 mx-auto mb-4"></div>
            <p className="text-forest-600">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-tree-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-forest-700 mb-4">
              Unable to Load Products
            </h3>
            <p className="text-sage-600 mb-6 max-w-md mx-auto">{error}</p>
            <Button
              onClick={retryFetch}
              className="bg-forest-600 hover:bg-forest-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-tree-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-forest-700 mb-4">
              No Products Available
            </h3>
            <p className="text-sage-600">
              Please check back later for new products.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-tree-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            🌱 Featured Products
          </div>
          <h2 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            Sustainable Choices for
            <span className="block text-tree-600">Everyday Living</span>
          </h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Discover eco-friendly products that make a positive impact on our
            planet while enhancing your lifestyle
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {displayedProducts.map((product, index) => (
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
                sustainabilityScore={product.sustainabilityScore}
                averageRating={product.averageRating}
                numReviews={product.numReviews}
                sustainabilityFeatures={product.sustainabilityFeatures}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              variant="outline"
              className="flex items-center gap-2 border-sage-300 hover:bg-sage-50 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className="w-10 h-10"
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              variant="outline"
              className="flex items-center gap-2 border-sage-300 hover:bg-sage-50 disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div
          className="text-center mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            onClick={() => (window.location.href = "/products")}
            className="bg-gradient-to-r from-tree-600 to-forest-700 hover:from-tree-700 hover:to-forest-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
