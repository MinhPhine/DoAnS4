'use client';
import API_URL from "@/config/api";

import { MapPin, Truck, ChevronRight, CheckCircle2, RotateCcw, Edit2, Clock, ShieldCheck, ArrowRight, Plus, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const BASE_URL = API_URL.replace('/api', '');

export default function PaymentCODPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingAddr, setLoadingAddr] = useState(true);
  const [saving, setSaving] = useState(false);
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({
    fullName: '', phone: '', address: '', city: '', country: 'Vietnam'
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Load địa chỉ từ DB
  useEffect(() => {
    if (!token) { setLoadingAddr(false); return; }
    fetch(`${API_URL}/addresses`, {
      headers: { 'x-auth-token': token }
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAddresses(data);
          setSelectedAddress(data.find(a => a.isDefault) || data[0]);
        } else {
          setShowForm(true);
        }
      })
      .catch(() => setShowForm(true))
      .finally(() => setLoadingAddr(false));
  }, [token]);

  // Lưu địa chỉ mới vào DB
  async function handleSaveAddress(e) {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      alert('Vui lòng điền đầy đủ thông tin!'); return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, isDefault: addresses.length === 0 })
      });
      const newAddr = await res.json();
      setAddresses(prev => [...prev, newAddr]);
      setSelectedAddress(newAddr);
      setShowForm(false);
      setForm({ fullName: '', phone: '', address: '', city: '', country: 'Vietnam' });
    } catch {
      alert('Không thể lưu địa chỉ, vui lòng thử lại!');
    } finally {
      setSaving(false);
    }
  }

  // Đặt hàng thật
  async function handlePlaceOrder() {
    if (!selectedAddress) { alert('Vui lòng chọn địa chỉ giao hàng!'); return; }
    if (!token) { router.push('/login'); return; }
    setPlacing(true);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: selectedAddress._id,
          totalPrice: getCartTotal(),
          paymentMethod: 'COD',
          status: 'pending'
        })
      });
      const order = await res.json();
      if (order._id) {
        clearCart();
        router.push(`/order/${order._id}`);
      }
    } catch {
      alert('Đã xảy ra lỗi khi đặt hàng!');
    } finally {
      setPlacing(false);
    }
  }

  const subtotal = getCartTotal();
  const total = subtotal;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container-custom pt-8">

        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#8A9BB0] mb-12">
          <Link href="/" className="hover:text-[#1D1D1F]">Trang chủ</Link>
          <ChevronRight size={14} className="opacity-30" />
          <span className="text-[#1D1D1F]">Thanh toán</span>
        </div>

        {/* HEADER */}
        <div className="mb-12 relative">
          <h1 className="text-[36px] font-black text-[#1D1D1F] tracking-tight mb-2">Thanh toán khi nhận hàng</h1>
          <p className="text-[#8A9BB0] text-[14px] font-bold">Vui lòng kiểm tra lại thông tin đơn hàng của bạn.</p>
          <div className="absolute top-10 right-0">
            <Link href="/checkout/bank" className="text-[12px] font-bold text-[#0056D2] hover:underline flex items-center gap-1">
              Thanh toán bằng ngân hàng <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT CONTENT */}
          <div className="flex-grow max-w-3xl">

            {/* ADDRESS PANEL */}
            <div className="bg-[#F8F9FA] rounded-[40px] p-10 border border-[#E8EAED] mb-8">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black text-[#0056D2] uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={14} strokeWidth={3} /> ĐỊA CHỈ GIAO HÀNG
                </h4>
                {!showForm && (
                  <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 text-[11px] font-black text-[#0056D2] hover:underline">
                    <Plus size={12} strokeWidth={3} /> Thêm địa chỉ mới
                  </button>
                )}
              </div>

              {loadingAddr ? (
                <div className="flex items-center gap-2 text-[#8A9BB0] py-4">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-[13px] font-bold">Đang tải địa chỉ...</span>
                </div>
              ) : showForm ? (
                /* FORM NHẬP ĐỊA CHỈ MỚI */
                <form onSubmit={handleSaveAddress} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black text-[#1D1D1F] uppercase tracking-wider mb-1.5 block">Họ tên *</label>
                      <input
                        type="text" placeholder="Nguyễn Văn A"
                        value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                        className="w-full bg-white border border-[#E8EAED] rounded-2xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-[#0056D2] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black text-[#1D1D1F] uppercase tracking-wider mb-1.5 block">Số điện thoại *</label>
                      <input
                        type="text" placeholder="0901 234 567"
                        value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white border border-[#E8EAED] rounded-2xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-[#0056D2] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-[#1D1D1F] uppercase tracking-wider mb-1.5 block">Địa chỉ *</label>
                    <input
                      type="text" placeholder="123 Đường Lê Lợi, Phường Bến Thành, Quận 1"
                      value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                      className="w-full bg-white border border-[#E8EAED] rounded-2xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-[#0056D2] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-[#1D1D1F] uppercase tracking-wider mb-1.5 block">Thành phố *</label>
                    <input
                      type="text" placeholder="TP. Hồ Chí Minh"
                      value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                      className="w-full bg-white border border-[#E8EAED] rounded-2xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-[#0056D2] transition-all"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={saving}
                      className="bg-[#0056D2] text-white px-8 py-3 rounded-2xl font-black text-[13px] hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-60">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                      Lưu địa chỉ
                    </button>
                    {addresses.length > 0 && (
                      <button type="button" onClick={() => setShowForm(false)}
                        className="border border-[#E8EAED] text-[#8A9BB0] px-6 py-3 rounded-2xl font-black text-[13px] hover:bg-gray-50 transition-all flex items-center gap-2">
                        <X size={14} /> Huỷ
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                /* DANH SÁCH ĐỊA CHỈ ĐÃ LƯU */
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <div key={addr._id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedAddress?._id === addr._id ? 'border-[#0056D2] bg-[#E8F0FE]' : 'border-[#E8EAED] bg-white hover:border-blue-200'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[15px] font-black text-[#1D1D1F] mb-0.5">{addr.fullName}</h3>
                          <p className="text-[13px] font-bold text-[#5e6b7d] leading-relaxed">
                            {addr.address}<br />{addr.city}, {addr.country}<br />{addr.phone}
                          </p>
                        </div>
                        {selectedAddress?._id === addr._id && (
                          <CheckCircle2 size={20} className="text-[#0056D2] shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* METHOD & DELIVERY */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-[#F8F9FA] border border-[#E8EAED] rounded-[28px] p-8 flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0056D2] shadow-sm shrink-0">
                  <Truck size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#0056D2] uppercase tracking-widest mb-1">PHƯƠNG THỨC</p>
                  <h5 className="text-[15px] font-black text-[#1D1D1F] mb-0.5">COD</h5>
                  <p className="text-[11px] font-bold text-[#8A9BB0]">Thanh toán tiền mặt khi nhận hàng</p>
                </div>
              </div>
              <div className="bg-[#F8F9FA] border border-[#E8EAED] rounded-[28px] p-8 flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2C7A32] shadow-sm shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#0056D2] uppercase tracking-widest mb-1">DỰ KIẾN GIAO HÀNG</p>
                  <h5 className="text-[15px] font-black text-[#1D1D1F] mb-0.5">3–5 ngày làm việc</h5>
                  <p className="text-[11px] font-bold text-[#8A9BB0]">Giao hàng tiêu chuẩn toàn quốc</p>
                </div>
              </div>
            </div>

            {/* PRODUCTS LIST */}
            <h3 className="text-[18px] font-black text-[#1D1D1F] mb-10 px-2">
              Sản phẩm trong giỏ ({cart.length})
            </h3>
            <div className="space-y-8 px-2">
              {cart.length === 0 ? (
                <p className="text-[#8A9BB0] font-bold text-[14px]">Giỏ hàng trống.</p>
              ) : cart.map((item) => {
                const product = item.product;
                if (!product || typeof product === 'string') return null;
                const imgSrc = product.images?.[0]?.startsWith('http')
                  ? product.images[0]
                  : `${BASE_URL}${product.images?.[0] || ''}`;
                return (
                  <div key={product._id} className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-[#F8F9FA] rounded-[20px] overflow-hidden p-3 border border-[#E8EAED] shrink-0">
                      <img src={imgSrc} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[14px] font-black text-[#1D1D1F] mb-0.5">{product.name}</h4>
                      <p className="text-[11px] font-black text-[#8A9BB0]">Số lượng: {item.qty}</p>
                    </div>
                    <div className="text-[15px] font-black text-[#1D1D1F]">
                      {((product.discountPrice || product.price) * item.qty).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:w-[380px]">
            <div className="bg-[#F8F9FA] rounded-[48px] p-12 border border-[#E8EAED] sticky top-24">
              <h3 className="text-[20px] font-black text-[#1D1D1F] mb-10">Tóm tắt đơn hàng</h3>
              <div className="space-y-5 mb-12">
                <div className="flex justify-between text-[14px] font-bold">
                  <span className="text-[#8A9BB0]">Tạm tính</span>
                  <span className="text-[#1D1D1F]">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-[14px] font-bold">
                  <span className="text-[#8A9BB0]">Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
              </div>

              <div className="pt-10 mb-10 border-t border-[#E8EAED]">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] font-black text-[#1D1D1F]">Tổng thanh toán</span>
                  <span className="text-[28px] font-black text-[#0056D2] tracking-tighter">{total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing || !selectedAddress}
                className="w-full bg-[#0056D2] text-white py-5 rounded-[28px] font-black text-[15px] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all mb-8 disabled:opacity-50 disabled:scale-100"
              >
                {placing ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                Xác nhận Đặt hàng
              </button>

              <p className="text-[9px] font-bold text-[#8A9BB0] text-center leading-relaxed mb-10 px-2 opacity-80">
                Bằng cách nhấn nút, bạn đồng ý với <Link href="#" className="underline text-[#1D1D1F]">Điều khoản dịch vụ</Link> và <Link href="#" className="underline text-[#1D1D1F]">Chính sách bảo mật</Link> của chúng tôi.
              </p>

              <div className="flex justify-center items-center gap-8 text-[#8A9BB0] opacity-60">
                <ShieldCheck size={20} />
                <Clock size={20} />
                <RotateCcw size={20} />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

