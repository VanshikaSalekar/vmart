import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "seller" | "customer";
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// Mock user data
const MOCK_USERS = [
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: "seller1",
    name: "Seller User",
    email: "seller@example.com",
    password: "seller123",
    role: "seller"
  },
  {
    id: "customer1",
    name: "Demo Customer",
    email: "customer@example.com",
    password: "customer123",
    role: "customer"
  }
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("vmart-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication logic
    const matchedUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem("vmart-user", JSON.stringify(userWithoutPassword));
      toast.success("Login successful!");
      setLoading(false);
      return true;
    }
    
    toast.error("Invalid email or password");
    setLoading(false);
    return false;
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Email already registered");
      setLoading(false);
      return false;
    }
    
    // In a real app, we would make an API call to register the user
    // For this demo, we'll just simulate success and register as customer
    const newUser = {
      id: `user${Date.now()}`,
      name,
      email,
      role: "customer" as const
    };
    
    setUser(newUser);
    localStorage.setItem("vmart-user", JSON.stringify(newUser));
    toast.success("Registration successful!");
    setLoading(false);
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("vmart-user");
    localStorage.removeItem("vmart-wishlist"); // Clear wishlist on logout
    toast.info("Logged out successfully");
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};