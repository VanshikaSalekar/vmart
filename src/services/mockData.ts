
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subCategory?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  new?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 120,
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 250,
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 95,
  },
  {
    id: "beauty",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 78,
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1609372332255-611485350f25?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 65,
  },
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productCount: 110,
  },
];

export const products: Product[] = [
  {
    id: "product-1",
    name: "Smart HD TV 43\"",
    description: "A stunning 43-inch Smart HD TV with built-in streaming apps, voice control, and crystal clear display. Perfect for your living room entertainment.",
    price: 399.99,
    originalPrice: 499.99,
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1053&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "electronics",
    subCategory: "televisions",
    rating: 4.5,
    reviewCount: 128,
    stock: 25,
    featured: true,
    discount: 20,
  },
  {
    id: "product-2",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable ear cushions for all-day listening.",
    price: 149.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1050&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    id: "product-3",
    name: "Smartphone Pro Max",
    description: "Latest flagship smartphone with 6.7-inch OLED display, triple camera system, all-day battery life, and the fastest processor available.",
    price: 999.99,
    images: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1064&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1180&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "electronics",
    subCategory: "phones",
    rating: 4.9,
    reviewCount: 512,
    stock: 18,
    new: true,
  },
  {
    id: "product-4",
    name: "Casual Men's T-Shirt",
    description: "Comfortable, breathable cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.",
    price: 19.99,
    originalPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1180&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1154&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "fashion",
    subCategory: "men",
    rating: 4.3,
    reviewCount: 89,
    stock: 150,
    discount: 20,
  },
  {
    id: "product-5",
    name: "Women's Summer Dress",
    description: "Elegant summer dress with floral pattern, perfect for beach days and casual outings. Light and comfortable material.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=987&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=988&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "fashion",
    subCategory: "women",
    rating: 4.7,
    reviewCount: 136,
    stock: 85,
    featured: true,
  },
  {
    id: "product-6",
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with 12-cup capacity, built-in grinder, and multiple brewing options for the perfect cup every time.",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=987&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1576300292702-bb2ba4118010?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1170&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "home",
    subCategory: "kitchen",
    rating: 4.6,
    reviewCount: 211,
    stock: 32,
    discount: 25,
  },
  {
    id: "product-7",
    name: "Luxury Bedding Set",
    description: "Premium cotton bedding set including duvet cover, fitted sheet, and four pillowcases. Soft, breathable, and perfect for a good night's sleep.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=987&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1074&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "home",
    subCategory: "bedroom",
    rating: 4.8,
    reviewCount: 75,
    stock: 22,
    new: true,
  },
  {
    id: "product-8",
    name: "Skincare Gift Set",
    description: "Complete skincare routine in one box. Includes cleanser, toner, moisturizer, serum, and face mask made with natural ingredients.",
    price: 69.99,
    originalPrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf8d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1170&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1571781418606-d638585d7288?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=988&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "beauty",
    subCategory: "skincare",
    rating: 4.9,
    reviewCount: 168,
    stock: 45,
    featured: true,
    discount: 22,
  },
];

export const banners = [
  {
    id: "banner1",
    title: "New Season Arrivals",
    subtitle: "Check out all the new trends",
    image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Shop Now",
    buttonLink: "/category/fashion",
    position: "center",
  },
  {
    id: "banner2",
    title: "Tech Sale",
    subtitle: "Up to 40% off on selected electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2021&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "View Deals",
    buttonLink: "/category/electronics",
    position: "left",
  },
  {
    id: "banner3",
    title: "Home Makeover",
    subtitle: "Refresh your space with new home decor",
    image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1932&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Explore",
    buttonLink: "/category/home",
    position: "right",
  }
];

// Service functions
export const getProducts = async (limit?: number): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return limit ? products.slice(0, limit) : products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = products.find(p => p.id === id);
  return product || null;
};

export const getProductsByCategory = async (category: string, limit?: number): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const filteredProducts = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  return limit ? filteredProducts.slice(0, limit) : filteredProducts;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) || 
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return products.filter(p => p.featured).slice(0, 4);
};

export const getNewProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return products.filter(p => p.new).slice(0, 4);
};

export const getCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return categories;
};
