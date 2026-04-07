'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function FloatingCart() {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <Link 
      href="/cart"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#2D2D2D] text-white rounded-full shadow-2xl hover:bg-black hover:scale-110 transition-all active:scale-95 group"
    >
      <ShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#0056D2] text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-blue-600 transition-colors">
          {count}
        </span>
      )}
    </Link>
  );
}
