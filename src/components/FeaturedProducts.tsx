
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/services/mockData";

interface FeaturedProductsProps {
  title: string;
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="vmart-container">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
