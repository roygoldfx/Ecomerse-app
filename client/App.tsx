import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Product from "@/pages/product";
import Category from "@/pages/category";
import Cart from "@/pages/cart";
import Brands from "@/pages/brands";
import { useEffect, useState } from "react";
import { isAgeVerified, setAgeVerified } from "./lib/age-verification";
import AgeVerificationModal from "./components/AgeVerificationModal";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/category/:category" component={Category} />
      <Route path="/brands" component={Brands} />
      <Route path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showAgeVerification, setShowAgeVerification] = useState(!isAgeVerified());

  const handleAgeVerified = () => {
    setAgeVerified();
    setShowAgeVerification(false);
  };

  const handleAgeDenied = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showAgeVerification && (
        <AgeVerificationModal 
          onConfirm={handleAgeVerified} 
          onDeny={handleAgeDenied} 
        />
      )}
      
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
