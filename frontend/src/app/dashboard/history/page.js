'use client';

import { Clock, History, Search, ArrowRight, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function ReadingHistoryPage() {
  const history = [
    {
      id: 1,
      title: 'Trên tay iPhone 15 Pro Max: Titan thực sự khác biệt?',
      category: 'ĐÁNH GIÁ',
      time: '14:30 Today',
      image: 'https://images.unsplash.com/photo-1695653422715-991ec3a0db7a?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      title: 'Top 5 bàn phím cơ tốt nhất dành cho lập trình viên 2024',
      category: 'TƯ VẤN',
      time: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      title: 'Tại sao AMD đang dần chiếm lĩnh thị trường CPU Laptop?',
      category: 'PHÂN TÍCH',
      time: '2 days ago',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">
            Lịch sử đọc
          </h1>
          <p className="text-[#6b7987] text-[13px] font-medium">
            Danh sách các bài viết bạn đã xem gần đây trên The Digital Curator.
          </p>
        </div>
        <div className="relative w-full md:w-64">
           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]" />
           <input 
             type="text" 
             placeholder="Tìm trong lịch sử..." 
             className="w-full bg-[#f1f3f4] border-transparent rounded-full pl-11 pr-6 py-2.5 text-[13px] font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
           />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#E8EAED] overflow-hidden shadow-sm">
        {history.map((item, i) => (
          <div key={item.id} className={`p-6 flex items-center gap-6 group hover:bg-[#F8F9FA] transition-colors ${i !== history.length - 1 ? 'border-b border-[#F1F3F4]' : ''}`}>
             <div className="w-16 h-16 bg-[#F1F3F4] rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
             </div>
             <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                   <span className="text-[10px] font-black text-primary tracking-widest uppercase">{item.category}</span>
                   <span className="text-[10px] font-bold text-[#8A9BB0]">• {item.time}</span>
                </div>
                <h3 className="text-[15px] font-black text-[#1D1D1F] group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
             </div>
             <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-[#8A9BB0] hover:text-primary transition-colors">
                   <Bookmark size={18} />
                </button>
                <Link href="#" className="p-2 text-[#8A9BB0] hover:text-primary transition-colors">
                   <ArrowRight size={18} />
                </Link>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
         <button className="text-[12px] font-black text-[#8A9BB0] hover:text-[#1D1D1F] transition-colors tracking-widest uppercase">
            XÓA TOÀN BỘ LỊCH SỬ
         </button>
      </div>
    </div>
  );
}
