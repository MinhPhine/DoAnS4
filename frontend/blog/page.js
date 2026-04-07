'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { articleService } from '@/services/articleService';
import { Search, Filter, Newspaper } from 'lucide-react';

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await articleService.getAll();
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-[32px] p-12 mb-12 border border-[#E8EAED] relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-[13px] mb-4 uppercase tracking-[0.2em]">
              <Newspaper size={16} /> Digital Curator News
            </div>
            <h1 className="text-[48px] font-black text-[#1D1D1F] leading-[1.1] mb-6 tracking-tighter">
              Kiến thức & Xu hướng <span className="text-primary">Nghệ thuật số.</span>
            </h1>
            <p className="text-[17px] text-[#444] leading-relaxed mb-8 font-medium">
              Khám phá những bài viết chuyên sâu về công nghệ, thiết kế và văn hóa số từ các chuyên gia hàng đầu.
            </p>
            
            <div className="flex items-center bg-[#F1F3F4] rounded-full px-6 py-4 max-w-md border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
              <Search size={18} className="text-[#888] mr-3" />
              <input 
                type="text" 
                placeholder="Tìm nội dung bạn quan tâm..."
                className="bg-transparent w-full focus:outline-none text-[15px] font-medium"
              />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent hidden lg:block"></div>
        </div>

        {/* Filters & Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-[15px] font-black text-[#1D1D1F] mb-4 flex items-center gap-2">
                <Filter size={16} /> Chuyên mục
              </h3>
              <div className="space-y-1">
                {['Tất cả', 'Công nghệ', 'Thiết kế', 'Blockchain', 'AI Art', 'Xu hướng'].map((cat) => (
                  <button 
                    key={cat}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                      cat === 'Tất cả' ? 'bg-primary text-white shadow-md shadow-blue-500/20' : 'hover:bg-[#F0F2F5] text-[#555]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-[#E8EAED]"></div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map(article => (
                  <BlogCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-20 text-center border border-[#E8EAED]">
                <div className="w-20 h-20 bg-[#F0F2F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8A9BB0]">
                   <Newspaper size={40} />
                </div>
                <h3 className="text-[18px] font-black text-[#1D1D1F] mb-2">Chưa có bài viết nào</h3>
                <p className="text-[#555] text-[14px]">Chúng tôi đang chuẩn bị những nội dung tuyệt vời dành cho bạn.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
