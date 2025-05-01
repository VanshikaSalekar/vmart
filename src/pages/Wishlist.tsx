
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/services/mockData";

interface WishlistItem extends Product {}

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  
  // For demo purposes, we'll just use some hard-coded products
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const mockWishlist: WishlistItem[] = [
      {
        id: "product-2",
        name: "Wireless Noise-Cancelling Headphones",
        description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable ear cushions for all-day listening.",
        price: 149.99,
        originalPrice: 199.99,
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "electronics",
        subCategory: "audio",
        rating: 4.8,
        reviewCount: 256,
        stock: 42,
        featured: true,
        discount: 25,
      },
      {
        id: "product-5",
        name: "Women's Summer Dress",
        description: "Elegant summer dress with floral pattern, perfect for beach days and casual outings. Light and comfortable material.",
        price: 39.99,
        images: [
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=987&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "fashion",
        subCategory: "women",
        rating: 4.7,
        reviewCount: 136,
        stock: 85,
        featured: true,
      },
    ];
    
    setWishlistItems(mockWishlist);
  }, []);
  
  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success("Item removed from wishlist");
  };
  
  const handleAddToCart = (product: WishlistItem) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };
  
  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.images[0],
      });
    });
    toast.success("All items added to cart");
  };
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=wishlist" replace />;
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="vmart-container">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <Button 
              className="mt-4 sm:mt-0" 
              variant="outline"
              onClick={handleAddAllToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>
          )}
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mb-4 text-gray-400">
              <Heart size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any products to your wishlist yet.
            </p>
            <Link to="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col sm:flex-row"
              >
                <Link 
                  to={`/product/${item.id}`}
                  className="sm:w-40 h-40 flex-shrink-0"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <Link 
                      to={`/product/${item.id}`}
                      className="font-medium hover:text-vmart-primary"
                    >
                      {item.name}
                    </Link>
                    
                    <div className="flex items-baseline mt-1 mb-2">
                      <span className="text-lg font-bold text-vmart-primary">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="flex-1"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
