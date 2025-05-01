
import React from "react";
import { Link } from "react-router-dom";
import { 
  TruckIcon, 
  ShieldCheck, 
  CreditCard, 
  Headphones 
} from "lucide-react";

const PromoSection: React.FC = () => {
  const features = [
    {
      icon: <TruckIcon className="h-10 w-10" />,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Headphones className="h-10 w-10" />,
      title: "24/7 Support",
      description: "We're here to help",
    },
  ];

  return (
    <section className="py-12">
      <div className="vmart-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 text-vmart-primary">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
