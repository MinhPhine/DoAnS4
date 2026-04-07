'use client';

import { CreditCard, ChevronRight, ShieldCheck, Lock, ArrowRight, Info, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CardCheckoutPage() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container-custom pt-8">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#8A9BB0] mb-12">
           <Link href="/" className="hover:text-[#1D1D1F]">Trang chủ</Link>
           <ChevronRight size={14} className="opacity-30" />
           <span className="text-[#1D1D1F]">Thanh toán</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
           
           {/* LEFT: FORM */}
           <div className="flex-grow max-w-2xl">
              <h1 className="text-[36px] font-black text-[#1D1D1F] tracking-tight mb-2">Thanh toán bằng thẻ</h1>
              <p className="text-[#8A9BB0] text-[15px] font-bold mb-10">Thông tin của bạn được bảo mật bằng mã hóa 256-bit chuẩn ngân hàng.</p>

              {/* VIRTUAL CARD */}
              <div className="relative w-full aspect-[1.6/1] max-w-[420px] rounded-[24px] overflow-hidden p-8 flex flex-col justify-between shadow-2xl mb-12 bg-gradient-to-br from-[#1E5AF2] via-[#2D73FF] to-[#0A44C8]">
                 <div className="flex justify-between items-start">
                    <div className="text-white opacity-80">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                       </svg>
                    </div>
                    <div className="text-white font-black italic text-2xl tracking-tighter">VISA</div>
                 </div>

                 <div>
                    <div className="flex gap-4 mb-4">
                       <span className="text-white text-lg opacity-40">★ ★ ★ ★</span>
                       <span className="text-white text-lg opacity-40">★ ★ ★ ★</span>
                       <span className="text-white text-lg opacity-40">★ ★ ★ ★</span>
                    </div>
                    <div className="text-white text-[32px] font-black tracking-[0.2em] mb-8">4 2 4 2</div>
                    
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">TÊN CHỦ THẺ</p>
                          <p className="text-white text-[15px] font-black tracking-wider uppercase">NGUYEN VAN A</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">HẾT HẠN</p>
                          <p className="text-white text-[15px] font-black tracking-wider">12 / 26</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* FORM FIELDS */}
              <div className="space-y-8">
                 <div>
                    <label className="text-[14px] font-black text-[#1D1D1F] mb-3 block uppercase tracking-wide">Số thẻ</label>
                    <div className="relative">
                       <CreditCard size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8A9BB0]" />
                       <input 
                         type="text" 
                         placeholder="0000 0000 0000 0000" 
                         className="w-full bg-[#F1F3F4] rounded-[20px] px-14 py-5 text-[16px] font-black tracking-widest focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0056D2] transition-all"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="text-[14px] font-black text-[#1D1D1F] mb-3 block uppercase tracking-wide">Tên trên thẻ</label>
                    <input 
                      type="text" 
                      placeholder="VIET THE NAM" 
                      className="w-full bg-[#F1F3F4] rounded-[20px] px-8 py-5 text-[15px] font-black tracking-widest uppercase focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0056D2] transition-all"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="text-[14px] font-black text-[#1D1D1F] mb-3 block uppercase tracking-wide">Ngày hết hạn</label>
                       <input 
                         type="text" 
                         placeholder="MM/YY" 
                         className="w-full bg-[#F1F3F4] rounded-[20px] px-8 py-5 text-[15px] font-black tracking-widest text-center focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0056D2] transition-all"
                       />
                    </div>
                    <div>
                       <label className="text-[14px] font-black text-[#1D1D1F] mb-3 block uppercase tracking-wide">Mã CVV</label>
                       <div className="relative">
                          <input 
                            type="text" 
                            placeholder="***" 
                            className="w-full bg-[#F1F3F4] rounded-[20px] px-8 py-5 text-[15px] font-black tracking-widest text-center focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0056D2] transition-all"
                          />
                          <HelpCircle size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8A9BB0] cursor-help" />
                       </div>
                    </div>
                 </div>

                 <div className="bg-[#E7F5EA] border-transparent rounded-[24px] p-6 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2C7A32] shadow-sm shrink-0">
                       <CheckCircle2 size={20} />
                    </div>
                    <p className="text-[12px] font-bold text-[#2C7A32]/80 leading-relaxed">
                       Dữ liệu của bạn được lưu trữ an toàn theo tiêu chuẩn PCI DSS toàn cầu. Chúng tôi không bao giờ lưu trữ mã CVV của bạn.
                    </p>
                 </div>

                 <button 
                   onClick={() => router.push('/order/DC-99281')}
                   className="w-full bg-[#0056D2] text-white py-5 rounded-[24px] font-black text-[16px] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                 >
                    Thanh toán ngay <ArrowRight size={20} />
                 </button>
              </div>
           </div>

           {/* RIGHT: SUMMARY CARD */}
           <aside className="lg:w-[400px]">
              <div className="bg-[#F8F9FA] rounded-[40px] p-10 border border-[#E8EAED] sticky top-24">
                 <h3 className="text-[24px] font-black text-[#1D1D1F] mb-10">Tóm tắt đơn hàng</h3>
                 
                 {/* Product Info */}
                 <div className="bg-white rounded-[24px] p-5 border border-[#E8EAED] flex items-center gap-5 mb-10">
                    <div className="w-20 h-20 bg-[#F1F3F4] rounded-2xl overflow-hidden p-3 shrink-0">
                       {/* Abstract placeholder for membership matching mockup */}
                       <div className="w-full h-full border-t-2 border-amber-800 rounded-sm mt-8 opacity-40 mx-auto" />
                    </div>
                    <div>
                       <h4 className="text-[14px] font-black text-[#1D1D1F] mb-1">Gói Hội Viên Premium</h4>
                       <p className="text-[11px] font-bold text-[#8A9BB0] mb-2">Thanh toán theo năm (Tiết kiệm 20%)</p>
                       <p className="text-[14px] font-black text-[#0056D2]">2.400.000đ</p>
                    </div>
                 </div>

                 <div className="space-y-5 mb-10">
                    <div className="flex justify-between text-[14px] font-bold">
                       <span className="text-[#8A9BB0]">Tạm tính</span>
                       <span className="text-[#1D1D1F]">2.400.000đ</span>
                    </div>
                    <div className="flex justify-between text-[14px] font-bold">
                       <span className="text-[#8A9BB0]">Thuế VAT (10%)</span>
                       <span className="text-[#1D1D1F]">240.000đ</span>
                    </div>
                 </div>

                 <div className="border-t border-[#E8EAED] pt-8 mb-12">
                    <div className="flex justify-between items-end">
                       <span className="text-[16px] font-black text-[#1D1D1F] uppercase">Tổng cộng</span>
                       <span className="text-[28px] font-black text-[#1D1D1F]">2.640.000đ</span>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <ShieldCheck size={20} className="text-[#0056D2] shrink-0" />
                       <div>
                          <p className="text-[13px] font-black text-[#1D1D1F]">Giao dịch an toàn</p>
                          <p className="text-[11px] font-bold text-[#8A9BB0]">Chứng chỉ SSL bảo mật lớp cao nhất hiện nay.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <RotateCcw size={20} className="text-[#0056D2] shrink-0" />
                       <div>
                          <p className="text-[13px] font-black text-[#1D1D1F]">Chính sách hoàn tiền</p>
                          <p className="text-[11px] font-bold text-[#8A9BB0]">Hoàn trả 100% trong 30 ngày nếu không hài lòng.</p>
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 flex justify-center items-center gap-6 opacity-40 grayscale">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">VISA</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">Mastercard</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">JCB</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">Amex</span>
                 </div>
              </div>
           </aside>

        </div>
      </div>
    </div>
  );
}
