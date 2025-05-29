import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Search, 
  User, 
  Heart, 
  Menu, 
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? "bg-white shadow-md" : "bg-vmart-primary text-white"
    }`}>
      <div className="vmart-container">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button 
            onClick={onMenuOpen}
            className="lg:hidden p-2 rounded-md"
          >
            <Menu className={isScrolled ? "text-gray-800" : "text-white"} />
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`font-bold text-2xl ${isScrolled ? "text-vmart-primary" : "text-white"}`}>
              VMART
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-8">
            {["Electronics", "Fashion", "Home", "Beauty", "Toys"].map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className={`font-medium hover:opacity-80 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {category}
              </Link>
            ))}
          </nav>
          
          {/* Search bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex items-center flex-1 max-w-lg mx-6"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={18}
              />
            </div>
            <Button 
              type="submit" 
              variant="ghost"
              className={isScrolled ? "text-gray-700" : "text-white"}
            >
              <Search size={20} />
            </Button>
          </form>
          
          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2">
              <Heart className={isScrolled ? "text-gray-700" : "text-white"} size={24} />
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className={isScrolled ? "text-gray-700" : "text-white"} size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vmart-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            
            {/* User account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="p-2"
                  >
                    <User className={isScrolled ? "text-gray-700" : "text-white"} size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {(user?.role === "admin" || user?.role === "seller") && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard\" className="w-full cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full cursor-pointer">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-500 cursor-pointer flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button 
                  variant={isScrolled ? "default" : "outline"} 
                  className={isScrolled ? "" : "text-white border-white hover:bg-white hover:text-vmart-primary"}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="lg:hidden pb-4">
          <form 
            onSubmit={handleSearch} 
            className="flex items-center"
          >
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={18} 
              />
            </div>
            <Button 
              type="submit" 
              variant="ghost" 
              className={isScrolled ? "text-gray-700" : "text-white"}
            >
              <Search size={20} />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;