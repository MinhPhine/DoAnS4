import { Eye, Users, FileText, Heart, ArrowUpRight, MessageSquare, ChevronRight, Edit3, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreatorDashboardOverview() {
  const stats = [
    { label: 'Tổng lượt xem', value: '1.2M+', change: '+12.5%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Người theo dõi', value: '8.4K', change: '+5.2%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Bài viết mới', value: '12', change: 'Tháng này', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Tương tác', value: '45.2K', change: '+8.1%', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' }
  ];

  return (
    <div className="p-8 lg:p-12">
      <header className="flex justify-between items-center mb-10">
         <div>
            <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Bảng điều khiển</h1>
            <p className="text-[#8A9BB0] text-[13px] font-bold mt-1 uppercase tracking-widest">Chào buổi sáng, Hoàng Việt!</p>
         </div>
         <Link href="/creator/editor" className="bg-[#0056D2] text-white px-6 py-3 rounded-xl font-black text-[13px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
           <Plus size={18} /> Viết bài mới
         </Link>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {stats.map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[24px] border border-[#E8EAED] shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                 <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}><stat.icon size={20} /></div>
                 <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                   {stat.change} <ArrowUpRight size={10} />
                 </span>
              </div>
              <div className="text-2xl font-black text-[#1D1D1F] mb-1">{stat.value}</div>
              <div className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest">{stat.label}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* RECENT ACTIVITY */}
         <div className="lg:col-span-2 bg-white rounded-[32px] border border-[#E8EAED] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-[16px] font-black text-[#1D1D1F]">Bài viết gần đây</h3>
               <Link href="/creator/posts" className="text-[11px] font-black text-[#0056D2] hover:underline uppercase tracking-widest">Xem tất cả</Link>
            </div>
            <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-12 bg-[#F8F9FA] rounded-lg overflow-hidden shrink-0 border border-[#E8EAED]">
                       <img src={`https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=150`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                       <h4 className="text-[14px] font-black text-[#1D1D1F] group-hover:text-[#0056D2] transition-colors line-clamp-1">Review chi tiết GPU RTX 5090: Sức mạnh không giới hạn</h4>
                       <span className="text-[11px] font-bold text-[#8A9BB0]">Đã xuất bản • 14 Tháng 5, 2024</span>
                    </div>
                    <ChevronRight size={18} className="text-[#E8EAED] group-hover:text-[#0056D2] transition-all" />
                 </div>
               ))}
            </div>
         </div>

         {/* TOP PERFORMING */}
         <div className="bg-[#E8F0FE] rounded-[32px] p-8 relative overflow-hidden flex flex-col items-center text-center">
            <div className="relative z-10 w-full">
               <span className="text-[10px] font-black text-[#0056D2] uppercase tracking-[0.2em] mb-4 block">BÀI VIẾT NỔI BẬT</span>
               <div className="w-24 h-24 bg-white rounded-3xl p-2 mx-auto mb-6 shadow-xl shadow-blue-500/10 rotate-6">
                  <img src="https://images.unsplash.com/photo-1695048133142-1a20a5bf616f?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-2xl" />
               </div>
               <h3 className="text-[18px] font-black text-[#1D1D1F] leading-tight mb-4">
                 Apple Vision Pro: Kỷ nguyên mới...
               </h3>
               <div className="flex justify-center items-center gap-6 mb-8">
                  <div className="flex flex-col">
                     <span className="text-xl font-black text-[#1D1D1F]">45.2K</span>
                     <span className="text-[9px] font-bold text-[#8A9BB0] uppercase">Lượt xem</span>
                  </div>
                  <div className="w-px h-8 bg-[#0056D2]/10" />
                  <div className="flex flex-col">
                     <span className="text-xl font-black text-[#1D1D1F]">1.2K</span>
                     <span className="text-[9px] font-bold text-[#8A9BB0] uppercase">Lưu lại</span>
                  </div>
               </div>
               <Link href="/creator/posts" className="block w-full bg-white text-[#0056D2] py-3 rounded-xl font-black text-[13px] shadow-md shadow-blue-500/5 hover:bg-blue-50 transition-colors">
                  Chi tiết hiệu quả
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
