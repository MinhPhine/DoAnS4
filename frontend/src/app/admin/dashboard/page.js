"use client";

import { useState, useEffect, useCallback } from "react";
import API_URL from "@/config/api";
import { useAuth } from "@/context/AuthContext";
import {
  Users, ShoppingBag, FileText, ShoppingCart, ArrowUpRight, ArrowDownRight,
  Package, CheckCircle2, Truck, Clock, XCircle, Loader2, Eye, Trash2,
  MessageSquare, Star, Video, LayoutDashboard, ChevronDown, Shield, Activity
} from "lucide-react";
import Link from "next/link";

// ---- Helpers ----
const STATUS_ORDER = {
  pending:    { label: 'Chờ xác nhận', color: 'bg-orange-100 text-orange-600',   icon: Clock },
  processing: { label: 'Đang xử lý',   color: 'bg-gray-100 text-gray-500',       icon: Package },
  shipped:    { label: 'Đang giao',    color: 'bg-blue-100 text-blue-600',       icon: Truck },
  delivered:  { label: 'Đã giao',      color: 'bg-emerald-100 text-emerald-600', icon: CheckCircle2 },
  cancelled:  { label: 'Đã hủy',       color: 'bg-red-100 text-red-500',         icon: XCircle },
};
const ALL_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const TABS = [
  { id: 'overview',  label: 'Tổng quan',          icon: LayoutDashboard },
  { id: 'orders',    label: 'Đơn hàng',            icon: ShoppingCart },
  { id: 'products',  label: 'Sản phẩm',            icon: ShoppingBag },
  { id: 'articles',  label: 'Bài viết',            icon: FileText },
  { id: 'comments',  label: 'Bình luận',           icon: MessageSquare },
  { id: 'reviews',   label: 'Đánh giá SP',         icon: Star },
  { id: 'videos',    label: 'Video',                icon: Video },
  { id: 'users',     label: 'Người dùng',          icon: Users },
  { id: 'logs',      label: 'Nhật ký HT',          icon: Activity },
];

