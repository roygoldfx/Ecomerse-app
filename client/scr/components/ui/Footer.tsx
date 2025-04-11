import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white font-poppins">
                Bireueun<span className="text-emerald-500">Vape</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Your premier destination for premium vaping products in Aceh, Indonesia. 
              We offer a wide range of devices, e-liquids, and accessories from top brands.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-emerald-500">Home</Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 hover:text-emerald-500">Brands</Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-400 hover:text-emerald-500">New Arrivals</Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-gray-400 hover:text-emerald-500">Best Sellers</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-emerald-500">About Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-white font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/pod-systems" className="text-gray-400 hover:text-emerald-500">Pod Systems</Link>
              </li>
              <li>
                <Link href="/category/box-mods" className="text-gray-400 hover:text-emerald-500">Box Mods</Link>
              </li>
              <li>
                <Link href="/category/e-liquids" className="text-gray-400 hover:text-emerald-500">E-Liquids</Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-400 hover:text-emerald-500">Accessories</Link>
              </li>
              <li>
                <Link href="/category/starter-kits" className="text-gray-400 hover:text-emerald-500">Starter Kits</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Jl. Banda Aceh-Medan Km. 215, Bireueun, Aceh</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@bireuenvape.com</span>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Mon-Sat: 10:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2023 BireueunVape. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 text-sm">Shipping Policy</a>
            </div>
          </div>
        </div>
        
        {/* Age Restriction Notice */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">WARNING: This product contains nicotine. Nicotine is an addictive chemical.</p>
          <p className="text-gray-500 text-xs mt-1">Products on this website are intended for adults 21+ only.</p>
        </div>
      </div>
    </footer>
  );
}
