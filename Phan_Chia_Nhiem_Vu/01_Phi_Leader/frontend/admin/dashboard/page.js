"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Users, ShoppingBag, FileText, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalArticles: 0, totalOrders: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchData() {
      try {
        const headers = { "x-auth-token": token };
        const [statsRes, usersRes, productsRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/stats", { headers }),
          fetch("http://localhost:5000/api/admin/users", { headers }),
          fetch("http://localhost:5000/api/admin/products", { headers }),
        ]);
        
        if (statsRes.ok) setStats(await statsRes.json());
        if (usersRes.ok) {
          const users = await usersRes.json();
          setRecentUsers(users.slice(0, 5));
        }
        if (productsRes.ok) {
          const products = await productsRes.json();
          setRecentProducts(products.slice(0, 5));
        }
      } catch (err) {
        console.error("Lỗi tải dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { icon: Users, label: "Người dùng", value: stats.totalUsers, color: "from-blue-500 to-blue-600", change: "+12%", up: true },
    { icon: ShoppingBag, label: "Sản phẩm", value: stats.totalProducts, color: "from-emerald-500 to-emerald-600", change: "+8%", up: true },
    { icon: FileText, label: "Bài viết", value: stats.totalArticles, color: "from-purple-500 to-purple-600", change: "+5%", up: true },
    { icon: ShoppingCart, label: "Đơn hàng", value: stats.totalOrders, color: "from-amber-500 to-amber-600", change: "0%", up: false },
  ];

  if (loading) {
    return (
      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#1D1D1F] mb-2">
          Xin chào, {user?.fullname} 👋
        </h1>
        <p className="text-[#8A9BB0] text-[14px]">
          Đây là tổng quan hệ thống The Digital Curator hôm nay.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[#E8EAED] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <card.icon size={20} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${card.up ? 'text-emerald-500' : 'text-gray-400'}`}>
                {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.change}
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#8A9BB0] uppercase tracking-widest mb-1">{card.label}</p>
            <p className="text-3xl font-black text-[#1D1D1F]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E8EAED] flex items-center justify-between">
            <h3 className="font-black text-[15px] text-[#1D1D1F]">Người dùng gần đây</h3>
            <a href="/admin/users" className="text-[11px] font-bold text-blue-500 hover:underline uppercase tracking-widest">Xem tất cả</a>
          </div>
          <div className="divide-y divide-[#F0F2F5]">
            {recentUsers.map((u) => (
              <div key={u._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {u.fullname?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#1D1D1F]">{u.fullname}</p>
                    <p className="text-[11px] text-[#8A9BB0]">{u.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 
                  u.role === 'creator' ? 'bg-blue-100 text-blue-600' : 
                  'bg-gray-100 text-gray-600'
                }`}>
                  {u.role}
                </span>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="px-6 py-8 text-center text-[#8A9BB0] text-sm">Chưa có người dùng nào</div>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E8EAED] flex items-center justify-between">
            <h3 className="font-black text-[15px] text-[#1D1D1F]">Sản phẩm gần đây</h3>
            <a href="/admin/products" className="text-[11px] font-bold text-blue-500 hover:underline uppercase tracking-widest">Xem tất cả</a>
          </div>
          <div className="divide-y divide-[#F0F2F5]">
            {recentProducts.map((p) => (
              <div key={p._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                    <ShoppingBag size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#1D1D1F] line-clamp-1">{p.name}</p>
                    <p className="text-[11px] text-[#8A9BB0]">{p.category} • {p.brand}</p>
                  </div>
                </div>
                <span className="text-[13px] font-black text-emerald-500">
                  {p.price?.toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
            {recentProducts.length === 0 && (
              <div className="px-6 py-8 text-center text-[#8A9BB0] text-sm">Chưa có sản phẩm nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