function Badge({ className, children }) {
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${className}`}>{children}</span>;
}

function Btn({ onClick, disabled, className, children, title }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all disabled:opacity-40 ${className}`}>
      {children}
    </button>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab]           = useState('overview');
  const [stats, setStats]       = useState({});
  const [data, setData]         = useState({});       // { orders:[], products:[], ... }
  const [loading, setLoading]   = useState(true);
  const [busyId, setBusyId]     = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const H = { 'x-auth-token': token, 'Content-Type': 'application/json' };

  // ---- Fetch stats + all datasets ----
  const reload = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const endpoints = ['stats','users','orders','products','articles','comments','reviews','videos','system-logs'];
      const results = await Promise.all(
        endpoints.map(e => fetch(`${API_URL}/admin/${e}`, { headers: H }).then(r => r.json()))
      );
      setStats(results[0]);
      setData({
        users:    results[1],
        orders:   results[2],
        products: results[3],
        articles: results[4],
        comments: results[5],
        reviews:  results[6],
        videos:   results[7],
        logs:     results[8],
      });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { reload(); }, [reload]);

  // ---- Generic delete ----
  async function del(endpoint, id, key) {
    setBusyId(id);
    await fetch(`${API_URL}/admin/${endpoint}/${id}`, { method: 'DELETE', headers: H });
    setData(prev => ({ ...prev, [key]: prev[key].filter(x => x._id !== id) }));
    setStats(prev => ({ ...prev, [`total${key.charAt(0).toUpperCase()+key.slice(1)}`]: (prev[`total${key.charAt(0).toUpperCase()+key.slice(1)}`]||1)-1 }));
    setBusyId(null);
  }

  // ---- Update order status ----
  async function updateOrder(id, status) {
    setBusyId(id);
    const r = await fetch(`${API_URL}/admin/orders/${id}/status`, { method:'PUT', headers:H, body:JSON.stringify({status}) });
    const updated = await r.json();
    setData(prev => ({ ...prev, orders: prev.orders.map(o => o._id===id ? {...o, status: updated.status} : o) }));
    setBusyId(null);
  }

  // ---- Update user role ----
  async function updateRole(id, role) {
    setBusyId(id);
    await fetch(`${API_URL}/admin/users/${id}/role`, { method:'PUT', headers:H, body:JSON.stringify({role}) });
    setData(prev => ({ ...prev, users: prev.users.map(u => u._id===id ? {...u, role} : u) }));
    setBusyId(null);
  }

  // ---- Toggle article status ----
  async function toggleArticle(id, status) {
    setBusyId(id);
    await fetch(`${API_URL}/admin/articles/${id}/status`, { method:'PUT', headers:H, body:JSON.stringify({status}) });
    setData(prev => ({ ...prev, articles: prev.articles.map(a => a._id===id ? {...a, status} : a) }));
    setBusyId(null);
  }

  const statCards = [
    { icon: Users,        label:'Người dùng',  value: stats.totalUsers,    color:'from-blue-500 to-blue-600' },
    { icon: ShoppingBag,  label:'Sản phẩm',    value: stats.totalProducts, color:'from-emerald-500 to-emerald-600' },
    { icon: FileText,     label:'Bài viết',    value: stats.totalArticles, color:'from-purple-500 to-purple-600' },
    { icon: ShoppingCart, label:'Đơn hàng',    value: stats.totalOrders,   color:'from-amber-500 to-amber-600' },
    { icon: MessageSquare,label:'Bình luận',   value: stats.totalComments, color:'from-pink-500 to-pink-600' },
    { icon: Star,         label:'Đánh giá',    value: stats.totalReviews,  color:'from-yellow-500 to-yellow-600' },
    { icon: Video,        label:'Video',        value: stats.totalVideos,   color:'from-red-500 to-red-600' },
  ];

  if (loading) return (
    <div className="p-10 flex items-center justify-center min-h-[500px]">
      <Loader2 size={40} className="animate-spin text-[#0056D2]" />
    </div>
  );

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-[#1D1D1F] mb-1">Xin chào, {user?.fullname} 👋</h1>
          <p className="text-[#8A9BB0] text-[14px]">Bảng điều khiển quản trị – The Digital Curator</p>
        </div>
        <button onClick={reload} className="flex items-center gap-2 px-4 py-2 bg-[#F1F3F4] hover:bg-gray-200 rounded-xl text-[13px] font-bold text-[#1D1D1F] transition-all">
          🔄 Làm mới
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
        {statCards.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8EAED] shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
            onClick={() => c.label !== 'Đơn hàng' ? setTab(['overview','overview','overview','overview','comments','reviews','videos'][i]) : setTab('orders')}>
            <div className={`w-10 h-10 bg-gradient-to-br ${c.color} rounded-xl flex items-center justify-center shadow-md mx-auto mb-3`}>
              <c.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-black text-[#1D1D1F]">{c.value ?? 0}</p>
            <p className="text-[10px] font-bold text-[#8A9BB0] mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 flex-wrap bg-[#F1F3F4] rounded-2xl p-1.5 mb-6">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${
              tab === t.id ? 'bg-white text-[#0056D2] shadow-sm' : 'text-[#8A9BB0] hover:text-[#1D1D1F]'
            }`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* ========== OVERVIEW ========== */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-[14px] text-[#1D1D1F]">Đơn hàng mới nhất</h3>
              <button onClick={()=>setTab('orders')} className="text-[11px] text-blue-500 font-bold hover:underline">Xem tất cả</button>
            </div>
            {(data.orders||[]).slice(0,6).map(o => {
              const cfg = STATUS_ORDER[o.status]||STATUS_ORDER.pending;
              return (
                <div key={o._id} className="px-5 py-3 flex justify-between items-center hover:bg-gray-50 border-b border-[#F0F2F5] last:border-0">
                  <div>
                    <p className="text-[12px] font-black text-[#0056D2]">#{o._id?.slice(-8).toUpperCase()}</p>
                    <p className="text-[11px] text-[#8A9BB0]">{o.user?.fullname}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-black text-emerald-500">{o.totalPrice?.toLocaleString('vi-VN')}đ</p>
                    <Badge className={cfg.color}>{cfg.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Comments */}
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-[14px] text-[#1D1D1F]">Bình luận gần đây</h3>
              <button onClick={()=>setTab('comments')} className="text-[11px] text-blue-500 font-bold hover:underline">Xem tất cả</button>
            </div>
            {(data.comments||[]).slice(0,6).map(c => (
              <div key={c._id} className="px-5 py-3 flex justify-between items-center hover:bg-gray-50 border-b border-[#F0F2F5] last:border-0">
                <div className="flex-grow mr-4">
                  <p className="text-[12px] font-bold text-[#1D1D1F] line-clamp-1">{c.content}</p>
                  <p className="text-[11px] text-[#8A9BB0]">{c.user?.fullname} • {c.article?.title?.slice(0,30)}...</p>
                </div>
                <Btn onClick={() => del('comments', c._id, 'comments')} disabled={busyId===c._id}
                  className="bg-red-50 text-red-500 hover:bg-red-100" title="Xóa">
                  <Trash2 size={12} />
                </Btn>
              </div>
            ))}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-[14px] text-[#1D1D1F]">Đánh giá sản phẩm gần đây</h3>
              <button onClick={()=>setTab('reviews')} className="text-[11px] text-blue-500 font-bold hover:underline">Xem tất cả</button>
            </div>
            {(data.reviews||[]).slice(0,5).map(r => (
              <div key={r._id} className="px-5 py-3 flex justify-between items-center hover:bg-gray-50 border-b border-[#F0F2F5] last:border-0">
                <div className="flex-grow mr-4">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />)}
                    <span className="text-[10px] text-[#8A9BB0] ml-1">{r.rating}/5</span>
                  </div>
                  <p className="text-[12px] font-bold text-[#1D1D1F] line-clamp-1">{r.comment}</p>
                  <p className="text-[11px] text-[#8A9BB0]">{r.user?.fullname} • {r.product?.name?.slice(0,25)}...</p>
                </div>
                <Btn onClick={() => del('reviews', r._id, 'reviews')} disabled={busyId===r._id}
                  className="bg-red-50 text-red-500 hover:bg-red-100"><Trash2 size={12} /></Btn>
              </div>
            ))}
          </div>

          {/* Users */}
          <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-[14px] text-[#1D1D1F]">Người dùng gần đây</h3>
              <button onClick={()=>setTab('users')} className="text-[11px] text-blue-500 font-bold hover:underline">Xem tất cả</button>
            </div>
            {(data.users||[]).slice(0,6).map(u => (
              <div key={u._id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 border-b border-[#F0F2F5] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                    {u.fullname?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#1D1D1F]">{u.fullname}</p>
                    <p className="text-[10px] text-[#8A9BB0]">{u.email}</p>
                  </div>
                </div>
                <Badge className={u.role==='admin'?'bg-purple-100 text-purple-600':u.role==='creator'?'bg-blue-100 text-blue-600':'bg-gray-100 text-gray-500'}>
                  {u.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== ORDERS ========== */}
      {tab === 'orders' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="font-black text-[17px] text-[#1D1D1F]">📦 Quản lý đơn hàng ({(data.orders||[]).length})</h3>
            <Badge className="bg-orange-100 text-orange-600">
              {(data.orders||[]).filter(o=>o.status==='pending').length} chờ xử lý
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b">
                <tr>{['Mã đơn','Khách hàng','Tổng tiền','Thanh toán','Trạng thái','Ngày','Thao tác'].map(h=>(
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.orders||[]).map(o => {
                  const cfg = STATUS_ORDER[o.status]||STATUS_ORDER.pending;
                  return (
                    <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-[12px] font-black text-[#0056D2]">#{o._id?.slice(-8).toUpperCase()}</td>
                      <td className="px-5 py-3"><p className="text-[12px] font-bold">{o.user?.fullname}</p><p className="text-[10px] text-[#8A9BB0]">{o.user?.email}</p></td>
                      <td className="px-5 py-3 text-[12px] font-black text-emerald-500">{o.totalPrice?.toLocaleString('vi-VN')}đ</td>
                      <td className="px-5 py-3"><Badge className={o.isPaid?'bg-emerald-100 text-emerald-600':'bg-orange-100 text-orange-500'}>{o.isPaid?'Đã trả':'Chưa trả'}</Badge><p className="text-[10px] text-[#8A9BB0] mt-0.5">{o.paymentMethod}</p></td>
                      <td className="px-5 py-3"><Badge className={cfg.color}>{cfg.label}</Badge></td>
                      <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/order/${o._id}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#E8F0FE] text-[#0056D2] hover:bg-blue-100 transition-colors"
                            title="Xem chi tiết">
                            <Eye size={13}/>
                          </Link>
                          <div className="relative">
                            <select
                              value={o.status}
                              onChange={e => updateOrder(o._id, e.target.value)}
                              disabled={busyId === o._id}
                              className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-[#E8EAED] bg-white text-[11px] font-bold text-[#1D1D1F] focus:outline-none focus:border-[#0056D2] cursor-pointer disabled:opacity-50 transition-all hover:border-[#0056D2]"
                            >
                              {ALL_STATUSES.map(s => (
                                <option key={s} value={s}>{STATUS_ORDER[s]?.label}</option>
                              ))}
                            </select>
                            {busyId === o._id
                              ? <Loader2 size={12} className="animate-spin absolute right-2 top-1/2 -translate-y-1/2 text-[#0056D2] pointer-events-none"/>
                              : <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A9BB0] pointer-events-none"/>
                            }
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========== PRODUCTS ========== */}
      {tab === 'products' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="font-black text-[17px]">🛍️ Quản lý sản phẩm ({(data.products||[]).length})</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b"><tr>{['Tên SP','Hãng','Danh mục','Giá','Tồn kho','Rating','Xóa'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
              ))}</tr></thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.products||[]).map(p => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-[12px] font-bold text-[#1D1D1F] max-w-[200px]"><p className="line-clamp-2">{p.name}</p></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{p.brand}</td>
                    <td className="px-5 py-3"><Badge className="bg-blue-50 text-blue-600">{p.category}</Badge></td>
                    <td className="px-5 py-3 text-[12px] font-black text-emerald-500">{p.price?.toLocaleString('vi-VN')}đ</td>
                    <td className="px-5 py-3 text-[12px] font-bold">{p.stock}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-yellow-400 fill-yellow-400"/><span className="text-[11px] font-bold">{p.rating?.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Btn onClick={()=>del('products',p._id,'products')} disabled={busyId===p._id}
                        className="bg-red-50 text-red-500 hover:bg-red-100">
                        {busyId===p._id?<Loader2 size={12} className="animate-spin"/>:<Trash2 size={12}/>}
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========== ARTICLES ========== */}
      {tab === 'articles' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="font-black text-[17px]">📰 Quản lý bài viết ({(data.articles||[]).length})</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b"><tr>{['Tiêu đề','Tác giả','Lượt xem','Trạng thái','Ngày','Thao tác'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
              ))}</tr></thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.articles||[]).map(a => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-[12px] font-bold text-[#1D1D1F] max-w-[240px]"><p className="line-clamp-2">{a.title}</p></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{a.author?.fullname}</td>
                    <td className="px-5 py-3 text-[11px] font-bold">{a.views?.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <Badge className={a.status==='published'?'bg-emerald-100 text-emerald-600':a.status==='draft'?'bg-gray-100 text-gray-500':'bg-red-100 text-red-500'}>
                        {a.status==='published'?'Đã đăng':a.status==='draft'?'Nháp':'Ẩn'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{new Date(a.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {a.status !== 'published' && (
                          <Btn onClick={()=>toggleArticle(a._id,'published')} disabled={busyId===a._id}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-[10px]">Đăng</Btn>
                        )}
                        {a.status === 'published' && (
                          <Btn onClick={()=>toggleArticle(a._id,'hidden')} disabled={busyId===a._id}
                            className="bg-gray-100 text-gray-500 hover:bg-gray-200 text-[10px]">Ẩn</Btn>
                        )}
                        <Btn onClick={()=>del('articles',a._id,'articles')} disabled={busyId===a._id}
                          className="bg-red-50 text-red-500 hover:bg-red-100">
                          {busyId===a._id?<Loader2 size={12} className="animate-spin"/>:<Trash2 size={12}/>}
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========== COMMENTS ========== */}
      {tab === 'comments' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="font-black text-[17px]">💬 Quản lý bình luận ({(data.comments||[]).length})</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b"><tr>{['Nội dung','Người dùng','Bài viết','Ngày','Xóa'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
              ))}</tr></thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.comments||[]).map(c => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-[12px] text-[#1D1D1F] max-w-[280px]"><p className="line-clamp-2">{c.content}</p></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{c.user?.fullname}</td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0] max-w-[180px]"><p className="line-clamp-1">{c.article?.title}</p></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{new Date(c.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-3">
                      <Btn onClick={()=>del('comments',c._id,'comments')} disabled={busyId===c._id}
                        className="bg-red-50 text-red-500 hover:bg-red-100">
                        {busyId===c._id?<Loader2 size={12} className="animate-spin"/>:<Trash2 size={12}/>}
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========== REVIEWS ========== */}
      {tab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="font-black text-[17px]">⭐ Quản lý đánh giá sản phẩm ({(data.reviews||[]).length})</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b"><tr>{['Đánh giá','Sao','Người dùng','Sản phẩm','Ngày','Xóa'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
              ))}</tr></thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.reviews||[]).map(r => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-[12px] text-[#1D1D1F] max-w-[230px]"><p className="line-clamp-2">{r.comment}</p></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_,i)=><Star key={i} size={11} className={i<r.rating?'text-yellow-400 fill-yellow-400':'text-gray-200 fill-gray-200'}/>)}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{r.user?.fullname}</td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0] max-w-[160px]"><p className="line-clamp-1">{r.product?.name}</p></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{new Date(r.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-3">
                      <Btn onClick={()=>del('reviews',r._id,'reviews')} disabled={busyId===r._id}
                        className="bg-red-50 text-red-500 hover:bg-red-100">
                        {busyId===r._id?<Loader2 size={12} className="animate-spin"/>:<Trash2 size={12}/>}
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========== VIDEOS ========== */}
      {tab === 'videos' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="font-black text-[17px]">🎬 Quản lý video ({(data.videos||[]).length})</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b"><tr>{['Tiêu đề','Tác giả','Lượt xem','Danh mục','Ngày','Xóa'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
              ))}</tr></thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.videos||[]).map(v => (
                  <tr key={v._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-[12px] font-bold text-[#1D1D1F] max-w-[230px]"><p className="line-clamp-2">{v.title}</p></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{v.author?.fullname}</td>
                    <td className="px-5 py-3 text-[11px] font-bold">{v.views?.toLocaleString()}</td>
                    <td className="px-5 py-3"><Badge className="bg-red-50 text-red-500">{v.category}</Badge></td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{new Date(v.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-3">
                      <Btn onClick={()=>del('videos',v._id,'videos')} disabled={busyId===v._id}
                        className="bg-red-50 text-red-500 hover:bg-red-100">
                        {busyId===v._id?<Loader2 size={12} className="animate-spin"/>:<Trash2 size={12}/>}
                      </Btn>
                    </td>
                  </tr>
                ))}
                {(data.videos||[]).length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8A9BB0] text-sm">Chưa có video nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========== USERS ========== */}
      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="font-black text-[17px]">👥 Quản lý người dùng ({(data.users||[]).length})</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b"><tr>{['Tên','Email','Role','Ngày tạo','Thao tác'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
              ))}</tr></thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.users||[]).map(u => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                          {u.fullname?.charAt(0)}
                        </div>
                        <span className="text-[12px] font-bold text-[#1D1D1F]">{u.fullname}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{u.email}</td>
                    <td className="px-5 py-3">
                      <select value={u.role}
                        onChange={e => updateRole(u._id, e.target.value)}
                        disabled={busyId === u._id}
                        className="text-[11px] font-bold border border-[#E8EAED] rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-[#0056D2] cursor-pointer">
                        <option value="user">user</option>
                        <option value="creator">creator</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-3">
                      <Btn onClick={()=>del('users',u._id,'users')} disabled={busyId===u._id || u.role==='admin'}
                        title={u.role==='admin'?'Không thể xóa Admin':'Xóa user'}
                        className={`${u.role==='admin'?'opacity-30 cursor-not-allowed':'bg-red-50 text-red-500 hover:bg-red-100'}`}>
                        {busyId===u._id?<Loader2 size={12} className="animate-spin"/>:<Trash2 size={12}/>}
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ========== SYSTEM LOGS ========== */}
      {tab === 'logs' && (
        <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="font-black text-[17px] flex items-center gap-2">
              <Activity size={18} className="text-[#0056D2]" />
              Nhật ký hệ thống ({(data.logs||[]).length})
            </h3>
            <button onClick={reload} className="text-[11px] text-blue-500 font-bold hover:underline">🔄 Làm mới</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b">
                <tr>{['Thời gian','Hành động','Module','Chi tiết','Admin','IP'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black text-[#8A9BB0] uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F5]">
                {(data.logs||[]).map(log => {
                  const actionColors = {
                    DELETE_PRODUCT: 'bg-red-100 text-red-600',
                    DELETE_USER:    'bg-red-100 text-red-600',
                    DELETE_COMMENT: 'bg-red-100 text-red-600',
                    DELETE_REVIEW:  'bg-red-100 text-red-600',
                    DELETE_ARTICLE: 'bg-red-100 text-red-600',
                    DELETE_VIDEO:   'bg-red-100 text-red-600',
                    UPDATE_ORDER_STATUS:   'bg-blue-100 text-blue-600',
                    UPDATE_ARTICLE_STATUS: 'bg-purple-100 text-purple-600',
                    UPDATE_PRODUCT:        'bg-amber-100 text-amber-600',
                    UPDATE_USER_ROLE:      'bg-orange-100 text-orange-600',
                    LOGIN:                 'bg-emerald-100 text-emerald-600',
                  };
                  const color = actionColors[log.action] || 'bg-gray-100 text-gray-600';
                  return (
                    <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-[11px] text-[#8A9BB0] whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${color}`}>
                          {log.action?.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <Badge className="bg-[#E8F0FE] text-[#0056D2]">{log.module}</Badge>
                      </td>
                      <td className="px-5 py-3 text-[11px] text-[#1D1D1F] max-w-[300px]">
                        <p className="line-clamp-2">{log.details}</p>
                      </td>
                      <td className="px-5 py-3 text-[11px] text-[#8A9BB0]">
                        {log.user?.fullname || 'System'}
                      </td>
                      <td className="px-5 py-3 text-[10px] font-mono text-[#8A9BB0]">
                        {log.ipAddress}
                      </td>
                    </tr>
                  );
                })}
                {(data.logs||[]).length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8A9BB0] text-sm">Chưa có log nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

