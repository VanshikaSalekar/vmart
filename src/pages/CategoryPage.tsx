
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  getProductsByCategory, 
  getCategories,
  Product 
} from "@/services/mockData";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, Filter, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  
  // Fetch categories
  const { 
    data: categories = [],
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Fetch products by category
  const { 
    data: products = [],
    isLoading: productsLoading,
    error: productsError
  } = useQuery({
    queryKey: ['categoryProducts', category],
    queryFn: () => category ? getProductsByCategory(category) : Promise.resolve([]),
    enabled: !!category
  });
  
  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Apply other filters
    for (const [filterType, selectedValues] of Object.entries(selectedFilters)) {
      if (selectedValues.length === 0) continue;
      
      // Just a simple filter here, would be more complex in a real app
      if (filterType === "inStock" && selectedValues.includes("inStock")) {
        if (product.stock <= 0) return false;
      }
      
      if (filterType === "onSale" && selectedValues.includes("onSale")) {
        if (!product.originalPrice) return false;
      }
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "newest":
        return a.new ? -1 : b.new ? 1 : 0;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return a.featured ? -1 : b.featured ? 1 : 0;
    }
  });
  
  // Get current category
  const currentCategory = categories.find(
    (cat) => cat.id.toLowerCase() === category?.toLowerCase()
  );
  
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterType] || [];
      
      return {
        ...prev,
        [filterType]: currentFilters.includes(value)
          ? currentFilters.filter((v) => v !== value)
          : [...currentFilters, value],
      };
    });
  };
  
  if (productsError) {
    return (
      <div className="vmart-container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
        <p className="mb-6">Sorry, we couldn't load the products in this category.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="vmart-container">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium capitalize">
            {category || "Products"}
          </span>
        </nav>
        
        {/* Category header */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">
            {currentCategory?.name || category || "Products"}
          </h1>
          <p className="text-gray-600">
            {productsLoading
              ? "Loading products..."
              : `${sortedProducts.length} products found`}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop filter sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-5 sticky top-24">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </h3>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <hr />
                
                {/* Availability */}
                <div>
                  <h4 className="font-medium mb-3">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="inStock"
                        checked={selectedFilters["inStock"]?.includes("inStock")}
                        onCheckedChange={() => 
                          handleFilterChange("inStock", "inStock")
                        }
                      />
                      <label
                        htmlFor="inStock"
                        className="text-sm font-medium leading-none ml-2"
                      >
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="onSale"
                        checked={selectedFilters["onSale"]?.includes("onSale")}
                        onCheckedChange={() => 
                          handleFilterChange("onSale", "onSale")
                        }
                      />
                      <label
                        htmlFor="onSale"
                        className="text-sm font-medium leading-none ml-2"
                      >
                        On Sale
                      </label>
                    </div>
                  </div>
                </div>
                
                <hr />
                
                {/* Demonstration filters - would be dynamically generated in a real app */}
                <Accordion type="multiple">
                  <AccordionItem value="brand">
                    <AccordionTrigger className="text-sm font-medium">
                      Brand
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {["Apple", "Samsung", "Sony", "LG", "Xiaomi"].map((brand) => (
                          <div key={brand} className="flex items-center">
                            <Checkbox id={`brand-${brand}`} />
                            <label
                              htmlFor={`brand-${brand}`}
                              className="text-sm leading-none ml-2"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="color">
                    <AccordionTrigger className="text-sm font-medium">
                      Color
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                          <div key={color} className="flex items-center">
                            <Checkbox id={`color-${color}`} />
                            <label
                              htmlFor={`color-${color}`}
                              className="text-sm leading-none ml-2"
                            >
                              {color}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="rating">
                    <AccordionTrigger className="text-sm font-medium">
                      Rating
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {[4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <Checkbox id={`rating-${rating}`} />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="text-sm leading-none ml-2 flex items-center"
                            >
                              {rating}+ 
                              <span className="text-yellow-500 ml-1">★</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <hr />
                
                {/* Clear filters button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedFilters({});
                    setPriceRange([0, 1000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products section */}
          <div className="flex-1">
            {/* Sort and filter bar */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between mb-6">
              {/* Mobile filter trigger */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow down your product search.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      {/* Mobile filters - same as desktop but in a sheet */}
                      <div>
                        <h4 className="font-medium mb-3">Price Range</h4>
                        <div className="px-2">
                          <Slider
                            defaultValue={priceRange}
                            min={0}
                            max={1000}
                            step={10}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            className="mb-4"
                          />
                          <div className="flex items-center justify-between text-sm">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                      
                      <hr />
                      
                      <div>
                        <h4 className="font-medium mb-3">Availability</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox
                              id="mobileInStock"
                              checked={selectedFilters["inStock"]?.includes("inStock")}
                              onCheckedChange={() => 
                                handleFilterChange("inStock", "inStock")
                              }
                            />
                            <label
                              htmlFor="mobileInStock"
                              className="text-sm font-medium leading-none ml-2"
                            >
                              In Stock
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              id="mobileOnSale"
                              checked={selectedFilters["onSale"]?.includes("onSale")}
                              onCheckedChange={() => 
                                handleFilterChange("onSale", "onSale")
                              }
                            />
                            <label
                              htmlFor="mobileOnSale"
                              className="text-sm font-medium leading-none ml-2"
                            >
                              On Sale
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <hr />
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedFilters({});
                          setPriceRange([0, 1000]);
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Product count */}
              <span className="text-sm text-gray-600 hidden sm:inline-block">
                {sortedProducts.length} products
              </span>
              
              {/* Sort dropdown */}
              <div className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <span className="mr-2 text-sm">Sort by:</span>
                <Select
                  defaultValue="featured"
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[160px] h-8 text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Products grid */}
            {productsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-vmart-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFilters({});
                    setPriceRange([0, 1000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="product-grid">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
