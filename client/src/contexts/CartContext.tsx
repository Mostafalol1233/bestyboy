import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { Voucher } from "@shared/schema";

export interface CartItem {
  voucher: Voucher;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  playerId: string;
  server: string;
  email: string;
  paymentMethod: string;
  status: "pending" | "paid" | "delivered" | "cancelled";
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (voucher: Voucher) => void;
  removeItem: (voucherId: number) => void;
  updateQuantity: (voucherId: number, quantity: number) => void;
  clearCart: () => void;
  createOrder: (details: Omit<Order, "id" | "createdAt" | "items" | "total" | "status">) => Order;
}

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "bestyboy_cart";
const ORDERS_KEY = "bestyboy_orders";

function readCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function getStoredOrders(): Order[] {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  const persist = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  };

  const addItem = (voucher: Voucher) => {
    const existing = items.find((item) => item.voucher.id === voucher.id);
    if (existing) {
      persist(items.map((item) => item.voucher.id === voucher.id ? { ...item, quantity: item.quantity + 1 } : item));
      return;
    }
    persist([...items, { voucher, quantity: 1 }]);
  };

  const removeItem = (voucherId: number) => persist(items.filter((item) => item.voucher.id !== voucherId));

  const updateQuantity = (voucherId: number, quantity: number) => {
    if (quantity <= 0) return removeItem(voucherId);
    persist(items.map((item) => item.voucher.id === voucherId ? { ...item, quantity } : item));
  };

  const clearCart = () => persist([]);

  const subtotal = items.reduce((sum, item) => sum + (item.voucher.price || 0) * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = (details: Omit<Order, "id" | "createdAt" | "items" | "total" | "status">) => {
    const order: Order = {
      ...details,
      id: `BB-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items: [...items],
      total: subtotal,
      status: "pending",
    };
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...getStoredOrders()]));
    clearCart();
    return order;
  };

  const value = useMemo(() => ({ items, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart, createOrder }), [items, totalItems, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export function getOrders(): Order[] {
  return getStoredOrders();
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
