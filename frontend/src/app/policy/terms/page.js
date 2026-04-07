'use client';

import { Shield, Users, MessageSquare, AlertTriangle, FileText, CheckCircle, Info, ExternalLink, Mail, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function TermsPage() {
  const sections = [
    { id: 'intro', title: '1. Giới thiệu chung' },
    { id: 'membership', title: '2. Tư cách thành viên' },
    { id: 'content', title: '3. Quy định nội dung (Bento Grid)' },
    { id: 'review', title: '4. Tiêu chuẩn Đánh giá (Review)' },
    { id: 'sanctions', title: '5. Kiểm duyệt & Kỷ luật' },
    { id: 'data', title: '6. Bảo mật dữ liệu' },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="container-custom py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-28 bg-[#F1F3F4] rounded-2xl p-6 border border-[#E8EAED]">
              <h4 className="text-[12px] font-black text-primary uppercase tracking-[0.2em] mb-6">Mục lục pháp lý</h4>
              <nav className="flex flex-col gap-4">
                {sections.map((section) => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`} 
                    className="text-[13px] font-bold text-[#5e6b7d] hover:text-primary transition-colors leading-tight"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="mt-10 bg-[#E7F5EA] rounded-xl p-5 border border-[#C6E7CE]">
                <div className="flex items-center gap-3 mb-3 text-[#2C7A32]">
                  <Shield size={18} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Cam kết tin cậy</span>
                </div>
                <p className="text-[11px] font-bold text-[#2C7A32]/80 leading-relaxed">
                  Cộng đồng của chúng tôi được xây dựng trên sự minh bạch và trung thực trong mọi bài đánh giá công nghệ.
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-grow max-w-4xl">
            {/* Page Header */}
            <div className="mb-14">
              <Breadcrumbs items={[{ label: 'Chính sách', href: '/policy' }, { label: 'Điều khoản sử dụng' }]} />
              <span className="bg-[#E8F0FE] text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm shadow-blue-500/10">
                Cập nhật: 20 Tháng 5, 2024
              </span>
              <h1 className="text-[48px] font-black text-[#1D1D1F] tracking-tighter mt-6 mb-4 leading-[1.1]">
                Điều khoản sử dụng & <br /> <span className="text-primary">Quy tắc cộng đồng</span>
              </h1>
              <p className="text-[#8A9BB0] text-[18px] font-bold leading-relaxed max-w-2xl">
                Chào mừng bạn đến với The Digital Curator. Bằng cách tham gia vào cộng đồng của chúng tôi, bạn đồng ý tuân thủ các nguyên tắc được thiết kế để duy trì một môi trường đánh giá công nghệ văn minh, khách quan và có chiều sâu.
              </p>
            </div>

            <div className="space-y-20">
              
              {/* 1. GIỚI THIỆU CHUNG */}
              <section id="intro" className="scroll-mt-28">
                <div className="w-12 h-1 bg-primary mb-8"></div>
                <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight mb-8">1. Giới thiệu chung</h2>
                <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm leading-relaxed text-[#444] font-medium text-[16px]">
                  Các Điều khoản này điều chỉnh việc bạn truy cập và sử dụng trang web, diễn đàn và các dịch vụ của <b>The Digital Curator</b>. Mục tiêu của chúng tôi là tạo ra một không gian nơi các chuyên gia và người đam mê có thể chia sẻ kiến thức công nghệ một cách trung thực nhất.
                </div>
              </section>

              {/* 3. QUY ĐỊNH NỘI DUNG (BENTO GRID) */}
              <section id="content" className="scroll-mt-28">
                <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight mb-8">3. Quy định nội dung (Bento Grid)</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Item 1: IP */}
                  <div className="md:col-span-2 bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-[#E8F0FE] rounded-2xl flex items-center justify-center text-primary mb-8 shadow-inner">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-black text-[#1D1D1F] mb-3">Quyền sở hữu trí tuệ</h3>
                      <p className="text-[#8A9BB0] font-bold text-[14px] leading-relaxed">
                        Mọi bài đánh giá, hình ảnh và video bạn đăng tải phải thuộc quyền sở hữu của bạn. Chúng tôi không chấp nhận hành vi sao chép từ các nguồn khác mà không có sự đồng ý hoặc trích dẫn rõ ràng.
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Spam (Vertical) */}
                  <div className="bg-primary rounded-[40px] p-10 text-white flex flex-col items-center justify-center text-center shadow-2xl shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300">
                    <div className="text-[52px] font-black mb-2 leading-none">0%</div>
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] opacity-80 mb-6">Chấp nhận tin rác<br/>(SPAM)</div>
                    <AlertTriangle size={32} className="opacity-40" />
                  </div>

                  {/* Item 3: Respect */}
                  <div className="bg-[#F1F3F4] rounded-[40px] p-10 flex flex-col justify-between hover:bg-white border border-transparent hover:border-[#E8EAED] hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-8 shadow-sm">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-black text-[#1D1D1F] mb-3">Tôn trọng cộng đồng</h3>
                      <p className="text-[#8A9BB0] font-bold text-[13px] leading-relaxed">
                        Không công kích cá nhân, phân biệt đối xử hoặc sử dụng ngôn từ kích động thù ghét trong các cuộc thảo luận.
                      </p>
                    </div>
                  </div>

                  {/* Item 4: Ads */}
                  <div className="md:col-span-2 bg-[#E8F0FE] rounded-[40px] p-10 flex items-center gap-8 group hover:bg-white border border-transparent hover:border-[#E8EAED] transition-all duration-300">
                    <div className="flex-grow">
                      <h3 className="text-[18px] font-black text-[#1D1D1F] mb-3">Nội dung quảng cáo</h3>
                      <p className="text-[#5e6b7d] font-bold text-[14px] leading-relaxed">
                        Mọi hình thức quảng cáo, affiliate link hoặc nội dung được tài trợ phải được khai báo rõ ràng bằng tag "Sponsored" hoặc "Ad".
                      </p>
                    </div>
                    <MessageSquare size={48} className="text-primary/20 shrink-0 group-hover:text-primary/40 transition-colors" />
                  </div>
                </div>
              </section>

              {/* 4. TIÊU CHUẨN ĐÁNH GIÁ */}
              <section id="review" className="scroll-mt-28">
                <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight mb-8">4. Tiêu chuẩn Đánh giá (Review)</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-[32px] p-8 border-l-8 border-primary shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                       <div className="w-14 h-14 bg-[#F1F3F4] rounded-2xl flex items-center justify-center text-primary shrink-0"><CheckCircle size={24} /></div>
                       <div>
                          <h4 className="text-[17px] font-black text-[#1D1D1F] mb-1">Tính xác thực</h4>
                          <p className="text-[#8A9BB0] text-[14px] font-bold">Người dùng chỉ nên đánh giá những sản phẩm họ đã trực tiếp trải nghiệm. Các bài đánh giá "ảo" sẽ bị gỡ bỏ ngay lập tức.</p>
                       </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-[32px] p-8 border-l-8 border-[#0056D2] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                       <div className="w-14 h-14 bg-[#F1F3F4] rounded-2xl flex items-center justify-center text-primary shrink-0"><Info size={24} /></div>
                       <div>
                          <h4 className="text-[17px] font-black text-[#1D1D1F] mb-1">Tính khách quan</h4>
                          <p className="text-[#8A9BB0] text-[14px] font-bold">Nêu rõ cả ưu điểm và nhược điểm. Một bài đánh giá quá thiên kiến (chỉ khen hoặc chỉ chê) không có dẫn chứng sẽ bị xem xét lại.</p>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. KIỂM DUYỆT & KỶ LUẬT */}
              <section id="sanctions" className="scroll-mt-28">
                <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight mb-8">5. Kiểm duyệt & Kỷ luật</h2>
                <div className="bg-[#F1F3F4] rounded-[48px] p-12 border border-[#E8EAED]">
                  <ul className="space-y-8">
                    <li className="flex items-start gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                      <p className="text-[#1D1D1F] font-black text-[15px] leading-relaxed">
                        <span className="text-red-500 uppercase tracking-widest mr-3">Cảnh báo lần 1:</span> Khóa quyền đăng bài trong 24 giờ đối với vi phạm nhẹ.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                      <p className="text-[#1D1D1F] font-black text-[15px] leading-relaxed">
                        <span className="text-red-500 uppercase tracking-widest mr-3">Cảnh báo lần 2:</span> Khóa tài khoản 7 ngày và xóa các nội dung vi phạm.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 mt-2 shrink-0 shadow-sm shadow-red-500/50 animate-pulse"></div>
                      <p className="text-[#1D1D1F] font-black text-[15px] leading-relaxed">
                        <span className="text-red-600 uppercase tracking-widest mr-3 underline decoration-red-600/30">Vi phạm nghiêm trọng:</span> Khóa tài khoản vĩnh viễn không cần báo trước đối với hành vi lừa đảo hoặc phá hoại.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>

              {/* BOTTOM CTA CALLOUT */}
              <section className="bg-primary rounded-[48px] p-16 text-center text-white shadow-2xl shadow-blue-500/30 overflow-hidden relative group">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>
                
                <h2 className="text-[32px] font-black mb-4 relative z-10">Bạn có thắc mắc về quy định?</h2>
                <p className="text-white/70 font-bold mb-10 text-[16px] max-w-lg mx-auto relative z-10">
                  Đội ngũ pháp lý và quản trị viên của chúng tôi luôn sẵn sàng hỗ trợ bạn hiểu rõ hơn về quyền lợi khi tham gia.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-5 relative z-10">
                  <button className="bg-white text-primary px-10 py-4 rounded-full text-[14px] font-black hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl shadow-black/10">
                    Liên hệ hỗ trợ <ArrowRight size={18} />
                  </button>
                  <button className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full text-[14px] font-black hover:bg-white/20 transition-all flex items-center gap-2">
                    Tải bản PDF <Download size={18} />
                  </button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
