import Link from "next/link";
import { MessageSquare, Award, Star, ThumbsUp, Users, PenTool, Globe, AtSign, MapPin, Share2, Settings, CheckCircle2 } from "lucide-react";

export default function ProfilePage({ params }) {
  // In a real app we'd fetch data using params.username
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      
      {/* ── HERO BANNER & PROFILE HEADER ── */}
      <div className="bg-white border-b border-[#E8EAED] pb-6">
        <div className="container-custom max-w-5xl mx-auto pt-6">
          
          {/* Cover Photo */}
          <div className="w-full h-48 md:h-64 rounded-3xl overflow-hidden relative shadow-sm border border-[#E8EAED]">
            <img 
              src="https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&q=80&w=1200" 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info Row (Overlapping Cover) */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 -mt-16 md:-mt-12 relative z-10 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
              
              {/* Avatar */}
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-lg overflow-hidden relative bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=300" 
                  alt="Minh Triết Trần" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#2C7A32] rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
              </div>

              {/* Name & Titles */}
              <div className="md:mb-3 mt-3 md:mt-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Minh Triết Trần</h1>
                  <span className="bg-[#E4F5E6] text-[#2C7A32] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    CHUYÊN GIA REVIEW
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[#6b7987] text-[12px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} /> <span>Tham gia từ Tháng 5, 2022</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <Star size={14} className="fill-primary" /> <span className="font-bold">2,450 Điểm uy tín</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-5 md:mt-0 md:mb-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-primary text-white px-8 py-2.5 rounded-full text-[13px] font-bold shadow-md shadow-blue-500/20 hover:bg-primary-hover transition-colors">
                Theo dõi
              </button>
              <button className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#5e6b7d] hover:bg-[#F0F2F5] transition-colors shrink-0">
                <Share2 size={16} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#E8EAED] bg-[#F0F2F5] flex items-center justify-center text-[#1D1D1F] hover:bg-[#e4e7ec] transition-colors shrink-0">
                <Settings size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 flex gap-8 border-b border-[#E8EAED]">
            <button className="text-[13px] font-black uppercase tracking-wider text-primary border-b-2 border-primary pb-4 px-1">
              Hoạt động
            </button>
            <button className="text-[13px] font-bold uppercase tracking-wider text-[#8A9BB0] hover:text-[#1D1D1F] transition-colors pb-4 px-1">
              Bài viết đã đăng
            </button>
            <button className="text-[13px] font-bold uppercase tracking-wider text-[#8A9BB0] hover:text-[#1D1D1F] transition-colors pb-4 px-1">
              Bình luận
            </button>
            <button className="text-[13px] font-bold uppercase tracking-wider text-[#8A9BB0] hover:text-[#1D1D1F] transition-colors pb-4 px-1">
              Bạn bè
            </button>
          </div>
        </div>
      </div>

      {/* ── TWO COLUMN MAIN LAYOUT ── */}
      <div className="container-custom max-w-5xl mx-auto pt-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Activity Feed */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {/* Post Activity */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#E8EAED] shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-primary shrink-0">
                <PenTool size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[#6b7987] text-[13px]">
                    Đã đăng một bài viết mới trong <span className="font-bold text-[#1D1D1F] cursor-pointer hover:underline">Đánh giá Công nghệ</span>
                  </p>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#8A9BB0] whitespace-nowrap ml-4">
                    2 GIỜ TRƯỚC
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#1D1D1F] leading-tight mb-4 mt-2 hover:text-primary cursor-pointer transition-colors">
                  Đánh giá chi tiết MacBook Pro M3: Sức mạnh vượt trội nhưng liệu có xứng đáng để nâng cấp?
                </h3>
                
                {/* Article Card Snippet */}
                <div className="rounded-2xl overflow-hidden border border-[#E8EAED] mb-5 aspect-[16/9] bg-gray-100 cursor-pointer group">
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="flex gap-6 mt-4 pt-4 border-t border-[#E8EAED]">
                  <button className="flex items-center gap-2 text-[12px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F] transition-colors">
                    <ThumbsUp size={16} /> <span>128</span>
                  </button>
                  <button className="flex items-center gap-2 text-[12px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F] transition-colors">
                    <MessageSquare size={16} /> <span>42</span>
                  </button>
                  <button className="flex items-center gap-2 text-[12px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F] transition-colors ml-auto">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Activity */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#E8EAED] shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#E4F5E6] rounded-full flex items-center justify-center text-[#2C7A32] shrink-0">
                <MessageSquare size={16} className="fill-current" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[#6b7987] text-[13px]">
                    Đã trả lời một bình luận trong <span className="font-bold text-[#1D1D1F] cursor-pointer hover:underline">Hỏi đáp - Tư vấn mua laptop</span>
                  </p>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#8A9BB0] whitespace-nowrap ml-4">
                    5 GIỜ TRƯỚC
                  </span>
                </div>
                
                <div className="bg-[#F8F9FA] rounded-2xl p-4 md:p-5 border border-[#E8EAED] mb-4 text-[#444] text-[14px] leading-relaxed relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2C7A32] rounded-l-2xl"></div>
                  "Theo kinh nghiệm của mình, nếu bạn làm đồ họa thì nên chọn bản 16GB RAM tối thiểu để tránh bị tràn bộ nhớ khi render video 4K..."
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold text-[#2C7A32]">
                  <ThumbsUp size={14} className="fill-current" /> <span>Bình luận nhận được 12 lượt thích</span>
                </div>
              </div>
            </div>
          </div>

          {/* Load More Button */}
          <button className="w-full bg-white border border-[#E8EAED] text-[#1D1D1F] font-bold text-[12px] py-4 rounded-[20px] hover:bg-[#F8F9FA] transition-colors shadow-sm">
            Xem thêm hoạt động cũ hơn
          </button>
        </div>

        {/* Right Column: Sidebar Stats */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          
          {/* Stats Grid */}
          <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm">
            <h3 className="text-[11px] font-black uppercase text-[#1D1D1F] tracking-widest mb-6">Thống kê cá nhân</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8F9FA] rounded-[16px] p-4 text-center border border-[#E8EAED]">
                <div className="text-2xl font-black text-primary mb-1">156</div>
                <div className="text-[9px] font-black text-[#5e6b7d] uppercase tracking-wider">Bài viết</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-[16px] p-4 text-center border border-[#E8EAED]">
                <div className="text-2xl font-black text-primary mb-1">3.2k</div>
                <div className="text-[9px] font-black text-[#5e6b7d] uppercase tracking-wider">Lượt thích</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-[16px] p-4 text-center border border-[#E8EAED]">
                <div className="text-xl font-black text-[#1D1D1F] mb-1">892</div>
                <div className="text-[9px] font-black text-[#5e6b7d] uppercase tracking-wider">Người theo dõi</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-[16px] p-4 text-center border border-[#E8EAED]">
                <div className="text-xl font-black text-[#1D1D1F] mb-1">420</div>
                <div className="text-[9px] font-black text-[#5e6b7d] uppercase tracking-wider">Đang theo dõi</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm">
            <h3 className="text-[11px] font-black uppercase text-[#1D1D1F] tracking-widest mb-6">Danh hiệu đạt được</h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-[14px] bg-[#FFF8E1] flex items-center justify-center shrink-0">
                  <Award size={20} className="text-[#F57F17] fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1D1D1F] text-[13px] leading-tight mb-0.5">Reviewer Tiên phong</h4>
                  <p className="text-[#8A9BB0] text-[10px] font-medium">Thành viên từ những ngày đầu</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-[14px] bg-[#F3E5F5] flex items-center justify-center shrink-0">
                  <PenTool size={20} className="text-[#7B1FA2] fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1D1D1F] text-[13px] leading-tight mb-0.5">Cây bút Truyền cảm hứng</h4>
                  <p className="text-[#8A9BB0] text-[10px] font-medium">Có hơn 10 bài viết đạt 100+ likes</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-[14px] bg-[#E3F2FD] flex items-center justify-center shrink-0">
                  <Star size={20} className="text-[#1976D2] fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1D1D1F] text-[13px] leading-tight mb-0.5">Chuyên gia Phần cứng</h4>
                  <p className="text-[#8A9BB0] text-[10px] font-medium">Đạt điểm uy tín cao nhất hạng mục</p>
                </div>
              </div>
            </div>
            <button className="w-full text-center mt-6 text-[11px] font-black text-primary uppercase tracking-widest hover:underline">
              Xem tất cả 12 danh hiệu
            </button>
          </div>

          {/* About */}
          <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm">
             <h3 className="text-[11px] font-black uppercase text-[#1D1D1F] tracking-widest mb-4">Giới thiệu</h3>
             <p className="text-[#5e6b7d] text-[13px] leading-relaxed mb-6">
               Yêu công nghệ, đam mê nhiếp ảnh và thích khám phá những thiết bị phần cứng mới nhất. Luôn cố gắng mang đến những bài đánh giá công tâm và chi tiết nhất cho cộng đồng.
             </p>
             <div className="flex gap-3">
               <a href="#" className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#1D1D1F] hover:bg-[#F0F2F5] transition-colors"><Globe size={16} /></a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#1D1D1F] hover:bg-[#F0F2F5] transition-colors"><AtSign size={16} /></a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#1D1D1F] hover:bg-[#F0F2F5] transition-colors"><Users size={16} /></a>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
