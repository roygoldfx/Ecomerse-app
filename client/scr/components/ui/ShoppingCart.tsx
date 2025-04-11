import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/product-utils";
import { Link } from "wouter";

interface ShoppingCartProps {
  onClose: () => void;
}

export default function ShoppingCart({ onClose }: ShoppingCartProps) {
  const { cartItems, updateCartItem, removeFromCart, clearCart } = useCart();
  
  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateCartItem(id, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateCartItem(id, item.quantity - 1);
    } else if (item) {
      removeFromCart(id);
    }
  };
  
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product?.discountPrice || item.product?.price || 0;
    return total + (price * item.quantity);
  }, 0);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-gray-900 h-full overflow-auto">
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <ShoppingBag className="h-16 w-16 text-gray-600 mb-4" />
            <p className="text-gray-400 mb-4">Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-800">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color}`} className="p-4">
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product?.images?.[0] || 'https://via.placeholder.com/80'} 
                        alt={item.product?.name || 'Product'} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-white font-medium">{item.product?.name}</h3>
                          <p className="text-gray-400 text-sm">{item.product?.brand}</p>
                          {item.color && (
                            <div className="flex items-center mt-1">
                              <span className="text-gray-400 text-xs mr-2">Color:</span>
                              <span 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-700 rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400"
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-white">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400"
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          {item.product?.discountPrice && (
                            <div className="flex flex-col items-end">
                              <span className="text-white font-semibold">
                                {formatPrice(item.product.discountPrice * item.quantity)}
                              </span>
                              <span className="text-gray-400 text-xs line-through">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          )}
                          {!item.product?.discountPrice && item.product?.price && (
                            <span className="text-white font-semibold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Shipping</span>
                <span className="text-gray-300">Calculated at checkout</span>
              </div>
              
              <Separator className="my-4 bg-gray-800" />
              
              <Button className="w-full mb-3" size="lg">
                Checkout
              </Button>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Continue Shopping
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
