import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, StarHalf } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { formatPrice } from "@/lib/utils/product-utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: 1,
      color: selectedColor,
      sessionId: 'guest-session', // In a real app, this would be a unique session ID
    });
  };
  
  return (
    <Card className="bg-gray-800 border-gray-700 rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        {product.isNewArrival && (
          <Badge className="absolute top-2 left-2 bg-pink-600 hover:bg-pink-700 text-white">
            NEW
          </Badge>
        )}
        {!product.isNewArrival && product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 text-white">
            FEATURED
          </Badge>
        )}
        
        <Link href={`/product/${product.id}`}>
          <div className="h-48 bg-gray-900 cursor-pointer">
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/400x400/121212/ffffff?text=No+Image'} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-gray-300 hover:text-pink-500 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="block text-gray-400 text-xs">{product.brand}</span>
            <Link href={`/product/${product.id}`}>
              <h3 className="text-white font-medium hover:text-emerald-500 cursor-pointer">{product.name}</h3>
            </Link>
          </div>
          <Badge 
            variant="outline" 
            className={`${product.inStock ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        
        <div className="flex items-center mt-3 mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-white font-bold">{formatPrice(product.discountPrice)}</span>
              <span className="text-gray-400 line-through text-xs ml-2">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-white font-bold">{formatPrice(product.price)}</span>
          )}
        </div>
        
        {product.rating > 0 && (
          <div className="flex mb-4 items-center">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(Math.floor(product.rating / 10))].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
              {product.rating % 10 >= 5 && (
                <StarHalf className="h-3 w-3 fill-current" />
              )}
            </div>
            <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
          </div>
        )}
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex space-x-2 mb-4">
            {product.colors.slice(0, 4).map((color, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full border ${selectedColor === color ? 'border-white' : 'border-gray-700'}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color} color`}
              ></button>
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-400">{`+${product.colors.length - 4}`}</span>
            )}
          </div>
        )}
        
        <Button 
          className="w-full"
          variant={product.inStock ? "default" : "outline"}
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
}
