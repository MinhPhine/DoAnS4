'use client';

import { ShoppingBag, Package, Truck, Clock, CheckCircle2, ChevronDown, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import API_URL from "@/config/api";

const STATUS_CONFIG = {
  pending:    { label: 'CHỜ XÁC NHẬN', badgeClass: 'bg-[#FFF3E0] text-[#EA580C]', dot: 'bg-[#EA580C]', filter: 'processing' },
  processing: { label: 'ĐANG XỬ LÝ',   badgeClass: 'bg-[#F1F3F4] text-[#8A9BB0]', dot: 'bg-[#8A9BB0]', filter: 'processing' },
  shipped:    { label: 'ĐANG GIAO',     badgeClass: 'bg-[#0056D2] text-white',      dot: 'bg-white',     filter: 'shipping' },
  delivered:  { label: 'ĐÃ HOÀN THÀNH',badgeClass: 'bg-[#E7F5EA] text-[#2C7A32]', dot: 'bg-[#2C7A32]', filter: 'done' },
  cancelled:  { label: 'ĐÃ HỦY',        badgeClass: 'bg-[#FEECEC] text-[#C53030]', dot: 'bg-[#C53030]', filter: 'cancelled' },
};

const FILTER_TABS = [
  { id: 'all',        label: 'Tất cả đơn hàng' },
  { id: 'processing', label: 'Đang xử lý' },
  { id: 'shipping',   label: 'Đang giao' },
  { id: 'done',       label: 'Đã hoàn thành' },
  { id: 'cancelled',  label: 'Đã hủy' },
];

export default function PurchaseHistoryPage() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${API_URL}/orders`, {
      headers: { 'x-auth-token': token }
    })
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredOrders = orders.filter(o => {
    if (activeStatus === 'all') return true;
    const cfg = STATUS_CONFIG[o.status];
    return cfg?.filter === activeStatus;
  });

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">

      <div className="mb-14">
        <h1 className="text-[40px] font-black text-[#1D1D1F] tracking-tighter mb-3 leading-none uppercase">
          Lịch sử mua hàng
        </h1>
        <p className="text-[#8A9BB0] text-[16px] font-bold max-w-3xl leading-relaxed">
          Theo dõi các đơn hàng công nghệ, linh kiện và các gói thành viên cao cấp của bạn tại The Digital Curator.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* SIDEBAR FILTER */}
        <aside className="w-full lg:w-[240px] shrink-0 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-[32px] border border-[#E8EAED] p-8 shadow-sm">
            <h4 className="text-[12px] font-black text-[#1D1D1F] uppercase tracking-[0.2em] mb-4">Trạng thái</h4>
            <div className="space-y-3">
              {FILTER_TABS.map((tab) => (
                <label
                  key={tab.id}
                  className="flex items-center gap-3.5 cursor-pointer group"
                  onClick={() => setActiveStatus(tab.id)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    activeStatus === tab.id ? 'bg-[#0056D2] border-[#0056D2]' : 'border-[#E8EAED] group-hover:border-[#0056D2]'
                  }`}>
                    {activeStatus === tab.id && <CheckCircle2 size={12} className="text-white fill-white" />}
                  </div>
                  <span className={`text-[13px] font-bold transition-colors ${
                    activeStatus === tab.id ? 'text-[#1D1D1F]' : 'text-[#8A9BB0] group-hover:text-[#1D1D1F]'
                  }`}>
                    {tab.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ORDERS LIST */}
        <div className="flex-grow space-y-6 w-full">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-[#0056D2]" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <Package size={32} className="text-gray-300" />
              </div>
              <p className="text-lg font-bold text-gray-400 mb-4">Chưa có đơn hàng nào.</p>
              <Link href="/" className="bg-[#0056D2] text-white px-8 py-3 rounded-full font-bold text-[14px] hover:bg-blue-700 transition-colors">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const createdDate = new Date(order.createdAt).toLocaleDateString('vi-VN', {
                day: 'numeric', month: 'short', year: 'numeric'
              });

              return (
                <div key={order._id} className="bg-white rounded-[32px] border border-[#E8EAED] shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-black/5 transition-all duration-300">

                  {/* ORDER HEADER */}
                  <div className="px-10 py-6 border-b border-[#F1F3F4] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#F1F3F4] rounded-lg flex items-center justify-center text-[#1D1D1F]">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest mb-0.5">Mã đơn hàng</p>
                          <p className="text-[14px] font-black text-[#1D1D1F]">#{order._id?.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest mb-0.5">Ngày đặt</p>
                        <p className="text-[14px] font-black text-[#1D1D1F]">{createdDate}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest mb-0.5">Tổng tiền</p>
                        <p className="text-[14px] font-black text-[#0056D2]">{order.totalPrice?.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                    <span className={`${cfg.badgeClass} text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>

                  {/* ORDER BODY */}
                  <div className="p-10 flex flex-col md:flex-row items-center md:items-end gap-6 justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl border border-[#E8EAED] flex items-center justify-center shrink-0">
                        <Package size={24} className="text-[#8A9BB0]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#8A9BB0] mb-1">
                          Phương thức: <span className="text-[#1D1D1F]">{order.paymentMethod || 'COD'}</span>
                        </p>
                        <p className="text-[13px] font-bold text-[#8A9BB0]">
                          Thanh toán: <span className={order.isPaid ? 'text-green-600' : 'text-[#EA580C]'}>
                            {order.isPaid ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/order/${order._id}`}
                        className="px-6 py-2.5 rounded-full text-[13px] font-bold bg-[#0056D2] text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
