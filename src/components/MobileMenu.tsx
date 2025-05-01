
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Home, 
  User, 
  ShoppingCart, 
  Heart, 
  Package, 
  LogOut
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  
  if (!isOpen) return null;
  
  const handleLogout = () => {
    logout();
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white animate-slide-in overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-vmart-primary text-white">
          <Link to="/" onClick={onClose} className="font-bold text-xl">
            VMART
          </Link>
          <Button 
            variant="ghost" 
            className="text-white p-1" 
            onClick={onClose}
          >
            <X size={24} />
          </Button>
        </div>
        
        {/* User info */}
        {isAuthenticated && user ? (
          <div className="p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="bg-vmart-primary text-white rounded-full h-10 w-10 flex items-center justify-center">
                <span className="text-lg font-medium">{user.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 flex space-x-4">
            <Link to="/login" onClick={onClose} className="flex-1">
              <Button variant="default" className="w-full">Login</Button>
            </Link>
            <Link to="/register" onClick={onClose} className="flex-1">
              <Button variant="outline" className="w-full">Register</Button>
            </Link>
          </div>
        )}
        
        <Separator />
        
        {/* Navigation items */}
        <nav className="p-4">
          <p className="text-sm font-semibold text-gray-500 mb-2">MAIN MENU</p>
          <ul>
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center p-3 hover:bg-gray-50 rounded-md"
              >
                <Home size={20} className="mr-3 text-vmart-primary" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex items-center p-3 hover:bg-gray-50 rounded-md"
              >
                <ShoppingCart size={20} className="mr-3 text-vmart-primary" />
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex items-center p-3 hover:bg-gray-50 rounded-md"
              >
                <Heart size={20} className="mr-3 text-vmart-primary" />
                <span>Wishlist</span>
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                  >
                    <User size={20} className="mr-3 text-vmart-primary" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                  >
                    <Package size={20} className="mr-3 text-vmart-primary" />
                    <span>My Orders</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md w-full text-left"
                  >
                    <LogOut size={20} className="mr-3 text-red-500" />
                    <span className="text-red-500">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        <Separator />
        
        {/* Categories */}
        <div className="p-4">
          <p className="text-sm font-semibold text-gray-500 mb-2">CATEGORIES</p>
          <ul>
            {[
              "Electronics",
              "Fashion",
              "Home",
              "Beauty",
              "Toys",
              "Books",
              "Sports",
              "Grocery"
            ].map((category) => (
              <li key={category}>
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  onClick={onClose}
                  className="block p-3 hover:bg-gray-50 rounded-md"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
