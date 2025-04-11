import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, Brand, Category } from "@shared/schema";

interface ProductsContextType {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  brands: Brand[];
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  
  // Fetch all products
  const { 
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError
  } = useQuery({
    queryKey: ["/api/products"],
  });
  
  // Fetch brands
  const { 
    data: brandsData,
    isLoading: isBrandsLoading,
    error: brandsError
  } = useQuery({
    queryKey: ["/api/brands"],
  });
  
  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useQuery({
    queryKey: ["/api/categories"],
  });
  
  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
      setFeaturedProducts(productsData.filter((product: Product) => product.isFeatured));
      setNewArrivals(productsData.filter((product: Product) => product.isNewArrival));
    }
  }, [productsData]);
  
  const isLoading = isProductsLoading || isBrandsLoading || isCategoriesLoading;
  const error = productsError || brandsError || categoriesError;
  
  return (
    <ProductsContext.Provider
      value={{
        products,
        featuredProducts,
        newArrivals,
        brands: brandsData || [],
        categories: categoriesData || [],
        isLoading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
