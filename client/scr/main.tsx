import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";

createRoot(document.getElementById("root")!).render(
  <ProductsProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductsProvider>
);
