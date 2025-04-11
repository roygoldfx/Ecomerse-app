import { Link } from "wouter";
import { Category } from "@shared/schema";
import { ArrowRight, Box, Droplet, Tablet, Drill } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  variant?: "small" | "large";
}

export default function CategoryCard({ category, variant = "small" }: CategoryCardProps) {
  const getCategoryIcon = (iconName: string | undefined) => {
    switch (iconName?.toLowerCase()) {
      case "tablet":
        return <Tablet className="h-6 w-6 text-emerald-500" />;
      case "box":
        return <Box className="h-6 w-6 text-purple-500" />;
      case "droplet":
        return <Droplet className="h-6 w-6 text-pink-500" />;
      case "tool":
        return <Drill className="h-6 w-6 text-blue-500" />;
      default:
        return <Box className="h-6 w-6 text-emerald-500" />;
    }
  };
  
  // Small variant for grid display
  if (variant === "small") {
    return (
      <Link href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}>
        <div className="bg-gray-800 rounded-xl p-6 text-center transition duration-300 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500 cursor-pointer">
          <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
            {getCategoryIcon(category.icon)}
          </div>
          <h3 className="text-white font-medium mb-1">{category.name}</h3>
          <p className="text-gray-400 text-sm">{category.productCount} Products</p>
        </div>
      </Link>
    );
  }
  
  // Large variant for banner/feature
  return (
    <div className="relative h-56 rounded-xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-900/20"></div>
      <div className="absolute inset-0 flex items-center p-6">
        <div>
          <h3 className="text-white text-xl font-bold font-poppins">{category.name}</h3>
          <p className="text-gray-200 text-sm mb-3 max-w-[180px]">{category.description}</p>
          <Link href={`/category/${category.name.toLowerCase().replace(/ /g, "-")}`}>
            <a className="text-white hover:text-emerald-400 text-sm font-medium flex items-center">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
      <img 
        src={`https://via.placeholder.com/600x300/121212/ffffff?text=${category.name}`} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
