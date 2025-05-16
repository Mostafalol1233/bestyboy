import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/AuthContext";
import { VoucherProvider } from "@/contexts/VoucherContext";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <VoucherProvider>
        <App />
        <Analytics />
      </VoucherProvider>
    </AuthProvider>
  </QueryClientProvider>
);
