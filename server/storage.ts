import { users, products, brands, categories, cartItems } from "@shared/schema";
import type { 
  User, InsertUser, 
  Product, InsertProduct,
  Brand, InsertBrand,
  Category, InsertCategory,
  CartItem, InsertCartItem
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByBrand(brand: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Brand operations
  getBrands(): Promise<Brand[]>;
  getBrandByName(name: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private brands: Map<number, Brand>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  
  private userId: number;
  private productId: number;
  private brandId: number;
  private categoryId: number;
  private cartItemId: number;
  
  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.brands = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    
    this.userId = 1;
    this.productId = 1;
    this.brandId = 1;
    this.categoryId = 1;
    this.cartItemId = 1;
    
    // Initialize with default data
    this.initializeData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, isVerified: false };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  async getProductsByBrand(brand: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.brand.toLowerCase() === brand.toLowerCase()
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isFeatured);
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isNewArrival);
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }
  
  // Brand operations
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }
  
  async getBrandByName(name: string): Promise<Brand | undefined> {
    return Array.from(this.brands.values()).find(
      brand => brand.name.toLowerCase() === name.toLowerCase()
    );
  }
  
  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = this.brandId++;
    const brand: Brand = { ...insertBrand, id };
    this.brands.set(id, brand);
    return brand;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryByName(name: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.name.toLowerCase() === name.toLowerCase()
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }
  
  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if the item already exists in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === insertItem.productId && 
             item.sessionId === insertItem.sessionId &&
             item.color === insertItem.color
    );
    
    if (existingItem) {
      // Update quantity of existing item
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + insertItem.quantity
      };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    } else {
      // Add new item
      const id = this.cartItemId++;
      const cartItem: CartItem = { ...insertItem, id };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }
  
  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = {
      ...cartItem,
      quantity: quantity
    };
    
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }
  
  async clearCart(sessionId: string): Promise<void> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
    
    for (const item of items) {
      this.cartItems.delete(item.id);
    }
  }
  
  // Initialize sample data
  private initializeData() {
    // Initialize brands
    const brands = [
      { name: "OXVA", logo: "OXVA", description: "Premium vaping devices" },
      { name: "JAX", logo: "JAX", description: "Quality e-liquids and pods" },
      { name: "LUNIX", logo: "LUNIX", description: "Innovative RGB box mods" },
      { name: "NIXX", logo: "NIXX", description: "Filter pod systems" },
      { name: "PANDA", logo: "PANDA", description: "Unique design vape devices" },
      { name: "HOTCIG", logo: "HOTCIG", description: "High-performance mods" }
    ];
    
    brands.forEach(brand => {
      const id = this.brandId++;
      this.brands.set(id, { ...brand, id });
    });
    
    // Initialize categories
    const categories = [
      { 
        name: "Pod Systems", 
        description: "Compact, portable vaping solutions", 
        icon: "tablet", 
        productCount: 42 
      },
      { 
        name: "Box Mods", 
        description: "Advanced vaping devices with customizable settings", 
        icon: "box", 
        productCount: 28 
      },
      { 
        name: "E-Liquids", 
        description: "Premium flavors for every taste", 
        icon: "droplet", 
        productCount: 56 
      },
      { 
        name: "Accessories", 
        description: "Everything you need for the perfect setup", 
        icon: "tool", 
        productCount: 35 
      }
    ];
    
    categories.forEach(category => {
      const id = this.categoryId++;
      this.categories.set(id, { ...category, id });
    });
    
    // Initialize products
    const products = [
      {
        name: "Vprime Pro",
        description: "The OXVA Vprime is a compact pod system with excellent performance and battery life, perfect for both beginners and experienced vapers.",
        price: 45000000, // 450,000 (in cents)
        brand: "OXVA",
        category: "Pod Systems",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=OXVA+Vprime"],
        colors: ["blue", "black", "pink", "green", "red", "purple", "gold", "silver", "white", "teal"],
        inStock: true,
        isNewArrival: true,
        isFeatured: true,
        rating: 45,
        reviewCount: 42,
        specifications: {
          battery: "1500mAh",
          wattage: "5-40W",
          capacity: "4.5ml"
        }
      },
      {
        name: "Ghost Rabbit",
        description: "The Joiway Ghost Rabbit features unique design and good performance in a compact package.",
        price: 38000000, // 380,000 (in cents)
        discountPrice: 42000000, // 420,000 (in cents)
        brand: "JOIWAY",
        category: "Pod Systems",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Ghost+Rabbit"],
        colors: ["blue", "pink"],
        inStock: true,
        isNewArrival: true,
        isFeatured: false,
        rating: 40,
        reviewCount: 28,
        specifications: {
          battery: "1200mAh",
          wattage: "5-25W",
          capacity: "3ml"
        }
      },
      {
        name: "Mr Pro RGB Edition",
        description: "The Lunix Mr Pro features vibrant RGB lighting and an innovative square design that stands out from the crowd.",
        price: 52000000, // 520,000 (in cents)
        brand: "LUNIX",
        category: "Pod Systems",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Lunix+Mr+Pro"],
        colors: ["red", "white", "purple", "black"],
        inStock: true,
        isNewArrival: true,
        isFeatured: false,
        rating: 43,
        reviewCount: 32,
        specifications: {
          battery: "1800mAh",
          wattage: "5-60W",
          capacity: "5ml"
        }
      },
      {
        name: "VEE 2 Limited Edition",
        description: "The Panda VEE 2 Limited Edition features creative artwork and a powerful battery for all-day vaping.",
        price: 49000000, // 490,000 (in cents)
        brand: "PANDA",
        category: "Pod Systems",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Panda+VEE+2"],
        colors: ["green", "blue", "black"],
        inStock: true,
        isNewArrival: true,
        isFeatured: false,
        rating: 42,
        reviewCount: 25,
        specifications: {
          battery: "1600mAh",
          wattage: "5-45W",
          capacity: "4ml"
        }
      },
      {
        name: "Qita Series - Mango",
        description: "A burst of flavor styled for amazing people. The JAX Qita Series Mango offers a tropical experience in every puff.",
        price: 6500000, // 65,000 (in cents)
        brand: "JAX",
        category: "E-Liquids",
        subcategory: "Fruit",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Qita+Mango"],
        colors: [],
        inStock: true,
        isNewArrival: false,
        isFeatured: true,
        rating: 45,
        reviewCount: 42,
        specifications: {
          volume: "30ml",
          nicotine: "3mg, 6mg",
          vgpg: "70/30"
        }
      },
      {
        name: "Qita Series - Jasmine Tea",
        description: "A refreshing jasmine tea flavor with subtle sweet notes. Perfect for an all-day vape.",
        price: 6500000, // 65,000 (in cents)
        brand: "JAX",
        category: "E-Liquids",
        subcategory: "Beverage",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Qita+Jasmine"],
        colors: [],
        inStock: true,
        isNewArrival: false,
        isFeatured: true,
        rating: 44,
        reviewCount: 38,
        specifications: {
          volume: "30ml",
          nicotine: "3mg, 6mg",
          vgpg: "70/30"
        }
      },
      {
        name: "Qita Series - Matcha Tea",
        description: "A perfect blend of authentic matcha tea flavor with light sweetness for a satisfying vape experience.",
        price: 6500000, // 65,000 (in cents)
        brand: "JAX",
        category: "E-Liquids",
        subcategory: "Beverage",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Qita+Matcha"],
        colors: [],
        inStock: true,
        isNewArrival: false,
        isFeatured: true,
        rating: 43,
        reviewCount: 35,
        specifications: {
          volume: "30ml",
          nicotine: "3mg, 6mg",
          vgpg: "70/30"
        }
      },
      {
        name: "R234 Pro Electrical Mod",
        description: "The HOTCIG R234 Pro is a high-performance box mod with customizable settings and excellent build quality.",
        price: 75000000, // 750,000 (in cents)
        discountPrice: 85000000, // 850,000 (in cents)
        brand: "HOTCIG",
        category: "Box Mods",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=HOTCIG+R234"],
        colors: ["black", "silver"],
        inStock: true,
        isNewArrival: false,
        isFeatured: true,
        rating: 50,
        reviewCount: 28,
        specifications: {
          battery: "Dual 18650",
          wattage: "5-234W",
          temperature: "200°F-600°F"
        }
      },
      {
        name: "Filter Plus Pod Kit",
        description: "The NIXX Filter Plus pod kit offers a clean, filtered vaping experience in a sleek, portable design.",
        price: 32500000, // 325,000 (in cents)
        brand: "NIXX",
        category: "Pod Systems",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=NIXX+Filter"],
        colors: ["blue", "green", "orange", "black", "silver"],
        inStock: true,
        isNewArrival: false,
        isFeatured: true,
        rating: 40,
        reviewCount: 16,
        specifications: {
          battery: "850mAh",
          wattage: "Auto",
          capacity: "2ml"
        }
      },
      {
        name: "RTA 24mm Tank",
        description: "The Nitrous RTA 24mm tank offers superior flavor and vapor production for enthusiasts.",
        price: 32000000, // 320,000 (in cents)
        brand: "NITROUS",
        category: "Accessories",
        subcategory: "Tanks",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=Nitrous+RTA"],
        colors: ["silver", "black", "gunmetal"],
        inStock: true,
        isNewArrival: false,
        isFeatured: true,
        rating: 35,
        reviewCount: 12,
        specifications: {
          diameter: "24mm",
          capacity: "5ml",
          deck: "Single/Dual Coil"
        }
      },
      {
        name: "Oneo Pod Kit",
        description: "The OXVA Oneo is a sleek pod kit with multiple color options and excellent flavor production.",
        price: 29000000, // 290,000 (in cents)
        brand: "OXVA",
        category: "Pod Systems",
        images: ["https://via.placeholder.com/400x400/121212/ffffff?text=OXVA+Oneo"],
        colors: ["green", "orange", "red", "blue", "black", "pink", "grey", "teal", "purple", "brown"],
        inStock: true,
        isNewArrival: false,
        isFeatured: false,
        rating: 42,
        reviewCount: 22,
        specifications: {
          battery: "900mAh",
          wattage: "Auto",
          capacity: "2ml"
        }
      }
    ];
    
    products.forEach(product => {
      const id = this.productId++;
      this.products.set(id, { 
        ...product, 
        id,
        createdAt: new Date()
      });
    });
  }
}

export const storage = new MemStorage();
