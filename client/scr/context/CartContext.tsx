import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem, Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

interface CartContextType {
  cartItems: CartItemWithProduct[];
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>;
  updateCartItem: (id: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const sessionId = 'guest-session'; // In a real app, this would be a unique session ID

  // Fetch cart items on initial load
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const res = await apiRequest("GET", `/api/cart/${sessionId}`);
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        toast({
          title: "Error",
          description: "Failed to load your cart items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [toast]);

  const addToCart = async (item: Omit<CartItem, "id">) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/cart", item);
      const newItem = await res.json();
      
      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex(
        cartItem => cartItem.productId === newItem.productId && cartItem.color === newItem.color
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = newItem;
        setCartItems(updatedCartItems);
      } else {
        // Add new item
        setCartItems([...cartItems, newItem]);
      }
      
      toast({
        title: "Added to cart",
        description: `${newItem.product?.name} has been added to your cart`,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("PUT", `/api/cart/${id}`, { quantity });
      const updatedItem = await res.json();
      
      const updatedCartItems = cartItems.map(item => 
        item.id === id ? updatedItem : item
      );
      
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    setIsLoading(true);
    try {
      await apiRequest("DELETE", `/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
      
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await apiRequest("DELETE", `/api/cart/session/${sessionId}`);
      setCartItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
