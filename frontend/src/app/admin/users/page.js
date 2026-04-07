"use client";

import { useState, useEffect } from "react";
import { Users, Search, Trash2, Shield, ChevronDown } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const headers = { "x-auth-token": token, "Content-Type": "application/json" };

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", { headers: { "x-auth-token": token } });
      if (res.ok) setUsers(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUser(id) {
    if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: "DELETE", headers });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRoleChange(id, newRole) {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(users.map(u => u._id === id ? updated : u));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = users.filter(u =>
    u.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1D1D1F] mb-1">Quản lý Người dùng</h1>
          <p className="text-[#8A9BB0] text-[14px]">Tổng cộng {users.length} người dùng trong hệ thống</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E8EAED]">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl pl-11 pr-4 py-3 text-[13px] font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="bg-[#F8F9FA] border-b border-[#E8EAED]">
            <tr className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest">
              <th className="px-6 py-4">Người dùng</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F2F5]">
            {loading ? (
              [1,2,3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                  <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-40"></div></td>
                  <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                  <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                  <td className="px-6 py-5"></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#8A9BB0]">Không tìm thấy người dùng nào</td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {u.fullname?.charAt(0)}
                      </div>
                      <span className="text-[13px] font-bold text-[#1D1D1F]">{u.fullname}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#5e6b7d]">{u.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border-0 outline-none cursor-pointer ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                        u.role === 'creator' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="creator">Creator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-[#8A9BB0]">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Xóa người dùng"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-4 border-t border-[#E8EAED] text-[12px] text-[#8A9BB0] font-medium">
          Hiện {filtered.length} / {users.length} người dùng
        </div>
      </div>
    </div>
  );
}
