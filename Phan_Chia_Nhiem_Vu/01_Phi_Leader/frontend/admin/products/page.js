"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Search, Trash2, Star, Package } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const headers = { "x-auth-token": token, "Content-Type": "application/json" };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:5000/api/admin/products", { headers: { "x-auth-token": token } });
      if (res.ok) setProducts(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, { method: "DELETE", headers });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const categories = [...new Set(products.map(p => p.category))];
  
  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const catLabels = { mobile: "Điện thoại", laptop: "Laptop", accessory: "Phụ kiện", ai: "AI & Robot", gaming: "Gaming" };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1D1D1F] mb-1">Quản lý Sản phẩm</h1>
          <p className="text-[#8A9BB0] text-[14px]">Tổng cộng {products.length} sản phẩm trong hệ thống</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E8EAED] flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl pl-11 pr-4 py-3 text-[13px] font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterCat("all")}
              className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${filterCat === "all" ? "bg-blue-500 text-white shadow-md" : "bg-[#F0F2F5] text-[#5e6b7d] hover:bg-[#E8EAED]"}`}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${filterCat === cat ? "bg-blue-500 text-white shadow-md" : "bg-[#F0F2F5] text-[#5e6b7d] hover:bg-[#E8EAED]"}`}
              >
                {catLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="border border-[#E8EAED] rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-3"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-100 rounded w-1/3 mt-4"></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[#8A9BB0] font-bold">Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className="p-6">
            <table className="w-full text-left">
              <thead className="border-b border-[#E8EAED]">
                <tr className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest">
                  <th className="pb-3">Sản phẩm</th>
                  <th className="pb-3">Danh mục</th>
                  <th className="pb-3">Giá gốc</th>
                  <th className="pb-3">Giá khuyến mãi</th>
                  <th className="pb-3">Tồn kho</th>
                  <th className="pb-3">Đánh giá</th>
                  <th className="pb-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {filtered.map(p => (
                  <tr key={p._id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                          <ShoppingBag size={16} className="text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-[#1D1D1F] truncate max-w-[200px]">{p.name}</p>
                          <p className="text-[11px] text-[#8A9BB0]">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-lg bg-[#F0F2F5] text-[11px] font-bold text-[#5e6b7d]">
                        {catLabels[p.category] || p.category}
                      </span>
                    </td>
                    <td className="py-4 text-[13px] font-bold text-[#1D1D1F]">
                      {p.price?.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-4 text-[13px] font-bold text-emerald-500">
                      {p.discountPrice ? `${p.discountPrice.toLocaleString('vi-VN')}đ` : '—'}
                    </td>
                    <td className="py-4">
                      <span className={`text-[13px] font-bold ${p.stock > 20 ? 'text-emerald-500' : p.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-[12px] font-bold text-[#1D1D1F]">{p.rating}</span>
                        <span className="text-[10px] text-[#8A9BB0]">({p.numReviews})</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-[#E8EAED] text-[12px] text-[#8A9BB0] font-medium">
          Hiện {filtered.length} / {products.length} sản phẩm
        </div>
      </div>
    </div>
  );
}
