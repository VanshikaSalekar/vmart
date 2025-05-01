
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CheckCircle, CreditCard, ArrowLeft, Truck, AlertTriangle } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "confirmation";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Calculate totals
  const shippingCost = shippingMethod === "express" ? 12.99 : cartTotal > 50 ? 0 : 4.99;
  const taxAmount = cartTotal * 0.07; // 7% tax
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping form
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.postalCode || !shippingAddress.country) {
      toast.error("Please fill in all required shipping fields");
      return;
    }
    
    // If same as shipping is checked, copy shipping address to billing address
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
    
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment form
    if (paymentMethod === "credit") {
      if (!cardInfo.cardNumber || !cardInfo.nameOnCard || !cardInfo.expiry || !cardInfo.cvv) {
        toast.error("Please fill in all payment details");
        return;
      }
    }
    
    // Validate billing address if not same as shipping
    if (!sameAsShipping) {
      if (!billingAddress.fullName || !billingAddress.address || !billingAddress.city || 
          !billingAddress.state || !billingAddress.postalCode || !billingAddress.country) {
        toast.error("Please fill in all required billing fields");
        return;
      }
    }
    
    // Simulate payment processing
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setCurrentStep("confirmation");
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  // Handle order completion
  const handleCompleteOrder = () => {
    clearCart();
    navigate("/");
    toast.success("Thank you for your purchase!");
  };
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=checkout" replace />;
  }
  
  // Redirect to cart if cart is empty
  if (cart.length === 0 && currentStep !== "confirmation") {
    return <Navigate to="/cart" replace />;
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="vmart-container">
        {/* Checkout steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center max-w-md w-full">
            <div className={`flex-1 flex flex-col items-center ${currentStep === "shipping" ? "text-vmart-primary" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${currentStep === "shipping" ? "bg-vmart-primary text-white" : "bg-gray-200 text-gray-700"}`}>
                1
              </div>
              <span className="text-xs sm:text-sm">Shipping</span>
            </div>
            
            <div className={`flex-1 h-px ${currentStep === "shipping" ? "bg-gray-300" : "bg-vmart-primary"}`} />
            
            <div className={`flex-1 flex flex-col items-center ${currentStep === "payment" ? "text-vmart-primary" : currentStep === "confirmation" ? "text-gray-500" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${currentStep === "payment" ? "bg-vmart-primary text-white" : currentStep === "confirmation" ? "bg-gray-200 text-gray-700" : "bg-gray-200 text-gray-400"}`}>
                2
              </div>
              <span className="text-xs sm:text-sm">Payment</span>
            </div>
            
            <div className={`flex-1 h-px ${currentStep === "confirmation" ? "bg-vmart-primary" : "bg-gray-300"}`} />
            
            <div className={`flex-1 flex flex-col items-center ${currentStep === "confirmation" ? "text-vmart-primary" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${currentStep === "confirmation" ? "bg-vmart-primary text-white" : "bg-gray-200 text-gray-400"}`}>
                3
              </div>
              <span className="text-xs sm:text-sm">Confirmation</span>
            </div>
          </div>
        </div>
        
        {/* Content based on current step */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Shipping step */}
            {currentStep === "shipping" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            state: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            postalCode: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          country: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                  
                  <RadioGroup 
                    value={shippingMethod} 
                    onValueChange={setShippingMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label 
                        htmlFor="standard" 
                        className="flex flex-1 justify-between cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Truck className="mr-2 h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-gray-600">3-5 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {cartTotal > 50 ? "Free" : "$4.99"}
                        </span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="express" id="express" />
                      <Label
                        htmlFor="express"
                        className="flex flex-1 justify-between cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Truck className="mr-2 h-5 w-5 text-vmart-primary" />
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-gray-600">1-2 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$12.99</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/cart")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Cart
                    </Button>
                    
                    <Button type="submit">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Payment step */}
            {currentStep === "payment" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label 
                        htmlFor="credit" 
                        className="flex items-center cursor-pointer"
                      >
                        <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Credit Card</p>
                          <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label 
                        htmlFor="paypal" 
                        className="flex items-center cursor-pointer"
                      >
                        <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                          <path fill="#00457C" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 0-69.5-18.8-73.7-36.4z" />
                          <path fill="#00457C" d="M376.4 143.1c0 16.3-2.9 33.2-8.1 50-21.5 70-90.1 126.7-181.7 125.2-13.8 0-54-2.1-63.9-2.1H90.3c-8.2 0-15.6 5-17.6 13-10.8 42.2-13.2 70.3-10.4 106.3.6 5.9 5.2 10.5 11 11.1 4.1.4 7.5 3.2 8.7 7.1 0 17.1-10.1 32.7-26.5 39.7-12 5.1-25.7 5.1-37.7 0-12.5-5.3-21.5-16.4-24.4-29.9-.1-.6-.2-1.2-.3-1.9-.3-1.9-.6-3.8-.8-5.7v-.1c-5-45.8 3.8-92.1 26.3-133.4 3.6-7 7.6-9 18.5-9h79.7c5.8 0 6.9-4.4 8-7.6 3.3-10.2 7.1-38.7 8.7-48.7 2.8-17.1 11.9-20.2 36.6-20.2 23.7 0 44.7 3.9 62.4 11.1 31.1 12.8 48.2 33.5 53.7 64.1 5.1 29-2.6 59.4-26.1 79.8C221.6 279.2 172 294.1 116 289.6c-31.9-2.5-41.1 6.5-41.6 25.4v.1c-.3 12.2 6.5 22.8 17.8 27 3.6 1.4 7.4 2.1 11.4 2.1 14.2 0 28-5.1 33.6-14.5 6.9-11.4 6.1-22.5 7.2-36.1.4-5.1 3.4-9.3 8-11.8 4.3-2.2 21.3-3.9 37.2-4.8 72.9-4.1 108.9-45 114.8-84.8-.3-.9-.6-1.8-.8-2.7z" />
                        </svg>
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "credit" && (
                    <div className="space-y-4 border rounded-md p-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.cardNumber}
                          onChange={(e) =>
                            setCardInfo({
                              ...cardInfo,
                              cardNumber: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card *</Label>
                        <Input
                          id="nameOnCard"
                          placeholder="John Doe"
                          value={cardInfo.nameOnCard}
                          onChange={(e) =>
                            setCardInfo({
                              ...cardInfo,
                              nameOnCard: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) =>
                              setCardInfo({
                                ...cardInfo,
                                expiry: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) =>
                              setCardInfo({
                                ...cardInfo,
                                cvv: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Separator className="my-6" />
                  
                  {/* Billing Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-vmart-primary focus:ring-vmart-primary"
                      />
                      <Label htmlFor="sameAsShipping" className="cursor-pointer">
                        Same as shipping address
                      </Label>
                    </div>
                    
                    {!sameAsShipping && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingFullName">Full Name *</Label>
                            <Input
                              id="billingFullName"
                              value={billingAddress.fullName}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  fullName: e.target.value,
                                })
                              }
                              required={!sameAsShipping}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingPhone">Phone Number *</Label>
                            <Input
                              id="billingPhone"
                              type="tel"
                              value={billingAddress.phone}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  phone: e.target.value,
                                })
                              }
                              required={!sameAsShipping}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">Street Address *</Label>
                          <Input
                            id="billingAddress"
                            value={billingAddress.address}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                address: e.target.value,
                              })
                            }
                            required={!sameAsShipping}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingCity">City *</Label>
                            <Input
                              id="billingCity"
                              value={billingAddress.city}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  city: e.target.value,
                                })
                              }
                              required={!sameAsShipping}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingState">State/Province *</Label>
                            <Input
                              id="billingState"
                              value={billingAddress.state}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  state: e.target.value,
                                })
                              }
                              required={!sameAsShipping}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingPostalCode">Postal Code *</Label>
                            <Input
                              id="billingPostalCode"
                              value={billingAddress.postalCode}
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  postalCode: e.target.value,
                                })
                              }
                              required={!sameAsShipping}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billingCountry">Country *</Label>
                          <Input
                            id="billingCountry"
                            value={billingAddress.country}
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                country: e.target.value,
                              })
                            }
                            required={!sameAsShipping}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-md flex items-start">
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      This is a demo checkout. No actual payment will be processed.
                    </p>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shipping
                    </Button>
                    
                    <Button type="submit" disabled={loading}>
                      {loading ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Confirmation step */}
            {currentStep === "confirmation" && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been received and is now being processed.
                </p>
                
                <div className="max-w-md mx-auto mb-8 px-6 py-4 bg-gray-50 rounded-md">
                  <p className="font-medium mb-2">Order Reference: #VM82957631</p>
                  <p className="text-sm text-gray-600">
                    A confirmation email has been sent to {user?.email}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full max-w-md" 
                    onClick={handleCompleteOrder}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {/* Only show items in cart during shipping and payment steps */}
                {currentStep !== "confirmation" && (
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shippingMethod === "express" 
                        ? "$12.99" 
                        : cartTotal > 50 ? "Free" : "$4.99"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-vmart-primary">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              {currentStep === "confirmation" && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Shipping Details</h4>
                    <p className="text-sm">{shippingAddress.fullName}</p>
                    <p className="text-sm">{shippingAddress.address}</p>
                    <p className="text-sm">
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.postalCode}
                    </p>
                    <p className="text-sm">{shippingAddress.country}</p>
                    <p className="text-sm mt-2">{shippingAddress.phone}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-sm capitalize">
                      {paymentMethod === "credit" ? "Credit Card" : "PayPal"}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Delivery Method</h4>
                    <p className="text-sm">
                      {shippingMethod === "express" 
                        ? "Express Shipping (1-2 business days)" 
                        : "Standard Shipping (3-5 business days)"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
