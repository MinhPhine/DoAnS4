'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Bookmark, Settings, LogOut, LayoutDashboard, ShoppingBag, ShoppingCart, Shield, Package } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const { showSuccess } = useToast();
  const { getCartCount } = useCart();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-[#E8EAED] sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-3 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="text-primary font-black text-xl tracking-tighter shrink-0">
          The Digital Curator
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-[#444]">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === '/' ? 'text-primary font-bold' : 'hover:text-primary'}`}
          >
            Trang chủ
          </Link>
          <Link 
            href="/forum" 
            className={`transition-colors ${pathname === '/forum' ? 'text-primary font-bold' : 'hover:text-primary'}`}
          >
            Diễn đàn
          </Link>
          <Link 
            href="/comparison" 
            className={`transition-colors ${pathname === '/comparison' ? 'text-primary font-bold' : 'hover:text-primary'}`}
          >
            So Sánh
          </Link>
          <Link 
            href="/review-detail" 
            className={`transition-colors ${pathname === '/review-detail' ? 'text-primary font-bold' : 'hover:text-primary'}`}
          >
            Đánh giá
          </Link>
          <Link 
            href="/videos" 
            className={`transition-colors ${pathname === '/videos' ? 'text-primary font-bold' : 'hover:text-primary'}`}
          >
            Video
          </Link>
          <Link 
            href="/blog" 
            className={`transition-colors ${pathname === '/blog' ? 'text-primary font-bold' : 'hover:text-primary'}`}
          >
            Blog
          </Link>
        </nav>

        {/* Search Bar */}
        <div
          className={`hidden xl:flex items-center bg-[#F1F3F4] rounded-full px-4 py-2.5 flex-1 max-w-xs border transition-all ${
            searchFocused ? 'border-primary/40 bg-white shadow-sm' : 'border-transparent'
          }`}
        >
          <Search size={14} className="text-[#888] mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent text-[13px] w-full focus:outline-none text-[#333] placeholder:text-[#888]"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <div className="flex-1 hidden xl:block" />

        {/* Auth Actions */}
        {!loading && (
          user ? (
            /* Logged-in state */
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/creator/editor"
                className="bg-primary text-white px-5 py-2 rounded-full text-[13px] font-bold hover:bg-primary-hover transition-all shadow-md shadow-blue-500/20"
              >
                Đăng bài
              </Link>
              <Link 
                href="/notifications"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0F2F5] transition-colors text-[#555]"
              >
                <Bell size={20} />
              </Link>
              <Link 
                href="/cart"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0F2F5] transition-colors text-[#555] relative"
              >
                <ShoppingCart size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              

              {/* User Dropdown */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 p-1 rounded-full border transition-all ${showUserMenu ? 'border-[#0056D2] bg-[#E8F0FE]' : 'border-[#E8EAED] hover:bg-[#F0F2F5]'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold text-sm">
                    {user.fullname.charAt(0)}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-[#E8EAED] py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                    <div className="px-5 py-3 border-b border-[#F0F2F5] mb-1">
                      <p className="text-[14px] font-black text-[#1D1D1F]">{user.fullname}</p>
                      <p className="text-[11px] font-bold text-[#8A9BB0]">Thành viên Bạch Kim</p>
                    </div>
                    
                    <Link 
                      href="/creator/dashboard" 
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#F0F2F5] text-[13px] font-bold text-[#0056D2] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard size={16} /> Creator Studio
                    </Link>
                    {user.role === 'admin' && (
                      <Link 
                        href="/admin/dashboard" 
                        className="flex items-center gap-3 px-5 py-2.5 hover:bg-purple-50 text-[13px] font-bold text-purple-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Shield size={16} /> Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      href={`/profile/${user.fullname.toLowerCase().replace(/\s+/g, '')}`} 
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#F0F2F5] text-[13px] font-semibold text-[#444] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={16} className="text-[#8A9BB0]" /> Trang cá nhân
                    </Link>
                    <Link 
                      href="/dashboard/orders" 
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#F0F2F5] text-[13px] font-semibold text-[#444] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Package size={16} className="text-[#8A9BB0]" /> Lịch sử đặt hàng
                    </Link>
                    <Link 
                      href="/dashboard/saved" 
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#F0F2F5] text-[13px] font-semibold text-[#444] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bookmark size={16} className="text-[#8A9BB0]" /> Đã lưu
                    </Link>
                    <Link 
                      href="/dashboard/settings" 
                      className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#F0F2F5] text-[13px] font-semibold text-[#444] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} className="text-[#8A9BB0]" /> Cài đặt tài khoản
                    </Link>
                    
                    <div className="border-t border-[#E8EAED] my-1"></div>
                    
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                        showSuccess('Đăng xuất thành công!');
                      }} 
                      className="w-full text-left flex items-center gap-3 px-5 py-2.5 hover:bg-red-50 text-[13px] font-bold text-red-500 transition-colors"
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Guest state */
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/login"
                className="text-primary hover:bg-primary/10 px-5 py-2 rounded-full text-[13px] font-bold transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="bg-primary text-white px-5 py-2 rounded-full text-[13px] font-bold hover:bg-primary-hover transition-all shadow-md shadow-blue-500/20"
              >
                Đăng ký
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  );
}
