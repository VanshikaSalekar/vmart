
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight, 
  AlertTriangle 
} from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=checkout");
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="vmart-container py-12">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-4 text-gray-400">
            <ShoppingCart size={64} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="vmart-container">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
                <Button 
                  variant="ghost"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
              
              <Separator />
              
              {/* Cart item list */}
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="border-b last:border-b-0">
                    <div className="flex items-center p-4 sm:p-6">
                      {/* Product image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </Link>
                      </div>
                      
                      {/* Product details */}
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-medium hover:text-vmart-primary"
                        >
                          {item.name}
                        </Link>
                        <div className="text-lg font-semibold text-vmart-primary mt-1">
                          ${item.price.toFixed(2)}
                        </div>
                        
                        {/* Mobile layout for quantity and remove */}
                        <div className="flex items-center justify-between mt-4 sm:hidden">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              className="px-3 py-1 border-r border-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-12 text-center py-1">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 border-l border-gray-300"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Quantity control - desktop */}
                      <div className="hidden sm:flex items-center border border-gray-300 rounded-md ml-4">
                        <button
                          className="px-3 py-2 border-r border-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center py-2">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-2 border-l border-gray-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      {/* Subtotal - desktop */}
                      <div className="hidden sm:block text-right ml-8">
                        <div className="text-lg font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-1 text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {cartTotal > 50 ? "Free" : "$4.99"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span className="font-medium">
                    ${(cartTotal * 0.07).toFixed(2)}
                  </span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-vmart-primary">
                    ${(cartTotal + (cartTotal > 50 ? 0 : 4.99) + cartTotal * 0.07).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {!isAuthenticated && (
                <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-start">
                  <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    You'll need to{" "}
                    <Link to="/login?redirect=checkout" className="font-medium underline">
                      login
                    </Link>{" "}
                    or{" "}
                    <Link to="/register?redirect=checkout" className="font-medium underline">
                      register
                    </Link>{" "}
                    before checkout.
                  </span>
                </div>
              )}
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="mt-6">
                <Link to="/" className="text-sm text-vmart-primary hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
