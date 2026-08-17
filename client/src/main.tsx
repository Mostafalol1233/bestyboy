import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { VoucherProvider } from "@/contexts/VoucherContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <LanguageProvider>
      <VoucherProvider>
        <CartProvider>
          <App />
          <Analytics />
        </CartProvider>
      </VoucherProvider>
    </LanguageProvider>
  </AuthProvider>
);
