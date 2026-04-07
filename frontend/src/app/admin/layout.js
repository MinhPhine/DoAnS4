"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import {
  Shield, Users, ShoppingBag, FileText, BarChart3,
  ShoppingCart, MessageSquare, Star, Video, Package,
  Settings, LogOut, Home, ChevronRight
} from "lucide-react";

const menuItems = [
  { icon: BarChart3,      label: "Tổng quan",       href: "/admin/dashboard", tab: 'overview' },
  { icon: ShoppingCart,   label: "Đơn hàng",         href: "/admin/dashboard", tab: 'orders' },
  { icon: ShoppingBag,    label: "Sản phẩm",         href: "/admin/products" },
  { icon: FileText,       label: "Bài viết",         href: "/admin/articles" },
  { icon: MessageSquare,  label: "Bình luận",        href: "/admin/dashboard", tab: 'comments' },
  { icon: Star,           label: "Đánh giá SP",      href: "/admin/dashboard", tab: 'reviews' },
  { icon: Video,          label: "Video",             href: "/admin/dashboard", tab: 'videos' },
  { icon: Users,          label: "Người dùng",       href: "/admin/users" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F1117]">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex min-h-screen bg-[#F0F2F5]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0F1117] text-white flex flex-col fixed h-full z-50">
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="font-bold text-[14px] tracking-tight">Admin Panel</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Control Center</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-3 mb-3">Menu chính</p>
          {menuItems.map((item) => {
            const href = item.tab ? `${item.href}?tab=${item.tab}` : item.href;
            const isActive = item.tab
              ? pathname === item.href && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('tab') === item.tab
              : pathname === item.href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500/15 text-blue-400 font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-blue-400" : ""} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/[0.06] space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all">
            <Home size={18} />
            <span>Về trang chủ</span>
          </Link>
          <button
            onClick={() => { logout(); router.push("/login"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {user.fullname?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-white truncate">{user.fullname}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px]">
        {children}
      </main>
    </div>
  );
}
