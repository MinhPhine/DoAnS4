"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Bookmark, History, Settings, LogOut, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Tổng quan", href: "/dashboard", icon: LayoutGrid },
    { name: "Cài đặt", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
      {/* User Info Card */}
      <div className="bg-white rounded-[32px] p-8 border border-[#E8EAED] shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 bg-[#0061FF] text-white rounded-[20px] flex items-center justify-center font-black text-2xl shrink-0 shadow-lg shadow-blue-500/20">
          {user?.fullname?.charAt(0) || "T"}
        </div>
        <div>
          <h3 className="font-black text-[#1D1D1F] text-[16px] leading-tight mb-1">
            {user?.fullname || "Tào Gia Hân"}
          </h3>
          <p className="text-[11px] text-[#8A9BB0] font-black uppercase tracking-widest">Thành viên Bạch Kim</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[13px] font-bold transition-all ${
                isActive
                  ? "bg-white text-primary shadow-sm"
                  : "text-[#5e6b7d] hover:bg-white/50 hover:text-primary"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Separator */}
        <div className="my-2 border-t border-[#E8EAED] mx-4" />

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-3.5 rounded-2xl text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all text-left"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </nav>
    </div>
  );
}
