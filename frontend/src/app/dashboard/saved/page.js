import Link from "next/link";
import { ChevronDown, Bookmark, ArrowRight, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function SavedArticlesPage() {
  const savedArticles = [
    {
      id: 1,
      category: "ĐÁNH GIÁ",
      categoryColor: "bg-blue-500",
      timeAgo: "2 giờ trước",
      title: "Đánh giá chi tiết bàn phím custom: Tại sao bạn nên bắt đầu ngay?",
      excerpt: "Tìm hiểu thế giới của các switch, keycap và plate...",
      author: "Hải Đăng",
      authorRole: "Chuyên gia",
      authorInit: "HĐ",
      hasImage: true,
      imageBg: "bg-gray-200",
    },
    {
      id: 2,
      category: "TIN TỨC",
      categoryColor: "bg-gray-600",
      timeAgo: "1 ngày trước",
      title: "Kỷ nguyên AI mới: Những thay đổi lớn trong năm 2024",
      excerpt: "Phân tích tác động của các mô hình ngôn ngữ lớn đến t...",
      author: "Thùy Dương",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
      hasImage: true,
      imageBg: "bg-[#1f2937]", // dark bg for the chip image
    },
    {
      id: 3,
      category: "THỊ TRƯỜNG",
      categoryColor: "bg-emerald-600",
      timeAgo: "3 ngày trước",
      title: "Nên mua Laptop nào trong tầm giá 20 triệu?",
      excerpt: "Tổng hợp danh sách những mẫu Ultrabook tốt nhất dàn...",
      author: "Trung Kiên",
      authorInit: "TK",
      authorColor: "bg-emerald-100/50 text-emerald-800",
      hasImage: true,
      imageBg: "bg-[#1e3a34]", // dark green bg
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">
            Danh sách yêu thích
          </h1>
          <p className="text-[#6b7987] text-[13px] font-medium">
            Quản lý và tổ chức các bài viết công nghệ bạn đã lưu lại.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#F0F2F5] hover:bg-gray-200 text-[#1D1D1F] px-5 py-2.5 rounded-full text-xs font-bold transition-colors">
            Tất cả chuyên mục <ChevronDown size={14} className="text-[#888]" />
          </button>
          <button className="flex items-center gap-2 bg-[#F0F2F5] hover:bg-gray-200 text-[#1D1D1F] px-5 py-2.5 rounded-full text-xs font-bold transition-colors">
            Mới lưu gần đây <ChevronDown size={14} className="text-[#888]" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Saved Items */}
        {savedArticles.map((article) => (
          <article key={article.id} className="bg-white rounded-[24px] border border-[#E8EAED] shadow-sm flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Placeholder */}
            <div className={`md:w-5/12 aspect-square md:aspect-auto ${article.imageBg} relative shrink-0 p-4 border-r border-[#E8EAED]`}>
              <div className="absolute top-4 left-4">
                <span className={`${article.categoryColor} text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md`}>
                  {article.category}
                </span>
              </div>
              {/* Fake images based on category to mirror mockup */}
              {article.id === 1 && (
                <div className="absolute inset-x-4 bottom-8 top-16 bg-[#e0e0e0] rounded bg-[url('https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center shadow-inner opacity-90" />
              )}
              {article.id === 2 && (
                <div className="absolute inset-x-8 bottom-12 top-16 border-2 border-[#374151] rounded-lg shadow-2xl flex items-center justify-center relative bg-[#111827]">
                  <div className="w-16 h-16 bg-[#4b5563] rounded grid grid-cols-3 gap-1 p-1">
                    {[...Array(9)].map((_, i) => <div key={i} className="bg-yellow-500/80 rounded-[2px]" />)}
                  </div>
                </div>
              )}
              {article.id === 3 && (
                <div className="absolute inset-x-4 bottom-8 top-16 flex items-end justify-center">
                  <div className="w-full h-[70%] bg-[#374151] rounded-t-lg relative border-4 border-gray-800 border-b-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 w-[110%] h-2 bg-gray-400 rounded-full" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:w-7/12 flex flex-col pt-5">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                  Lưu {article.timeAgo}
                </span>
                <button className="text-[#888] hover:text-[#1D1D1F] transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>

              <h2 className="text-[17px] font-black leading-snug text-[#1D1D1F] mb-2.5 line-clamp-3">
                {article.title}
              </h2>

              <p className="text-[13px] text-[#6b7987] line-clamp-2 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center gap-2.5">
                  {article.authorImage ? (
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img src={article.authorImage} alt={article.author} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${article.authorColor || 'bg-amber-100 text-amber-800'}`}>
                      {article.authorInit}
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-[#1D1D1F]">{article.author}</span>
                </div>
                
                <Link href="#" className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-wider hover:translate-x-1 transition-transform">
                  ĐỌC TIẾP <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Empty Placeholder Card */}
        <div className="bg-[#F8F9FA] rounded-[24px] border-2 border-dashed border-[#E8EAED] flex flex-col items-center justify-center p-12 text-[#8A9BB0] hover:bg-white hover:border-primary/30 transition-colors cursor-pointer group min-h-[220px]">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-[#E8EAED] group-hover:scale-110 transition-transform">
            <PlusCircle size={24} className="text-primary/70" />
          </div>
          <span className="text-[13px] font-bold text-[#5e6b7d]">Lưu thêm bài viết<br />mới</span>
        </div>

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 mb-4">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#8A9BB0] border border-[#E8EAED] hover:bg-gray-50 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md shadow-blue-500/20">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#1D1D1F] font-bold border border-[#E8EAED] hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#1D1D1F] font-bold border border-[#E8EAED] hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#1D1D1F] border border-[#E8EAED] hover:bg-gray-50 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
