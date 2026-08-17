import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/AuthContext";
import { VoucherProvider } from "@/contexts/VoucherContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);
