'use client';

import { MapPin, Truck, ChevronRight, CheckCircle2, RotateCcw, Edit2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentCODPage() {
  const router = useRouter();
  const cartItems = [
    {
      id: 1,
      name: 'Curator Watch Ultra G3',
      specs: 'Màu sắc: Space Grey | Kích thước: 45mm',
      price: '12.500.000đ',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544117518-e7963231d27a?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Audio Professional Pro Max',
      specs: 'Màu sắc: Arctic White',
      price: '8.200.000đ',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200'
    }
  ];

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
                    <button className="flex items-center gap-1.5 text-[11px] font-black text-[#0056D2] hover:underline">
                       Thay đổi <Edit2 size={12} strokeWidth={3} />
                    </button>
                 </div>
                 <div>
                    <h3 className="text-[18px] font-black text-[#1D1D1F] mb-1">Nguyễn Minh Quân</h3>
                    <p className="text-[14px] font-bold text-[#5e6b7d] leading-relaxed">
                       123 Đường Lê Lợi, Phường Bến Thành, Quận 1<br />
                       Thành phố Hồ Chim Minh, 700000<br />
                       +84 90 123 4567
                    </p>
                 </div>
              </div>

              {/* METHOD & DELIVERY CARDS */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                 {/* METHOD CARD */}
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
                 {/* DELIVERY CARD */}
                 <div className="bg-[#F8F9FA] border border-[#E8EAED] rounded-[28px] p-8 flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2C7A32] shadow-sm shrink-0">
                       <Clock size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-[#0056D2] uppercase tracking-widest mb-1">DỰ KIẾN GIAO HÀNG</p>
                       <h5 className="text-[15px] font-black text-[#1D1D1F] mb-0.5">Thứ Năm, 24 Tháng 10</h5>
                       <p className="text-[11px] font-bold text-[#8A9BB0]">Giao hàng tiêu chuẩn (3-5 ngày làm việc)</p>
                    </div>
                 </div>
              </div>

              {/* PRODUCTS LIST */}
              <h3 className="text-[18px] font-black text-[#1D1D1F] mb-10 px-2">Sản phẩm trong giỏ (2)</h3>
              <div className="space-y-12 px-2">
                 {cartItems.map((item) => (
                   <div key={item.id} className="flex items-center gap-8 group">
                      <div className="w-20 h-20 bg-[#F8F9FA] rounded-[20px] overflow-hidden p-4 border border-[#E8EAED] shrink-0">
                         <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-grow">
                         <h4 className="text-[14px] font-black text-[#1D1D1F] mb-0.5">{item.name}</h4>
                         <p className="text-[11px] font-bold text-[#8A9BB0] mb-0.5">{item.specs}</p>
                         <p className="text-[11px] font-black text-[#1D1D1F]">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-[16px] font-black text-[#1D1D1F]">{item.price}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* RIGHT SIDEBAR */}
           <aside className="lg:w-[380px]">
              <div className="bg-[#F8F9FA] rounded-[48px] p-12 border border-[#E8EAED] sticky top-24">
                 <h3 className="text-[20px] font-black text-[#1D1D1F] mb-10">Tóm tắt đơn hàng</h3>
                 
                 <div className="space-y-5 mb-12">
                    <div className="flex justify-between text-[14px] font-bold">
                       <span className="text-[#8A9BB0]">Tạm tính</span>
                       <span className="text-[#1D1D1F]">20.700.000đ</span>
                    </div>
                    <div className="flex justify-between text-[14px] font-bold">
                       <span className="text-[#8A9BB0]">Phí vận chuyển</span>
                       <span className="text-[#1D1D1F]">Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-[14px] font-bold">
                       <span className="text-[#8A9BB0]">Giảm giá (CURATOR10)</span>
                       <span className="text-[#2C7A32]">-2.070.000đ</span>
                    </div>
                 </div>

                 <div className="pt-10 mb-10 border-t border-[#E8EAED]">
                    <div className="flex justify-between items-center">
                       <span className="text-[15px] font-black text-[#1D1D1F]">Tổng thanh toán</span>
                       <span className="text-[32px] font-black text-[#0056D2] tracking-tighter">18.630.000đ</span>
                    </div>
                 </div>

                 <button 
                   onClick={() => router.push('/order/DC-99281')}
                   className="w-full bg-[#0056D2] text-white py-5 rounded-[28px] font-black text-[15px] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all mb-8"
                 >
                   Xác nhận Đặt hàng
                 </button>

                 <p className="text-[9px] font-bold text-[#8A9BB0] text-center leading-relaxed mb-10 px-2 opacity-80">
                   Bằng cách nhấn nút, bạn đồng ý với <Link href="#" className="underline text-[#1D1D1F]">Điều khoản dịch vụ</Link> và <Link href="#" className="underline text-[#1D1D1F]">Chính sách bảo mật</Link> của chúng tôi.
                 </p>

                 <div className="flex justify-center items-center gap-8 text-[#8A9BB0] opacity-60">
                    <ShieldCheck size={20} className="hover:text-[#1D1D1F] transition-colors" />
                    <Clock size={20} className="hover:text-[#1D1D1F] transition-colors" />
                    <RotateCcw size={20} className="hover:text-[#1D1D1F] transition-colors" />
                 </div>
              </div>
           </aside>

        </div>
      </div>
    </div>
  );
}
