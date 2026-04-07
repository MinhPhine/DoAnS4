'use client';

import { Copy, CheckCircle2, QrCode, ShieldCheck, HelpCircle, ArrowLeft, Headphones } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BankTransferPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <div className="container-custom pt-8">
        
        {/* HEADER BADGE */}
        <div className="mb-6 flex items-center">
          <span className="flex items-center gap-1.5 bg-[#E7F5EA] text-[#2C7A32] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
            <ShieldCheck size={14} strokeWidth={3} /> GIAO DỊCH AN TOÀN
          </span>
        </div>

        {/* TITLE SECTION */}
        <div className="mb-12">
          <h1 className="text-[42px] font-black text-[#1D1D1F] tracking-tighter mb-4 leading-none">Chuyển khoản Ngân hàng</h1>
          <p className="text-[#8A9BB0] text-[16px] font-bold leading-relaxed max-w-2xl">
            Vui lòng thực hiện chuyển khoản theo thông tin bên dưới. Hệ thống sẽ tự động cập nhật trạng thái đơn hàng ngay khi nhận được tiền.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
           
           {/* LEFT CONTENT */}
           <div className="flex-grow max-w-[720px]">
              
              {/* MAIN INFO CARD */}
              <div className="bg-[#F8F9FA] rounded-[40px] p-12 border border-[#E8EAED] mb-10 relative">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12">
                    
                    {/* Bank Selection Display */}
                    <div className="md:col-span-2">
                       <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4">NGÂN HÀNG THỤ HƯỞNG</p>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <h2 className="text-[24px] font-black text-[#1D1D1F]">MB Bank (Quân Đội)</h2>
                             <CheckCircle2 size={20} className="text-[#0056D2]" strokeWidth={3} />
                          </div>
                          {/* MB Logo box */}
                          <div className="w-11 h-11 bg-[#0052CC] rounded-xl flex items-center justify-center relative p-1 shadow-sm">
                             <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0052CC]" />
                             <span className="text-white font-black italic text-[14px]">MB</span>
                          </div>
                       </div>
                    </div>

                    {/* Account Number */}
                    <div>
                       <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4">SỐ TÀI KHOẢN</p>
                       <div className="flex items-center gap-4">
                          <span className="text-[32px] font-black text-[#1D1D1F] tracking-tight leading-none">0346 247 957</span>
                          <button 
                            onClick={() => handleCopy('0346247957', 'num')}
                            className="w-10 h-10 bg-white rounded-xl border border-[#E8EAED] flex items-center justify-center text-[#8A9BB0] hover:text-[#0056D2] transition-colors relative"
                          >
                             <Copy size={20} />
                             {copied === 'num' && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">Đã chép</span>}
                          </button>
                       </div>
                    </div>

                    {/* Account Holder */}
                    <div>
                       <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4">TÊN CHỦ TÀI KHOẢN</p>
                       <h3 className="text-[20px] font-black text-[#1D1D1F] leading-tight uppercase tracking-tight">CONG TY TNHH THE DIGITAL CURATOR</h3>
                    </div>
                 </div>

                 {/* Transfer Message Box - UPDATED TO LIGHT BLUE BACKGROUND */}
                 <div className="mt-12 bg-[#E1F5FE] rounded-[24px] overflow-hidden border border-[#B3E5FC] relative">
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#0056D2]" />
                    <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                       <div>
                          <p className="text-[11px] font-black text-[#0056D2] uppercase tracking-[0.15em] mb-3 opacity-80">NỘI DUNG CHUYỂN KHOẢN (BẮT BUỘC)</p>
                          <span className="text-[36px] font-black text-[#0056D2] tracking-tighter leading-none">CURATOR 88921</span>
                       </div>
                       <button 
                          onClick={() => handleCopy('CURATOR 88921', 'msg')}
                          className="flex items-center gap-2 text-[12px] font-black text-[#0056D2] hover:underline uppercase tracking-widest relative"
                       >
                          <Copy size={16} strokeWidth={3} /> SAO CHÉP
                          {copied === 'msg' && <span className="absolute -top-10 right-0 bg-black text-white text-[10px] px-2 py-1 rounded shadow-lg">Đã chép</span>}
                       </button>
                    </div>
                 </div>
              </div>

              {/* SERVICE INFO CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm">
                    <div className="w-10 h-10 bg-[#E7F5EA] text-[#2C7A32] rounded-full flex items-center justify-center mb-8 border border-[#D0E7D4]">
                       <CheckCircle2 size={24} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-[18px] font-black text-[#1D1D1F] mb-3">Xác nhận tức thì</h4>
                    <p className="text-[13px] font-bold text-[#8A9BB0] leading-relaxed">
                       Hệ thống Napas247 xử lý giao dịch trong 30 giây. Đơn hàng được kích hoạt ngay lập tức.
                    </p>
                 </div>
                 <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm">
                    <div className="w-10 h-10 bg-[#F1F3F4] text-[#1D1D1F] rounded-full flex items-center justify-center mb-8 border border-[#E8EAED] opacity-60">
                       <Headphones size={24} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-[18px] font-black text-[#1D1D1F] mb-3">Hỗ trợ 24/7</h4>
                    <p className="text-[13px] font-bold text-[#8A9BB0] leading-relaxed">
                       Nếu gặp trục trặc, vui lòng gửi ảnh chụp biên lai giao dịch cho bộ phận hỗ trợ kỹ thuật.
                    </p>
                 </div>
              </div>
           </div>

           {/* SIDEBAR - UPDATED TO BE WIDER AND SHORTER */}
           <aside className="lg:w-[480px]">
              <div className="bg-white rounded-[48px] p-10 border border-[#E8EAED] sticky top-24 shadow-sm text-center">
                 <h3 className="text-[22px] font-black text-[#1D1D1F] mb-3">Mã QR Thanh Toán Nhanh</h3>
                 <p className="text-[12px] font-bold text-[#8A9BB0] leading-relaxed mb-8 px-6">
                    Sử dụng ứng dụng Ngân hàng hoặc Ví điện tử để quét mã bên dưới
                 </p>

                 {/* QR CARD FRAME */}
                 <div className="inline-block bg-[#E1F5FE] rounded-[40px] p-10 pt-12 border border-[#B3E5FC] mb-8 relative">
                    <div className="bg-white rounded-[32px] p-8 shadow-xl relative flex flex-col items-center">
                       <div className="relative">
                          <QrCode size={140} className="text-[#1D1D1F]" strokeWidth={2} />
                          {/* TDC LOGO OVERLAY */}
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="bg-[#0056D2] text-white text-[12px] font-black px-3 py-1.5 rounded-full border-4 border-white shadow-md">TDC</div>
                          </div>
                       </div>
                    </div>
                    <div className="mt-8 text-[11px] font-black text-[#0056D2] uppercase tracking-[0.2em] opacity-80">
                       QUÉT MÃ ĐỂ THANH TOÁN
                    </div>
                 </div>

                 <div className="space-y-4 mb-8 text-left px-8">
                    <div className="flex justify-between items-center">
                       <span className="text-[14px] font-black text-[#8A9BB0] opacity-80">Tổng số tiền:</span>
                       <span className="text-[32px] font-black text-[#1D1D1F]">1.250.000đ</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] font-black">
                       <span className="text-[#8A9BB0] opacity-80">Trạng thái:</span>
                       <span className="flex items-center gap-2 text-[#E67E22]">
                          <span className="w-2.5 h-2.5 bg-[#E67E22] rounded-full animate-pulse shadow-[0_0_8px_rgba(230,126,34,0.6)]" /> Chờ chuyển khoản
                       </span>
                    </div>
                 </div>

                 <div className="px-4 mb-6">
                    <button 
                      onClick={() => router.push('/order/DC-99281')}
                      className="w-full bg-[#0056D2] text-white py-5 rounded-[28px] font-black text-[16px] shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-all"
                    >
                      Xác nhận đã chuyển khoản
                    </button>
                 </div>

                 <Link href="/cart" className="text-[12px] font-bold text-[#8A9BB0] hover:text-[#1D1D1F] transition-colors">
                    Quay lại giỏ hàng
                 </Link>
              </div>
           </aside>

        </div>
      </div>
    </div>
  );
}
