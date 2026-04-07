'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCart from "@/components/layout/FloatingCart";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  // Define routes where Header and Footer should be hidden
  const hideLayout = ['/login', '/register', '/forgot-password'].includes(pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideLayout && (
        <>
          <FloatingCart />
          <Footer />
        </>
      )}
    </>
  );
}
