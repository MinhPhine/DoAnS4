"use client";

import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, MessageSquare, Heart, Compass, Smartphone,
  Laptop, Headphones, Bot, Gamepad2, TrendingUp, CheckCircle,
  RefreshCcw, ShoppingCart, Shield, Bell
} from 'lucide-react';

export default function Home() {
  const { showSuccess } = useToast();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState('Mới nhất');

  const handleNewsletter = (e) => {
    e.preventDefault();
    showSuccess('Cảm ơn bạn đã tham gia cộng đồng! Hãy kiểm tra email nhé.');
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      showSuccess('Đã tải thêm 10 bài viết mới nhất.');
    }, 1200);
  };
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 animate-slow-fade">
      <div className="container-custom pt-6">

        {/* ══════════════════ HERO BANNER ══════════════════ */}
        <div className="bg-[#0b3b9b] rounded-2xl p-10 md:p-14 text-white mb-10 relative overflow-hidden flex flex-col justify-center min-h-[340px] hover:shadow-2xl transition-shadow duration-500">
          {/* Decorative shapes */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#001f5c]/60 to-transparent" />
          <div className="absolute right-[-4%] bottom-[-12%] w-80 h-80 bg-[#002f7a] rounded-full opacity-25 blur-2xl" />
          {/* Laptop mockup shape */}
          <div className="absolute right-[4%] bottom-0 w-64 h-44 bg-[#0047ab] rounded-t-[32px] border-t-8 border-[#1a73e8] shadow-[0_-15px_40px_rgba(0,0,0,0.35)]" />
          <div className="absolute right-[6%] bottom-[44px] w-56 h-28 bg-[#1a56c4]/50 rounded-lg" />

          <div className="relative z-10 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-black mb-6 leading-[1.15] tracking-tight">
              Apple Vision Pro và Kỷ Nguyên<br />Máy Tính Không Gian: Những<br />Đánh Giá Đầu Tiên Tại Việt Nam
            </h1>
            <p className="text-blue-100/85 mb-8 max-w-md leading-relaxed text-sm">
              Mọi thứ bạn cần biết về thiết bị thay đổi cuộc chơi của Apple qua góc nhìn của các chuyên gia curator hàng đầu.
            </p>
            <Link href="/review-detail" className="bg-white text-primary font-black px-7 py-3 rounded-full flex items-center gap-3 text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-black/20 group w-fit">
              <span>Đọc chi tiết</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ══════════════════ MAIN GRID ══════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="col-span-1 md:col-span-3 lg:col-span-2 hidden md:block space-y-10">
            {/* Category nav */}
            <div>
              <h3 className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-5">CHUYÊN MỤC</h3>
              <nav className="space-y-1">
                <Link href="/forum" className="flex items-center gap-3 bg-primary text-white p-3 rounded-xl text-[12px] font-bold shadow-md shadow-blue-500/25">
                  <Compass size={17} /><span>Khám phá</span>
                </Link>
                {[
                  { icon: <Smartphone size={17} />, label: 'Điện thoại', href: '/category/mobile' },
                  { icon: <Laptop size={17} />, label: 'Máy tính & Laptop', href: '/category/laptop' },
                  { icon: <Headphones size={17} />, label: 'Phụ kiện âm thanh', href: '/category/accessory' },
                  { icon: <Bot size={17} />, label: 'AI & Robot', href: '/category/ai' },
                  { icon: <Gamepad2 size={17} />, label: 'Gaming Gear', href: '/category/gaming' },
                ].map(({ icon, label, href }) => (
                  <Link key={label} href={href} className="flex items-center gap-3 text-[#5e6b7d] hover:bg-white hover:text-primary p-3 rounded-xl text-[12px] font-semibold transition-all">
                    {icon}<span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-[28px] p-7 border border-[#E8EAED] shadow-sm text-center">
              <h3 className="font-bold text-[13px] mb-2 text-[#1D1D1F]">Tham gia cộng đồng</h3>
              <p className="text-[#6b7987] text-[11px] mb-5 leading-relaxed">
                Nhận những tin tức công nghệ tinh tuyển nhất trực tiếp vào hộp thư của bạn.
              </p>
              <form onSubmit={handleNewsletter}>
                <input type="email" required placeholder="Email của bạn" className="w-full bg-[#F1F3F4] rounded-xl px-4 py-2.5 text-[11px] mb-3 outline-none focus:ring-2 focus:ring-primary/20 text-center transition-all" />
                <button type="submit" className="w-full bg-primary text-white font-bold py-2.5 rounded-xl text-[11px] uppercase tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-blue-500/10">
                  Đăng ký ngay
                </button>
              </form>
            </div>
          </aside>

          {/* ── MAIN FEED ── */}
          <div className="col-span-1 md:col-span-5 lg:col-span-7">
            {/* Tabs */}
            <div className="flex border-b border-[#E8EAED] mb-8 text-[11px] font-black uppercase tracking-widest text-[#8A9BB0]">
              {['Mới nhất', 'Thảo luận nhiều', 'Đánh giá 5 ★'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'hover:text-primary transition-colors'} pb-3.5 px-2 mr-6`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-12">

              {/* Article 1 — Horizontal card */}
              <article className={`flex flex-col xl:flex-row gap-7 group cursor-pointer ${activeTab === 'Thảo luận nhiều' ? 'order-2' : activeTab === 'Đánh giá 5 ★' ? 'order-3' : 'order-1'} transition-all`}>
                <div className="xl:w-[45%] aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 shadow-sm shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
                    alt="Workstation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="xl:w-[55%] flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-3">
                    <span className="text-primary">Phần cứng</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#8A9BB0]">15 phút trước</span>
                  </div>
                  <Link href="/review-detail" className="hover:text-primary transition-colors block">
                    <h2 className="text-2xl font-black mb-3 leading-tight text-[#1D1D1F] transition-colors">
                      Nvidia RTX 5090: Sức mạnh đồ họa vượt giới hạn và cái giá của sự độc tôn
                    </h2>
                  </Link>
                  <p className="text-[#6b7987] text-sm mb-5 line-clamp-2 leading-relaxed">
                    Những thông tin rò rỉ mới nhất cho thấy thế hệ card đồ họa tiếp theo thực sự là một con quái vật về hiệu năng...
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                        <img src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=100" alt="Minh Triết" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold text-[#1D1D1F]">Minh Triết</span>
                    </div>
                    <div className="flex items-center gap-5 text-[#8A9BB0] text-[10px] font-black">
                      <div className="flex items-center gap-1.5"><MessageSquare size={13} /><span>42</span></div>
                      <div className="flex items-center gap-1.5"><Heart size={13} /><span>128</span></div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Article 2 — Curator's Choice large card */}
              <article className={`bg-white rounded-[36px] overflow-hidden border border-[#E8EAED] cursor-pointer group shadow-sm hover:shadow-2xl hover-lift transition-all duration-500 ${activeTab === 'Thảo luận nhiều' ? 'order-3' : activeTab === 'Đánh giá 5 ★' ? 'order-1' : 'order-2'}`}>
                {/* Image area */}
                <div className="aspect-[2.4/1] bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200"
                    alt="Smart Home"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-9">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
                    <span className="bg-[#E4F5E6] text-[#2C7A32] px-3 py-1 rounded-full">Lựa chọn của Curator</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#8A9BB0]">2 giờ trước</span>
                  </div>
                  <Link href="/review-detail" className="hover:text-primary transition-colors block">
                    <h2 className="text-2xl font-black mb-4 leading-tight text-[#1D1D1F] transition-colors">
                      Tương lai của Smart Home: Khi AI thực sự hiểu thói quen của bạn
                    </h2>
                  </Link>
                  <p className="text-[#6b7987] text-sm mb-8 leading-relaxed">
                    Chúng tôi đã trải nghiệm hệ sinh thái nhà thông minh tích hợp AI mới nhất của Matter. Kết quả thật bất ngờ: Nó không chỉ điều khiển đèn, nó dự đoán được bạn muốn làm gì tiếp theo.
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[16px] bg-[#ef8d6e] overflow-hidden shadow-sm shrink-0">
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=150" alt="Hoàng Nam" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-black text-[#1D1D1F] leading-tight">Hoàng Nam</h4>
                        <p className="text-[10px] text-[#8A9BB0] font-bold uppercase tracking-tight">Chuyên gia smarthome</p>
                      </div>
                    </div>
                    <Link href="/review-detail" className="text-primary font-black text-[11px] uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-all">
                      <span>Đọc bài đánh giá</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>

              {/* Article 3 — Small horizontal */}
              <article className={`flex gap-7 group cursor-pointer ${activeTab === 'Thảo luận nhiều' ? 'order-1' : activeTab === 'Đánh giá 5 ★' ? 'order-2' : 'order-3'} transition-all`}>
                <div className="w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-[#E8EAED] flex items-center justify-center relative shadow-sm shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
                    alt="Cyber Security AI"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-3">
                    <span className="text-primary">Bảo mật</span>
                    <span className="text-gray-200">•</span>
                    <span className="text-[#8A9BB0]">5 giờ trước</span>
                  </div>
                  <Link href="/review-detail" className="hover:text-primary transition-colors block">
                    <h2 className="text-xl font-black mb-3 leading-tight text-[#1D1D1F] transition-colors">
                      Cảnh báo chiến dịch lừa đảo AI Voice Cloning nhắm vào người dùng ngân hàng
                    </h2>
                  </Link>
                  <p className="text-[#6b7987] text-sm line-clamp-2 leading-relaxed mb-5">
                    Các chuyên gia bảo mật vừa phát hiện một chuỗi tấn công tinh vi sử dụng công nghệ giả dạng giọng nói AI để vượt qua lớp xác thực...
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <Shield size={13} className="text-gray-400" />
                      </div>
                      <span className="text-xs font-bold text-[#1D1D1F]">Ban Biên Tập</span>
                    </div>
                    <div className="flex items-center gap-5 text-[#8A9BB0] text-[10px] font-black">
                      <div className="flex items-center gap-1.5"><MessageSquare size={13} /><span>15</span></div>
                      <div className="flex items-center gap-1.5"><Heart size={13} /><span>56</span></div>
                    </div>
                  </div>
                </div>
              </article>

            </div>

            {/* Load More */}
            <div className="flex justify-center mt-14 pt-8 border-t border-[#E8EAED]">
              <button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="flex items-center justify-center bg-white border border-[#E8EAED] text-[#6b7987] text-xs font-black uppercase tracking-[0.18em] px-10 py-3.5 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm hover-lift disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2.5"></div>
                ) : (
                  <RefreshCcw size={15} className="mr-2.5" />
                )}
                <span>{isLoadingMore ? 'Đang tải...' : 'Tải thêm bài viết'}</span>
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="col-span-1 md:col-span-4 lg:col-span-3 space-y-8">

            {/* Trending */}
            <div className="bg-white rounded-[28px] p-7 border border-[#E8EAED] shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-[#1D1D1F] text-[13px] uppercase tracking-widest leading-tight w-24">Xu hướng hôm nay</h3>
                <TrendingUp size={22} className="text-primary" />
              </div>
              <div className="space-y-7">
                {[
                  { num: '01', title: 'iPhone 16 Ultra: Khung Titan cấp độ 5', views: '1.2k lượt đọc', tag: 'Tin nóng' },
                  { num: '02', title: 'ChatGPT 5 và khả năng suy luận vượt bậc', views: '950 lượt đọc', tag: 'AI' },
                  { num: '03', title: 'Tesla ra mắt robot giúp việc giá rẻ', views: '820 lượt đọc', tag: 'Robotics' },
                ].map((trend) => (
                  <div key={trend.num} className="flex gap-4 cursor-pointer group/item">
                    <span className="text-3xl font-black text-gray-200 leading-none shrink-0">{trend.num}</span>
                    <div>
                      <h4 className="font-bold text-[12px] leading-tight mb-1.5 group-hover/item:text-primary transition-colors text-[#1D1D1F]">{trend.title}</h4>
                      <p className="text-[10px] text-[#8A9BB0] font-bold uppercase tracking-widest">{trend.views} • {trend.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Curators */}
            <div className="bg-white rounded-[28px] p-7 border border-[#E8EAED] shadow-sm">
              <div className="flex justify-between items-baseline mb-7">
                <h3 className="font-black text-[#1D1D1F] text-[13px] uppercase tracking-widest">Top Curators</h3>
                <Link href="#" className="text-[9px] font-black text-primary uppercase tracking-[0.2em] hover:underline">Xem tất cả</Link>
              </div>
              <div className="space-y-5 mb-8">
                {[
                  { name: 'Thanh Tùng', followers: '2.4k followers', img: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=100', verified: true },
                  { name: 'Bích Ngọc', followers: '1.8k followers', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=100', verified: true },
                  { name: 'Phan Quân', followers: '940 followers', init: 'PQ', verified: false },
                ].map((curator) => (
                  <div key={curator.name} className="flex items-center gap-3 cursor-pointer group/c">
                    {curator.img ? (
                      <div className="w-11 h-11 rounded-2xl overflow-hidden shrink-0 group-hover/c:scale-105 transition-transform">
                        <img src={curator.img} alt={curator.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-[#F0F2F5] flex items-center justify-center font-black text-primary text-sm shrink-0 group-hover/c:scale-105 transition-transform">
                        {curator.init}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-black text-[13px] text-[#1D1D1F] flex items-center gap-1 group-hover/c:text-primary transition-colors">
                        {curator.name}
                        {curator.verified && <CheckCircle size={11} className="text-green-500 shrink-0" fill="currentColor" />}
                      </h4>
                      <p className="text-[10px] text-[#8A9BB0] font-bold uppercase tracking-widest">{curator.followers}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#F0F2F5] text-[#1D1D1F] font-black py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all">
                Trở thành Curator
              </button>
            </div>

            {/* Footer links */}
            <div className="space-y-4 px-1">
              <div className="flex justify-between text-[10px] font-bold text-[#8A9BB0] uppercase tracking-widest">
                <Link href="#" className="hover:text-primary transition-colors">Về chúng tôi</Link>
                <Link href="#" className="hover:text-primary transition-colors">Điều khoản</Link>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[#8A9BB0] uppercase tracking-widest">
                <Link href="#" className="hover:text-primary transition-colors">Quảng cáo</Link>
                <Link href="#" className="hover:text-primary transition-colors">Liên hệ</Link>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed pt-5 border-t border-gray-100 font-medium">
                © 2024 The Digital Curator. All rights reserved.<br />Giấy phép MXH số 123/GP-BTTTT.
              </p>
            </div>

      </aside>
    </div>
  </div>
</div>
);
}
