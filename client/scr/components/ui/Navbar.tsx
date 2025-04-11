import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Heart, 
  ShoppingCart as CartIcon, 
  Menu, 
  X, 
  MapPin, 
  Phone 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import ShoppingCart from "./ShoppingCart";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };
  
  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800">
      {/* Top Bar */}
      <div className="bg-gray-900 py-2 text-xs border-b border-gray-800">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0 text-gray-400">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-emerald-500" />
              <span>Store Locations: Bireueun, Banda Aceh</span>
            </div>
            <div className="hidden md:flex items-center">
              <Phone className="w-3 h-3 mr-1 text-emerald-500" />
              <span>+62 812 3456 7890</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-white font-medium">🔞 21+ Only</span>
            <div className="border-l border-gray-700 h-4 mx-1"></div>
            <select className="bg-transparent text-gray-400 border-0 cursor-pointer outline-none">
              <option value="en">EN</option>
              <option value="id">ID</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-poppins">
              Bireueun<span className="text-emerald-500">Vape</span>
            </span>
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Search products, brands..." 
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 text-gray-400"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-5">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-white hover:text-emerald-500"
              onClick={toggleMobileSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-emerald-500 relative"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-emerald-500 relative"
              onClick={toggleCart}
            >
              <CartIcon className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-white hover:text-emerald-500"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Search Bar - Mobile */}
        {mobileSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products, brands..."
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 text-gray-400"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Category Navigation */}
        <nav className="hidden md:flex mt-4 space-x-6 overflow-x-auto pb-1">
          <Link href="/" className={`whitespace-nowrap text-sm ${location === '/' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            All Products
          </Link>
          <Link href="/category/pod-systems" className={`whitespace-nowrap text-sm ${location === '/category/pod-systems' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            Pod Systems
          </Link>
          <Link href="/category/box-mods" className={`whitespace-nowrap text-sm ${location === '/category/box-mods' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            Box Mods
          </Link>
          <Link href="/category/e-liquids" className={`whitespace-nowrap text-sm ${location === '/category/e-liquids' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            E-Liquids
          </Link>
          <Link href="/category/accessories" className={`whitespace-nowrap text-sm ${location === '/category/accessories' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            Accessories
          </Link>
          <Link href="/brands" className={`whitespace-nowrap text-sm ${location === '/brands' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            Brands
          </Link>
          <Link href="/new-arrivals" className={`whitespace-nowrap text-sm ${location === '/new-arrivals' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            New Arrivals
          </Link>
          <Link href="/best-sellers" className={`whitespace-nowrap text-sm ${location === '/best-sellers' ? 'text-white font-medium' : 'text-gray-400'} hover:text-emerald-500`}>
            Best Sellers
          </Link>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-gray-900 border-t border-gray-800 md:hidden">
          <div className="py-3 px-4">
            <nav className="space-y-3">
              <Link href="/" className={`block py-2 ${location === '/' ? 'text-white font-medium' : 'text-gray-400'}`}>
                All Products
              </Link>
              <Link href="/category/pod-systems" className={`block py-2 ${location === '/category/pod-systems' ? 'text-white font-medium' : 'text-gray-400'}`}>
                Pod Systems
              </Link>
              <Link href="/category/box-mods" className={`block py-2 ${location === '/category/box-mods' ? 'text-white font-medium' : 'text-gray-400'}`}>
                Box Mods
              </Link>
              <Link href="/category/e-liquids" className={`block py-2 ${location === '/category/e-liquids' ? 'text-white font-medium' : 'text-gray-400'}`}>
                E-Liquids
              </Link>
              <Link href="/category/accessories" className={`block py-2 ${location === '/category/accessories' ? 'text-white font-medium' : 'text-gray-400'}`}>
                Accessories
              </Link>
              <Link href="/brands" className={`block py-2 ${location === '/brands' ? 'text-white font-medium' : 'text-gray-400'}`}>
                Brands
              </Link>
              <Link href="/new-arrivals" className={`block py-2 ${location === '/new-arrivals' ? 'text-white font-medium' : 'text-gray-400'}`}>
                New Arrivals
              </Link>
              <Link href="/best-sellers" className={`block py-2 ${location === '/best-sellers' ? 'text-white font-medium' : 'text-gray-400'}`}>
                Best Sellers
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Shopping Cart Drawer */}
      {cartOpen && <ShoppingCart onClose={() => setCartOpen(false)} />}
    </header>
  );
}
