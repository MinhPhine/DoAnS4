'use client';

import { MapPin, CreditCard, ChevronRight, FileText, CheckCircle2, Truck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import API_URL from "@/config/api";

const BASE_URL = API_URL.replace('/api', '');

const STATUS_MAP = {
  pending:    { label: 'Chờ xác nhận', color: '#EA580C' },
  processing: { label: 'Đang xử lý',   color: '#7C3AED' },
  shipped:    { label: 'Đang giao hàng', color: '#0056D2' },
  delivered:  { label: 'Đã giao hàng',  color: '#2C7A32' },
  cancelled:  { label: 'Đã hủy',        color: '#DC2626' },
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !token) return;

    async function loadOrder() {
      try {
        // 1. Lấy thông tin đơn hàng
        const orderRes = await fetch(`${API_URL}/orders`, {
          headers: { 'x-auth-token': token }
        });
        const orders = await orderRes.json();
        const found = Array.isArray(orders) ? orders.find(o => o._id === id) : null;
        setOrder(found || null);

        // 2. Lấy chi tiết sản phẩm trong đơn
        const itemsRes = await fetch(`${API_URL}/order-items/${id}`, {
          headers: { 'x-auth-token': token }
        });
        const itemsData = await itemsRes.json();
        setItems(Array.isArray(itemsData) ? itemsData : []);

        // 3. Lấy địa chỉ giao hàng
        if (found?.shippingAddress) {
          const addrRes = await fetch(`${API_URL}/addresses`, {
            headers: { 'x-auth-token': token }
          });
          const addrList = await addrRes.json();
          const matchedAddr = Array.isArray(addrList)
            ? addrList.find(a => a._id === found.shippingAddress || a._id === found.shippingAddress?._id)
            : null;
          setAddress(matchedAddr || null);
        }
      } catch (err) {
        console.error('Lỗi tải đơn hàng:', err);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#0056D2]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[#8A9BB0] font-bold text-lg">Không tìm thấy đơn hàng.</p>
        <Link href="/dashboard/orders" className="text-[#0056D2] font-black hover:underline">
          Xem tất cả đơn hàng
        </Link>
      </div>
    );
  }

  const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.pending;
  const createdDate = new Date(order.createdAt).toLocaleDateString('vi-VN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans antialiased">
      <div className="container-custom pt-8">

        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#8A9BB0] mb-8">
          <Link href="/" className="hover:text-[#1D1D1F]">Thị trường</Link>
          <ChevronRight size={14} className="opacity-30" />
          <Link href="/dashboard/orders" className="hover:text-[#1D1D1F]">Đơn hàng của tôi</Link>
          <ChevronRight size={14} className="opacity-30" />
          <span className="text-[#1D1D1F]">Chi tiết đơn hàng</span>
        </div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-[36px] font-black text-[#1D1D1F] tracking-tighter mb-2 leading-none">
              Đơn hàng <span className="text-[#0056D2]">#{id?.slice(-8).toUpperCase()}</span>
            </h1>
            <p className="text-[#8A9BB0] text-[14px] font-bold">Đặt ngày {createdDate}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: statusInfo.color }}>
              {statusInfo.label}
            </span>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F1F3F4] text-[#1D1D1F] font-black text-[13px] rounded-xl hover:bg-gray-200 transition-all">
              <FileText size={16} className="opacity-60" /> In hóa đơn
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* LEFT: Tracking + Products */}
          <div className="flex-grow lg:max-w-[760px] space-y-10">

            {/* TRACKING */}
            <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED]">
              <h3 className="text-[20px] font-black text-[#1D1D1F] mb-8 flex items-center gap-3">
                <Truck className="text-[#0056D2]" size={24} strokeWidth={2.5} /> Lộ trình vận chuyển
              </h3>
              <div className="relative pl-10 space-y-8">
                <div className="absolute left-5 top-2 bottom-4 w-0.5 bg-[#E8EAED]" />
                <div className="relative">
                  <div className="absolute -left-[28px] w-6 h-6 rounded-full ring-4 ring-[#E8F0FE] flex items-center justify-center text-white z-10"
                    style={{ backgroundColor: statusInfo.color }}>
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <div className="bg-[#F8F9FA] rounded-[20px] p-6 border border-[#E8F0FE]">
                    <h4 className="text-[15px] font-black mb-1" style={{ color: statusInfo.color }}>{statusInfo.label}</h4>
                    <p className="text-[13px] font-bold text-[#8A9BB0]">
                      {order.isDelivered ? `Đã giao lúc ${new Date(order.deliveredAt).toLocaleDateString('vi-VN')}` : 'Dự kiến 3–5 ngày làm việc'}
                    </p>
                  </div>
                </div>
                <div className="relative opacity-50">
                  <div className="absolute -left-[28px] w-6 h-6 bg-[#E8EAED] rounded-full z-10 flex items-center justify-center">
                    <CheckCircle2 size={14} strokeWidth={3} className="text-[#8A9BB0]" />
                  </div>
                  <p className="text-[14px] font-black text-[#1D1D1F]">Đã xác nhận đơn hàng</p>
                  <p className="text-[13px] font-bold text-[#8A9BB0]">{createdDate}</p>
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-[40px] border border-[#E8EAED] overflow-hidden">
              <div className="px-10 py-7 border-b border-[#F1F3F4] flex justify-between items-center">
                <h3 className="text-[18px] font-black text-[#1D1D1F]">Sản phẩm đã mua ({items.length})</h3>
              </div>
              {items.length === 0 ? (
                <p className="p-10 text-[#8A9BB0] font-bold">Không có thông tin sản phẩm.</p>
              ) : (
                <div className="divide-y divide-[#F1F3F4]">
                  {items.map((item) => {
                    const imgSrc = item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`;
                    return (
                      <div key={item._id} className="p-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-[#F8F9FA] rounded-[20px] border border-[#E8EAED] p-4 shrink-0 overflow-hidden">
                          <img src={imgSrc} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-[17px] font-black text-[#1D1D1F] mb-1">{item.name}</h4>
                          <p className="text-[13px] font-bold text-[#8A9BB0]">Số lượng: {item.qty}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[20px] font-black text-[#1D1D1F]">
                            {(item.price * item.qty).toLocaleString('vi-VN')}đ
                          </div>
                          <p className="text-[11px] font-bold text-[#8A9BB0]">{item.price?.toLocaleString('vi-VN')}đ / cái</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:w-[400px] space-y-8">

            {/* SHIPPING ADDRESS */}
            <div className="bg-[#F8F9FA] rounded-[40px] p-10 border border-[#E8EAED]">
              <h4 className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-8">ĐỊA CHỈ NHẬN HÀNG</h4>
              {address ? (
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0056D2] shadow-sm shrink-0">
                    <MapPin size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-[#1D1D1F] mb-1">{address.fullName}</h3>
                    <p className="text-[14px] font-bold text-[#8A9BB0] mb-3">{address.phone}</p>
                    <p className="text-[14px] font-bold text-[#1D1D1F]/70 leading-relaxed">
                      {address.address}<br />{address.city}, {address.country}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[#8A9BB0] font-bold text-[14px]">Không có thông tin địa chỉ.</p>
              )}
            </div>

            {/* PAYMENT */}
            <div className="bg-[#F8F9FA] rounded-[40px] p-10 border border-[#E8EAED]">
              <h4 className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-8">PHƯƠNG THỨC THANH TOÁN</h4>
              <div className="flex items-center gap-4">
                <CreditCard size={28} className="text-[#0056D2]" />
                <div>
                  <p className="text-[16px] font-black text-[#1D1D1F]">{order.paymentMethod || 'COD'}</p>
                  <p className="text-[12px] font-bold text-[#8A9BB0]">
                    {order.isPaid ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán'}
                  </p>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED]">
              <h3 className="text-[18px] font-black text-[#1D1D1F] mb-8">Tổng kết đơn hàng</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-[#8A9BB0]">Tạm tính ({items.length} món)</span>
                  <span>{order.totalPrice?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-[#8A9BB0]">Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#F1F3F4]">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] font-black text-[#1D1D1F]">Tổng cộng</span>
                  <span className="text-[28px] font-black text-[#0056D2] tracking-tighter leading-none">
                    {order.totalPrice?.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
