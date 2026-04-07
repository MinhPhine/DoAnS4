'use client';

import { MapPin, CreditCard, ShoppingBag, ChevronRight, FileText, Map, CheckCircle2, Truck, Star, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailPage({ params }) {
  const orderId = '#DC-99281';
  const products = [
    {
      id: 1,
      name: 'Sony WH-1000XM5 Wireless Noise Canceling',
      specs: 'Màu sắc: Midnight Blue | Bảo hành: 12 tháng',
      price: '8.490.000đ',
      image: 'https://images.unsplash.com/photo-1618366712010-8c0e2474d2c4?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'MacBook Air M2 13-inch (8GB RAM, 256GB SSD)',
      specs: 'Màu sắc: Space Gray | Keyboard: English',
      price: '26.900.000đ',
      image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 font-sans antialiased">
      <div className="container-custom pt-8">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#8A9BB0] mb-8">
           <Link href="/" className="hover:text-[#1D1D1F]">Thị trường</Link>
           <ChevronRight size={14} className="opacity-30" />
           <Link href="/dashboard/orders" className="hover:text-[#1D1D1F]">Đơn hàng của tôi</Link>
           <ChevronRight size={14} className="opacity-30" />
           <span className="text-[#1D1D1F]">Chi tiết {orderId}</span>
        </div>

        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
           <div>
              <h1 className="text-[36px] font-black text-[#1D1D1F] tracking-tighter mb-2 leading-none">Đơn hàng {orderId}</h1>
              <p className="text-[#8A9BB0] text-[14px] font-bold">Đặt ngày 24 tháng 10, 2023 • 14:30</p>
           </div>
           <div className="flex items-center gap-4 w-full lg:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F1F3F4] text-[#1D1D1F] font-black text-[13px] rounded-xl hover:bg-gray-200 transition-all">
                 <FileText size={18} className="opacity-60" /> In hóa đơn
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-[#0056D2] text-white font-black text-[13px] rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                 Theo dõi vị trí
              </button>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
           
           {/* LEFT CONTENT */}
           <div className="flex-grow lg:max-w-[760px] space-y-12">
              
              {/* SHIPPING JOURNEY */}
              <div className="bg-white rounded-[40px] p-12 py-10 border border-[#E8EAED] relative">
                 <h3 className="text-[20px] font-black text-[#1D1D1F] mb-12 flex items-center gap-3">
                    <Truck className="text-[#0056D2]" size={24} strokeWidth={2.5} /> Lộ trình vận chuyển
                 </h3>

                 <div className="relative pl-12 space-y-10">
                    {/* Vertical Line aligned with icons */}
                    <div className="absolute left-[24px] top-2 bottom-4 w-0.5 bg-[#E8EAED]" />

                    {/* Active Milestone */}
                    <div className="relative">
                       <div className="absolute -left-[32px] w-6 h-6 bg-[#0061FF] rounded-full ring-4 ring-[#E8F0FE] flex items-center justify-center text-white z-10">
                          <CheckCircle2 size={14} strokeWidth={3} />
                       </div>
                       <div className="bg-[#F8F9FA] rounded-[24px] p-8 border border-[#E8F0FE]">
                          <h4 className="text-[15px] font-black text-[#0061FF] mb-2 leading-none tracking-tight">Đang giao hàng</h4>
                          <h5 className="text-[16px] font-black text-[#1D1D1F] mb-3 leading-tight">Shipper đang trên đường giao đến bạn.</h5>
                          <p className="text-[14px] font-bold text-[#8A9BB0]">Hà Nội • Dự kiến 16:30 hôm nay</p>
                       </div>
                    </div>

                    {[
                       { title: 'Đã rời kho phân loại', detail: 'Hà Nội SOC • 25/10/2023 - 08:15' },
                       { title: 'Người bán đang chuẩn bị hàng', detail: 'TP. Hồ Chí Minh • 24/10/2023 - 16:00' },
                       { title: 'Đã xác nhận đơn hàng', detail: 'Hệ thống • 24/10/2023 - 14:32' }
                    ].map((step, i) => (
                       <div key={i} className="relative opacity-60 flex items-start gap-4">
                          <div className="absolute -left-[32px] w-6 h-6 bg-[#E8EAED] rounded-full flex items-center justify-center text-[#8A9BB0] z-10 shrink-0">
                             <CheckCircle2 size={14} strokeWidth={3} />
                          </div>
                          <div>
                             <h4 className="text-[15px] font-black text-[#1D1D1F] mb-1 leading-none tracking-tight">{step.title}</h4>
                             <p className="text-[14px] font-bold text-[#8A9BB0]">{step.detail}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* PURCHASED PRODUCTS */}
              <div className="bg-white rounded-[40px] border border-[#E8EAED] overflow-hidden">
                 <div className="px-10 py-8 flex justify-between items-center border-b border-[#F1F3F4]">
                    <h3 className="text-[18px] font-black text-[#1D1D1F] tracking-tight">Sản phẩm đã mua (02)</h3>
                    <span className="text-[11px] font-black text-[#2C7A32] bg-[#E7F5EA] px-4 py-1.5 rounded-full uppercase tracking-[0.1em]">Người bán: Digital Curator Official</span>
                 </div>
                 <div className="divide-y divide-[#F1F3F4]">
                    {products.map((p) => (
                       <div key={p.id} className="p-10 flex flex-col md:flex-row items-center gap-10">
                          <div className="w-24 h-24 bg-[#F8F9FA] rounded-[24px] border border-[#E8EAED] p-4 shrink-0 overflow-hidden flex items-center justify-center group">
                             <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-grow">
                             <h4 className="text-[18px] font-black text-[#1D1D1F] mb-2 leading-tight tracking-tight">{p.name}</h4>
                             <p className="text-[14px] font-bold text-[#8A9BB0] leading-relaxed max-w-sm mb-4">{p.specs}</p>
                             <p className="text-[12px] font-black text-[#1D1D1F]/40 uppercase tracking-widest">Sn I/V #: 01</p>
                          </div>
                          <div className="text-right shrink-0">
                             <div className="text-[22px] font-black text-[#1D1D1F] mb-6">{p.price}</div>
                             <button className="text-[12px] font-black text-[#0056D2] hover:underline uppercase tracking-widest transition-all">Viết đánh giá</button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* RIGHT SIDEBAR */}
           <aside className="lg:w-[420px] space-y-10">
              {/* SHIPPING ADDRESS */}
              <div className="bg-[#F8F9FA] rounded-[40px] p-10 border border-[#E8EAED] shadow-sm">
                 <h4 className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-10">ĐỊA CHỈ NHẬN HÀNG</h4>
                 <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0061FF] shadow-lg shadow-blue-500/10 shrink-0">
                       <MapPin size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                       <h3 className="text-[20px] font-black text-[#1D1D1F] mb-1.5 leading-none">Nguyễn Văn A</h3>
                       <p className="text-[15px] font-bold text-[#8A9BB0] mb-5">090 1234 567</p>
                       <p className="text-[14px] font-bold text-[#1D1D1F]/70 leading-relaxed">
                          Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh
                       </p>
                    </div>
                 </div>
              </div>

              {/* PAYMENT INFO */}
              <div className="bg-[#F8F9FA] rounded-[40px] p-10 border border-[#E8EAED] shadow-sm">
                 <h4 className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-10">PHƯƠNG THỨC THANH TOÁN</h4>
                 <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-10 bg-white rounded-xl border border-[#E8EAED] flex items-center justify-center shadow-sm overflow-hidden">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
                    </div>
                    <div>
                       <p className="text-[15px] font-black text-[#1D1D1F] mb-0.5 leading-none">Thẻ Tín Dụng / Ghi Nợ</p>
                       <p className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest">VISA **** 8821</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2.5 text-[12px] font-black text-[#2C7A32] uppercase tracking-[0.05em]">
                    <CheckCircle2 size={16} strokeWidth={3} /> Đã thanh toán qua ngân hàng
                 </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="bg-white rounded-[40px] p-8 lg:p-10 border border-[#E8EAED] shadow-sm">
                 <h3 className="text-[20px] font-black text-[#1D1D1F] mb-8 tracking-tight">Tổng kết đơn hàng</h3>
                 <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-[13px] font-bold">
                       <span className="text-[#8A9BB0]">Tạm tính (02 món)</span>
                       <span className="text-[#1D1D1F]">35.390.000đ</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] font-bold">
                       <span className="text-[#8A9BB0]">Phí vận chuyển</span>
                       <span className="text-[#1D1D1F]">Miễn phí</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] font-bold">
                       <span className="text-[#8A9BB0]">Giảm giá (Curator VIP)</span>
                       <span className="text-[#E74C3C] font-black">-250.000đ</span>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-[#F1F3F4] mb-8">
                    <div className="flex justify-between items-end">
                       <span className="text-[14px] font-black text-[#1D1D1F] uppercase tracking-tighter">Tổng cộng</span>
                       <span className="text-[32px] font-black text-[#0061FF] tracking-tighter leading-none">35.140.000đ</span>
                    </div>
                 </div>

                 <button className="w-full bg-[#0061FF] text-white py-4 rounded-[28px] font-black text-[15px] shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all mb-8">
                   Cần hỗ trợ? Liên hệ ngay
                 </button>

                 <p className="text-[10px] font-bold text-[#8A9BB0] text-center leading-relaxed px-4">
                   Bằng cách mua hàng, bạn đồng ý với Điều khoản và<br />Chính sách bảo mật của chúng tôi.
                 </p>
              </div>
           </aside>

        </div>
      </div>
    </div>
  );
}
