'use client';

import { Shield, Lock, Eye, FileSearch, UserCheck, ShieldAlert, Cpu, Database, Mail, ArrowRight, Settings, Trash2, Edit3, Globe, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function PrivacyPage() {
  const sections = [
    { id: 'intro', num: '01', title: 'Giới thiệu', desc: 'Chào mừng bạn đến với **The Digital Curator**. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn truy cập trang web và sử dụng các dịch vụ đánh giá công nghệ của chúng tôi.' },
    { id: 'collection', num: '02', title: 'Dữ liệu chúng tôi thu thập' },
    { id: 'usage', num: '03', title: 'Cách sử dụng thông tin' },
    { id: 'protection', num: '04', title: 'Bảo mật dữ liệu' },
    { id: 'rights', num: '05', title: 'Quyền của bạn' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* STICKY SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-6">Mục lục</h4>
                <nav className="flex flex-col gap-5">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="flex items-center gap-4 group">
                      <span className="text-[11px] font-black text-[#8A9BB0] group-hover:text-primary transition-colors">{s.num}</span>
                      <span className="text-[14px] font-bold text-[#1D1D1F] group-hover:text-primary transition-colors">{s.title}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-primary rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20">
                <h5 className="text-[15px] font-black mb-4 leading-tight">Cần hỗ trợ?</h5>
                <p className="text-white/70 text-[12px] font-bold leading-relaxed mb-6">Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ với đội ngũ hỗ trợ.</p>
                <button className="w-full bg-white text-primary py-3.5 rounded-2xl text-[12px] font-black hover:bg-gray-100 transition-all">
                  Liên hệ ngay
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-grow max-w-4xl">
            {/* Header */}
            <div className="mb-20">
               <Breadcrumbs items={[{ label: 'Chính sách', href: '/policy' }, { label: 'Bảo mật' }]} />
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-[#E7F5EA] text-[#2C7A32] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2">
                   <Shield size={14} /> Cập nhật lần cuối: 24 Tháng 5, 2024
                 </div>
               </div>
               <h1 className="text-[56px] font-black text-[#1D1D1F] tracking-tighter mb-8 leading-none">
                 Chính sách <br/> <span className="text-primary">bảo mật thông tin</span>
               </h1>
               <p className="text-[#8A9BB0] text-[18px] font-bold leading-relaxed">
                 Tại The Digital Curator, sự riêng tư của bạn là ưu tiên hàng đầu của chúng tôi. Tài liệu này giải thích cách chúng tôi xử lý dữ liệu của bạn một cách minh bạch và an toàn.
               </p>
            </div>

            <div className="space-y-24">
              
              {/* 01. GIỚI THIỆU */}
              <section id="intro" className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-10">
                   <span className="text-[48px] font-black text-primary/10 leading-none">01</span>
                   <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight">Giới thiệu</h2>
                </div>
                <div className="bg-[#F8F9FA] rounded-[40px] p-12 border border-[#E8EAED] leading-relaxed text-[#444] font-medium text-[17px] shadow-sm relative overflow-hidden">
                   <p className="relative z-10">{sections[0].desc}</p>
                   <p className="mt-8 relative z-10">Bằng cách sử dụng nền tảng của chúng tôi, bạn đồng ý với các thực hành được mô tả trong chính sách này. Chúng tôi cam kết không bán dữ liệu của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại.</p>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                </div>
              </section>

              {/* 02. DỮ LIỆU THU THẬP */}
              <section id="collection" className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-10">
                   <span className="text-[48px] font-black text-primary/10 leading-none">02</span>
                   <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight">Dữ liệu chúng tôi thu thập</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm group hover:-translate-y-1 transition-all">
                      <div className="w-14 h-14 bg-[#E8F0FE] rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform"><UserCheck size={28} /></div>
                      <h3 className="text-[19px] font-black text-[#1D1D1F] mb-3">Thông tin đăng ký</h3>
                      <p className="text-[#8A9BB0] text-[14px] font-bold leading-relaxed">Tên, địa chỉ email, ảnh đại diện và thông tin hồ sơ khi bạn tạo tài khoản để bình luận và đánh giá.</p>
                   </div>
                   <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm group hover:-translate-y-1 transition-all">
                      <div className="w-14 h-14 bg-[#F8F9FA] rounded-2xl border border-[#F1F3F4] flex items-center justify-center text-[#1D1D1F] mb-8 group-hover:scale-110 transition-transform"><Cpu size={28} /></div>
                      <h3 className="text-[19px] font-black text-[#1D1D1F] mb-3">Thông tin kỹ thuật</h3>
                      <p className="text-[#8A9BB0] text-[14px] font-bold leading-relaxed">Địa chỉ IP, loại trình duyệt, hệ điều hành và dữ liệu về cách bạn tương tác với các bài viết của chúng tôi.</p>
                   </div>
                </div>
                <div className="mt-10 p-8 border-l-4 border-primary bg-[#F1F3F4]/50 rounded-r-[24px] text-[15px] font-bold text-[#5e6b7d] italic leading-relaxed">
                   "Chúng tôi thu thập dữ liệu để cá nhân hóa trải nghiệm đọc và cải thiện chất lượng nội dung công nghệ dựa trên sở thích của cộng đồng."
                </div>
              </section>

              {/* 03. CÁCH SỬ DỤNG THÔNG TIN */}
              <section id="usage" className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-10">
                   <span className="text-[48px] font-black text-primary/10 leading-none">03</span>
                   <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight">Cách sử dụng thông tin</h2>
                </div>
                <div className="bg-white rounded-[40px] p-10 border border-[#E8EAED] shadow-sm space-y-8">
                   {[
                     { icon: CheckCircle, text: 'Duy trì và cung cấp các tính năng cộng đồng như diễn đàn và hệ thống đánh giá.' },
                     { icon: CheckCircle, text: 'Gửi thông báo về bài viết mới, cập nhật sản phẩm công nghệ quan trọng (nếu bạn đăng ký nhận tin).' },
                     { icon: CheckCircle, text: 'Ngăn chặn các hành vi spam, lạm dụng hoặc vi phạm tiêu chuẩn cộng đồng của The Digital Curator.' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#E7F5EA] text-[#2C7A32] flex items-center justify-center shrink-0 mt-0.5"><item.icon size={16} /></div>
                        <p className="text-[#1D1D1F] font-black text-[16px] leading-relaxed">{item.text}</p>
                     </div>
                   ))}
                </div>
              </section>

              {/* 04. BẢO MẬT DỮ LIỆU */}
              <section id="protection" className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-10">
                   <span className="text-[48px] font-black text-primary/10 leading-none">04</span>
                   <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight">Bảo mật dữ liệu</h2>
                </div>
                <div className="bg-[#1D1D1F] rounded-[48px] p-12 text-white relative overflow-hidden group shadow-2xl">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                   <h4 className="text-primary text-[11px] font-black uppercase tracking-[0.3em] mb-6 relative z-10">Công nghệ bảo mật hàng đầu</h4>
                   <p className="text-[20px] font-black leading-relaxed mb-10 relative z-10">
                     Chúng tôi sử dụng mã hóa SSL (Secure Sockets Layer) 256-bit để đảm bảo mọi dữ liệu truyền đi giữa trình duyệt của bạn và máy chủ của chúng tôi luôn được bảo vệ tuyệt đối.
                   </p>
                   <div className="flex flex-wrap items-center gap-x-12 gap-y-6 relative z-10">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20"><Lock size={20} /></div>
                         <div className="text-[12px] font-bold text-white/70 tracking-wide uppercase">256-bit AES</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20"><Globe size={20} /></div>
                        <div className="text-[12px] font-bold text-white/70 tracking-wide uppercase">DDoS Protection</div>
                      </div>
                      <div className="ml-auto flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">
                        <Database size={14} /> Hệ thống được giám sát 24/7
                      </div>
                   </div>
                </div>
              </section>

              {/* 05. QUYỀN CỦA BẠN */}
              <section id="rights" className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-10">
                   <span className="text-[48px] font-black text-primary/10 leading-none">05</span>
                   <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight">Quyền của bạn</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-[#F8F9FA] rounded-[32px] p-8 border border-[#E8EAED] hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6"><Eye size={20} /></div>
                      <h4 className="text-[16px] font-black text-[#1D1D1F] mb-3">Truy cập</h4>
                      <p className="text-[#8A9BB0] text-[13px] font-bold leading-relaxed">Bạn có quyền yêu cầu bản sao tất cả dữ liệu cá nhân mà chúng tôi lưu trữ.</p>
                   </div>
                   <div className="bg-[#F8F9FA] rounded-[32px] p-8 border border-[#E8EAED] hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6"><Edit3 size={20} /></div>
                      <h4 className="text-[16px] font-black text-[#1D1D1F] mb-3">Chỉnh sửa</h4>
                      <p className="text-[#8A9BB0] text-[13px] font-bold leading-relaxed">Dễ dàng cập nhật thông tin cá nhân của bạn thông qua trang quản lý tài khoản.</p>
                   </div>
                   <div className="bg-[#F8F9FA] rounded-[32px] p-8 border border-[#E8EAED] hover:bg-white hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6"><Trash2 size={20} /></div>
                      <h4 className="text-[16px] font-black text-[#1D1D1F] mb-3">Xóa bỏ</h4>
                      <p className="text-[#8A9BB0] text-[13px] font-bold leading-relaxed">Quyền "được quên" - yêu cầu xóa hoàn toàn tài khoản của bạn tại bất cứ lúc nào.</p>
                   </div>
                </div>
              </section>

              <div className="pt-20 border-t border-[#F1F3F4] text-center">
                 <p className="text-[#8A9BB0] text-[14px] font-bold italic leading-relaxed">
                   Cảm ơn bạn đã tin tưởng và đồng hành cùng The Digital Curator. Chúng tôi luôn nỗ lực vì một môi trường internet an toàn và minh bạch.
                 </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
