import { Search, Filter, Eye, Edit3, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

export default function PostManagementPage() {
  const posts = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=100',
      status: 'ĐÃ XUẤT BẢN',
      statusColor: 'bg-[#E7F5EA] text-[#2C7A32]',
      date: '14 Tháng 5, 2024',
      title: 'Review chi tiết GPU RTX 5090: Sức mạnh không giới hạn',
      views: '28.4K',
      comments: '152',
      likes: '4.2K'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=100',
      status: 'ĐANG CHỜ DUYỆT',
      statusColor: 'bg-[#E8F0FE] text-[#0056D2]',
      date: 'Vừa xong',
      title: 'AI sẽ thay đổi thế giới lập trình như thế nào trong 2 năm tới?',
      views: '0',
      comments: '0',
      likes: '0',
      pendingIcon: true
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=100',
      status: 'NHÁP',
      statusColor: 'bg-gray-100 text-gray-500',
      date: 'Cập nhật 2 ngày trước',
      title: 'Top 10 thiết bị Smarthome đáng mua nhất năm 2024',
      views: '--',
      comments: '--',
      likes: '--'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20a5bf616f?auto=format&fit=crop&q=80&w=100',
      status: 'ĐÃ XUẤT BẢN',
      statusColor: 'bg-[#E7F5EA] text-[#2C7A32]',
      date: '10 Tháng 5, 2024',
      title: 'MacBook Air M3: Liệu có đáng để nâng cấp từ bản M1?',
      views: '12.1K',
      comments: '84',
      likes: '1.8K'
    }
  ];

  return (
    <div className="p-8 lg:p-12">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Quản lý bài đăng</h1>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full bg-white border border-[#E8EAED] rounded-full py-3 pl-12 pr-4 text-[13px] font-medium outline-none"
            />
          </div>
          <button className="p-3 bg-white border border-[#E8EAED] rounded-xl text-[#1D1D1F] hover:bg-[#F8F9FA] transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-10 border-b border-[#E8EAED] mb-8 overflow-x-auto scrollbar-hide">
         {[
           { label: 'Tất cả', count: 42, active: true },
           { label: 'Đã xuất bản', count: 36 },
           { label: 'Đang nháp', count: 4 },
           { label: 'Chờ duyệt', count: 2 }
         ].map((tab, i) => (
           <button 
             key={i} 
             className={`pb-4 text-[13px] font-bold transition-all whitespace-nowrap border-b-2 ${tab.active ? 'text-[#0056D2] border-[#0056D2]' : 'text-[#8A9BB0] border-transparent hover:text-[#1D1D1F]'}`}
           >
             {tab.label} <span className="ml-1 opacity-60">({tab.count})</span>
           </button>
         ))}
      </div>

      {/* POST LIST */}
      <div className="space-y-4 mb-12">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[24px] p-4 flex items-center gap-6 border border-[#E8EAED] hover:shadow-xl hover:shadow-black/5 transition-all group">
             {/* Thumbnail */}
             <div className="w-20 h-20 bg-[#F8F9FA] rounded-xl overflow-hidden border border-[#E8EAED] flex items-center justify-center shrink-0">
                <img src={post.thumbnail} alt="Post" className="w-full h-full object-cover p-1 rounded-lg" />
             </div>

             {/* Content */}
             <div className="flex-grow flex flex-col gap-1">
                <div className="flex items-center gap-3">
                   <span className={`${post.statusColor} text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider`}>
                     {post.status}
                   </span>
                   <span className="text-[11px] font-bold text-[#8A9BB0]">{post.date}</span>
                </div>
                <h3 className="text-[15px] font-black text-[#1D1D1F] line-clamp-1 group-hover:text-[#0056D2] transition-colors">
                  {post.title}
                </h3>
             </div>

             {/* Stats */}
             <div className="hidden lg:flex items-center gap-10 px-6 border-x border-[#E8EAED]">
                <div className="flex flex-col items-center">
                   <span className="text-[13px] font-black text-[#1D1D1F]">{post.views}</span>
                   <span className="text-[9px] font-bold text-[#8A9BB0] uppercase">VIEWS</span>
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-[13px] font-black text-[#1D1D1F]">{post.comments}</span>
                   <span className="text-[9px] font-bold text-[#8A9BB0] uppercase">COMMENTS</span>
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-[13px] font-black text-[#1D1D1F]">{post.likes}</span>
                   <span className="text-[9px] font-bold text-[#8A9BB0] uppercase">LIKES</span>
                </div>
             </div>

             {/* Actions */}
             <div className="flex items-center gap-2 pl-4">
                <Link href="/creator/editor" className="p-2.5 bg-[#F8F9FA] rounded-lg text-[#8A9BB0] hover:text-[#0056D2] transition-colors"><Edit3 size={18} /></Link>
                <button className="p-2.5 bg-[#F8F9FA] rounded-lg text-[#8A9BB0] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
             </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#8A9BB0] hover:bg-[#F8F9FA] transition-colors"><ChevronLeft size={18} /></button>
        <div className="flex items-center gap-2">
           <button className="w-10 h-10 rounded-full bg-[#0056D2] text-white font-black text-[13px]">1</button>
           <button className="w-10 h-10 rounded-full text-[#1D1D1F] font-bold text-[13px] hover:bg-[#F8F9FA]">2</button>
           <button className="w-10 h-10 rounded-full text-[#1D1D1F] font-bold text-[13px] hover:bg-[#F8F9FA]">3</button>
           <span className="text-[#8A9BB0] px-2">...</span>
           <button className="w-10 h-10 rounded-full text-[#1D1D1F] font-bold text-[13px] hover:bg-[#F8F9FA]">12</button>
        </div>
        <button className="w-10 h-10 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#8A9BB0] hover:bg-[#F8F9FA] transition-colors"><ChevronRight size={18} /></button>
      </div>

    </div>
  );
}
