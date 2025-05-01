
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ShoppingCart, 
  Heart, 
  Star 
} from "lucide-react";
import { Product } from "@/services/mockData";

interface ProductCardProps {
  product: Product;
  wishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, wishlist = false }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.new && (
              <span className="bg-vmart-info text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {discount >= 10 && (
              <span className="bg-vmart-error text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div className="absolute top-2 right-2">
            <Button 
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100"
            >
              <Heart className={`h-4 w-4 ${wishlist ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center mb-1">
            <span className="text-xs text-gray-500 capitalize">
              {product.category}
            </span>
          </div>
          
          <CardTitle className="text-base font-medium line-clamp-2 mb-1">
            {product.name}
          </CardTitle>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-500 mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-yellow-500" : ""}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
          
          <div className="flex items-baseline mt-1">
            <span className="text-lg font-bold text-vmart-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="default" 
            className="w-full" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
