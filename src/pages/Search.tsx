
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/services/mockData";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  
  // Update query state when URL changes
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [location.search, searchParams]);
  
  // Fetch search results
  const {
    data: searchResults = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => searchProducts(query),
    enabled: !!query,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with new search query
    if (query.trim()) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("q", query);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${newSearchParams.toString()}`
      );
      
      // Refetch results with new query
      refetch();
    }
  };
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="vmart-container">
        {/* Search form */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        {/* Results content */}
        <div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-vmart-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold mb-2">Error</h2>
              <p className="text-gray-600 mb-4">
                An error occurred while searching for products.
              </p>
              <Button onClick={() => refetch()}>Try Again</Button>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <h2 className="text-xl font-bold mb-2">No Results Found</h2>
              <p className="text-gray-600 mb-4">
                We couldn't find any products matching "{query}".
              </p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">
                Search Results for "{query}"
              </h1>
              <p className="mb-6 text-gray-600">
                {searchResults.length} product{searchResults.length !== 1 ? "s" : ""} found
              </p>
              
              <div className="product-grid">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
