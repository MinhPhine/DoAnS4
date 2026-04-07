'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-[13px] font-bold text-[#8A9BB0] mb-8 overflow-x-auto no-scrollbar py-1">
      <Link 
        href="/" 
        className="flex items-center gap-1 hover:text-primary transition-colors shrink-0"
      >
        <Home size={14} />
        <span>Trang chủ</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 shrink-0">
          <ChevronRight size={14} className="text-[#E8EAED]" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1D1D1F]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
