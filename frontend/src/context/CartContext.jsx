"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Lấy giỏ hàng từ Backend
  const fetchCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/carts", {
        headers: { "x-auth-token": token }
      });
      if (res.ok) {
        const data = await res.json();
        // data.items = [{ product: {...}, qty: 1 }, ...]
        if (data && data.items) {
          setCart(data.items);
        }
      }
    } catch (err) {
      console.error("Lỗi fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user, fetchCart]);

  // Đồng bộ giỏ hàng lên Backend
  async function syncCart(newItems) {
    if (!token) return;
    try {
      await fetch("http://localhost:5000/api/carts", {
        method: "POST",
        headers: { "x-auth-token": token, "Content-Type": "application/json" },
        body: JSON.stringify({ items: newItems.map(item => ({ product: item.product._id || item.product, qty: item.qty })) })
      });
    } catch (err) {
      console.error("Lỗi sync cart:", err);
    }
  }

  function addToCart(product) {
    setCart(prev => {
      const productId = product._id;
      const existing = prev.find(item => {
        const id = item.product?._id || item.product;
        return id === productId;
      });

      let newCart;
      if (existing) {
        newCart = prev.map(item => {
          const id = item.product?._id || item.product;
          return id === productId ? { ...item, qty: item.qty + 1 } : item;
        });
      } else {
        newCart = [...prev, { product, qty: 1 }];
      }
      syncCart(newCart);
      return newCart;
    });
  }

  function removeFromCart(productId) {
    setCart(prev => {
      const newCart = prev.filter(item => {
        const id = item.product?._id || item.product;
        return id !== productId;
      });
      syncCart(newCart);
      return newCart;
    });
  }

  function updateQuantity(productId, qty) {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => {
      const newCart = prev.map(item => {
        const id = item.product?._id || item.product;
        return id === productId ? { ...item, qty } : item;
      });
      syncCart(newCart);
      return newCart;
    });
  }

  function clearCart() {
    setCart([]);
    syncCart([]);
  }

  function getCartTotal() {
    return cart.reduce((total, item) => {
      const p = item.product;
      if (!p || typeof p === "string") return total;
      const price = p.discountPrice || p.price || 0;
      return total + price * item.qty;
    }, 0);
  }

  function getCartCount() {
    return cart.reduce((count, item) => count + (item.qty || 0), 0);
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
