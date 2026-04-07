import Link from 'next/link';
import { Globe, Video, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] pt-20 pb-10 border-t border-[#E8EAED]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Logo & Intro */}
          <div className="col-span-1">
            <h2 className="text-[#0056D2] font-black text-xl mb-6 tracking-tighter">The Digital Curator</h2>
            <p className="text-[#8A9BB0] text-[14px] font-bold leading-relaxed mb-8 max-w-[280px]">
              Nền tảng đánh giá công nghệ và thảo luận cộng đồng hàng đầu. Nơi hội tụ những cá nhân đam mê sự đổi mới.
            </p>
            <div className="flex space-x-5 text-[#8A9BB0]">
              {/* Simplified Social Icons matching mockup placeholder icons */}
              <div className="w-5 h-5 border-2 border-[#8A9BB0] rounded-sm opacity-50 rotate-45" />
              <div className="w-5 h-5 border-2 border-[#8A9BB0] rounded-lg opacity-50" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[12px] font-black text-[#1D1D1F] uppercase tracking-[0.2em] mb-8">DANH MỤC</h3>
            <ul className="space-y-4 text-[14px] font-bold text-[#8A9BB0]">
              <li><Link href="/category/mobile" className="hover:text-[#0056D2] transition-colors">Mobile</Link></li>
              <li><Link href="/category/laptop-pc" className="hover:text-[#0056D2] transition-colors">Laptop & PC</Link></li>
              <li><Link href="/category/smart-home" className="hover:text-[#0056D2] transition-colors">Smart Home</Link></li>
              <li><Link href="/category/gaming" className="hover:text-[#0056D2] transition-colors">Gaming</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-[12px] font-black text-[#1D1D1F] uppercase tracking-[0.2em] mb-8">THÔNG TIN</h3>
            <ul className="space-y-4 text-[14px] font-bold text-[#8A9BB0]">
              <li><Link href="/about" className="hover:text-[#0056D2] transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/policy/privacy" className="hover:text-[#0056D2] transition-colors">Điều khoản bảo mật</Link></li>
              <li><Link href="/policy/warranty" className="hover:text-[#0056D2] transition-colors">Chính sách bảo hành</Link></li>
              <li><Link href="/policy/terms" className="hover:text-[#0056D2] transition-colors">Quy tắc cộng đồng</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[12px] font-black text-[#1D1D1F] uppercase tracking-[0.2em] mb-8">HỢP TÁC</h3>
            <p className="text-[14px] font-bold text-[#8A9BB0] mb-8 leading-relaxed">
              Liên hệ hợp tác nội dung và truyền thông qua email: <span className="text-[#1D1D1F]">partner@digitalcurator.vn</span>
            </p>
            <div className="bg-[#F1F3F4] rounded-[24px] p-6 border border-white">
              <span className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest block mb-1">Hotline CSKH</span>
              <span className="text-[#0056D2] font-black text-[24px] tracking-tight">1900 6789</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8EAED] pt-10 flex flex-col md:flex-row justify-between items-center text-[13px] font-bold text-[#8A9BB0]">
          <p>© 2024 The Digital Curator. All rights reserved. Giấy phép MXH số 123/GP-BTTTT.</p>
        </div>
      </div>
    </footer>
  );
}
