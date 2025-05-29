import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  Share,
  Star,
  Minus,
  Plus,
  Check,
  Truck,
} from "lucide-react";
import { getProductById, getProductsByCategory } from "@/services/mockData";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Fetch product details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => id ? getProductById(id) : Promise.resolve(null),
    enabled: !!id,
  });
  
  // Fetch related products
  const {
    data: relatedProducts = [],
    isLoading: relatedLoading,
  } = useQuery({
    queryKey: ["relatedProducts", product?.category],
    queryFn: () => product ? getProductsByCategory(product.category, 4) : Promise.resolve([]),
    enabled: !!product,
  });
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        });
      }
    }
  };
  
  const handleAddToWishlist = () => {
    // Get existing wishlist
    const savedWishlist = localStorage.getItem("vmart-wishlist");
    let wishlist: Product[] = [];
    
    if (savedWishlist) {
      try {
        wishlist = JSON.parse(savedWishlist);
      } catch (error) {
        console.error("Failed to parse wishlist:", error);
      }
    }
    
    // Check if product is already in wishlist
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      toast.error("Product already in wishlist");
      return;
    }
    
    // Add product to wishlist
    wishlist.push(product);
    localStorage.setItem("vmart-wishlist", JSON.stringify(wishlist));
    toast.success("Product added to wishlist");
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };
  
  if (isLoading) {
    return (
      <div className="vmart-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-24 w-full mb-6" />
            <Skeleton className="h-10 w-1/3 mb-4" />
            <Skeleton className="h-12 w-full max-w-xs mb-6" />
            <Skeleton className="h-12 w-full mb-6" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="vmart-container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="bg-white">
      <div className="vmart-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product images */}
          <div>
            <div className="aspect-square overflow-hidden border border-gray-200 rounded-lg bg-gray-100 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 border-2 rounded-md overflow-hidden flex-shrink-0 ${
                      selectedImage === index
                        ? "border-vmart-primary"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div>
            {/* Breadcrumbs */}
            <nav className="flex text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                to={`/category/${product.category}`}
                className="hover:underline capitalize"
              >
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate">
                {product.name}
              </span>
            </nav>
            
            {/* Title and badges */}
            <div className="mb-4 flex gap-2">
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
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-yellow-500" : ""}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-vmart-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Short description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Stock status */}
            <div className="flex items-center mb-6">
              <div
                className={`flex items-center text-sm ${
                  product.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 0 ? (
                  <>
                    <Check size={16} className="mr-1" />
                    <span>In Stock ({product.stock} available)</span>
                  </>
                ) : (
                  <span>Out of Stock</span>
                )}
              </div>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex border border-gray-300 rounded-md max-w-[150px]">
                <button
                  className="px-3 py-2 border-r border-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-12 text-center border-0 focus:ring-0"
                />
                <button
                  className="px-3 py-2 border-l border-gray-300"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Shipping info */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Truck size={18} className="mr-2" />
              <span>Free delivery on orders over $50</span>
            </div>
            
            {/* Category and SKU */}
            <div className="text-sm text-gray-600">
              <p className="mb-1">
                <span className="font-medium">Category:</span>{" "}
                <Link
                  to={`/category/${product.category}`}
                  className="hover:underline capitalize"
                >
                  {product.category}
                </Link>
              </p>
              <p>
                <span className="font-medium">SKU:</span> {product.id}
              </p>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full max-w-md mb-8 grid grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-2">
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  in dictum nulla. Sed eu ullamcorper lacus, vel tincidunt sapien.
                  Duis facilisis, arcu nec pharetra ultrices, mauris tellus
                  efficitur odio, id tempor velit est at lacus. Praesent eu magna
                  vitae tellus lobortis ultricies eget a metus.
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>High-quality materials for durability</li>
                  <li>Easy to use and maintain</li>
                  <li>Designed for optimal performance</li>
                  <li>Modern and stylish appearance</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-start border-b pb-6">
                  <div className="mr-4">
                    <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                      <span className="font-medium text-gray-700">JD</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-lg">John Doe</h4>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < 5 ? "fill-yellow-500" : ""}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">
                      Great product! Exactly as described and arrived quickly.
                      Would definitely recommend to others.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                      <span className="font-medium text-gray-700">JS</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-lg">Jane Smith</h4>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < 4 ? "fill-yellow-500" : ""}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">
                      The quality is excellent, though delivery took a bit longer
                      than expected. Overall happy with my purchase.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 mt-6 border-t">
                  <Button variant="outline">
                    See all {product.reviewCount} reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                <p className="text-gray-600 mb-4">
                  We offer fast and reliable shipping options to ensure you
                  receive your products in a timely manner.
                </p>
                
                <h4 className="font-medium mt-6 mb-2">Shipping Options:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Standard Shipping (3-5 business days): $4.99</li>
                  <li>Express Shipping (1-2 business days): $9.99</li>
                  <li>Free shipping on all orders over $50</li>
                </ul>
                
                <h4 className="font-medium mt-6 mb-2">Important Notes:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    Orders are processed within 24 hours of payment confirmation
                  </li>
                  <li>
                    Shipping times do not include weekends and holidays
                  </li>
                  <li>
                    For international shipping options, please contact customer
                    service
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="product-grid">
              {relatedProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;