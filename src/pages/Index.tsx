
import React, { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoSection from "@/components/PromoSection";
import Newsletter from "@/components/Newsletter";
import { useQuery } from "@tanstack/react-query";
import { 
  getCategories, 
  getFeaturedProducts, 
  getNewProducts,
  Product,
  Category
} from "@/services/mockData";

const Index = () => {
  // Fetch categories
  const { 
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Fetch featured products
  const { 
    data: featuredProducts = [],
    isLoading: featuredLoading,
    error: featuredError
  } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts
  });
  
  // Fetch new products
  const { 
    data: newProducts = [],
    isLoading: newProductsLoading,
    error: newProductsError
  } = useQuery({
    queryKey: ['newProducts'],
    queryFn: getNewProducts
  });
  
  return (
    <div>
      {/* Hero carousel */}
      <HeroCarousel />
      
      {/* Categories */}
      <CategorySection categories={categories} />
      
      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts 
          title="Featured Products" 
          products={featuredProducts} 
        />
      )}
      
      {/* Promo section */}
      <PromoSection />
      
      {/* New products */}
      {newProducts.length > 0 && (
        <FeaturedProducts 
          title="New Arrivals" 
          products={newProducts} 
        />
      )}
      
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Index;
