"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp, LayoutGrid, Edit3, MessageSquare, Eye, Star, CheckCircle2, Award, Clock, Tag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ForumPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        if (res.ok) setArticles(await res.json());
      } catch (err) {
        console.error("Lỗi fetch articles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Bài nổi bật = 3 bài có views cao nhất
  const featured = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);
  // Bài mới nhất
  const latest = articles;

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Vừa xong";
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ngày trước`;
    return `${Math.floor(days / 30)} tháng trước`;
  }

  const tagColors = {
    'hỏi đáp': 'bg-[#E8F0FE] text-[#0056D2]',
    'thủ thuật': 'bg-[#E4F5E6] text-[#2C7A32]',
    'đánh giá': 'bg-[#FFF3E0] text-[#E65100]',
    'so sánh': 'bg-[#F3E5F5] text-[#7B1FA2]',
    'top list': 'bg-[#FCE4EC] text-[#C62828]',
    'hướng dẫn': 'bg-[#E0F7FA] text-[#00838F]',
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 pt-8">
      <div className="container-custom flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-56 shrink-0 space-y-6">
          <div className="mb-2">
            <h2 className="text-[17px] font-black text-[#1D1D1F] tracking-tight mb-1">Khám phá</h2>
            <p className="text-[11px] text-[#8A9BB0] font-medium">Cộng đồng công nghệ</p>
          </div>
          <nav className="space-y-2">
            <Link href="/forum" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-primary font-bold shadow-sm border border-[#E8EAED]">
              <LayoutGrid size={16} /> Mới nhất
            </Link>
            <Link href="/forum" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#5e6b7d] hover:bg-[#E8EAED]/50 font-bold transition-colors">
              <TrendingUp size={16} /> Xu hướng
            </Link>
          </nav>

          <div className="bg-gradient-to-br from-[#0056D2] to-[#003B95] rounded-[24px] p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-110 transition-transform"><Star size={64} /></div>
            <h3 className="font-black text-[15px] mb-1 relative z-10">Nâng cấp Premium</h3>
            <p className="text-[11px] text-white/80 mb-4 leading-relaxed relative z-10 pr-4">Trải nghiệm không quảng cáo & tính năng độc quyền.</p>
            <button className="bg-white/20 hover:bg-white border border-white/30 hover:border-white text-white hover:text-primary backdrop-blur-sm text-[11px] font-black uppercase tracking-widest py-2 px-4 rounded-xl transition-all relative z-10">
              Chỉ từ 49k
            </button>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="flex-1 min-w-0">

          {/* Featured Visual */}
          {!loading && featured.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <Link href={`/forum/${featured[0].slug}`} className="relative rounded-[24px] overflow-hidden aspect-square md:aspect-auto md:row-span-2 group">
                <img src={featured[0].thumbnail || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={featured[0].title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-[#0056D2] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md self-start mb-3">Hot Discussion</span>
                  <h3 className="text-white text-2xl font-black leading-tight drop-shadow-md">{featured[0].title}</h3>
                  <p className="text-white/70 text-[12px] mt-2">{featured[0].views?.toLocaleString()} lượt xem</p>
                </div>
              </Link>
              {featured.slice(1, 3).map(a => (
                <Link key={a._id} href={`/forum/${a.slug}`} className="relative rounded-[24px] overflow-hidden aspect-[21/9] group">
                  <img src={a.thumbnail || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={a.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
                    <h3 className="text-white text-[15px] font-black leading-tight drop-shadow-md">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Articles Feed */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[19px] font-black text-[#1D1D1F] tracking-tight">Cộng đồng Công nghệ</h2>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-[24px] p-6 border border-[#E8EAED] animate-pulse">
                    <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
                    <div className="h-5 bg-gray-100 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {latest.map(article => (
                  <Link key={article._id} href={`/forum/${article.slug}`} className="block">
                    <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm hover:border-[#0056D2]/30 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-[11px] shrink-0">
                          {article.author?.fullname?.charAt(0) || 'U'}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-medium text-[#8A9BB0]">bởi <span className="font-bold text-[#1D1D1F]">{article.author?.fullname || 'Ẩn danh'}</span></span>
                          <span className="w-1 h-1 rounded-full bg-[#E8EAED]"></span>
                          <span className="text-[11px] text-[#8A9BB0] flex items-center gap-1"><Clock size={10} />{timeAgo(article.createdAt)}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        {article.tags && article.tags[0] && (
                          <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded mb-2 mr-2 ${tagColors[article.tags[0]] || 'bg-gray-100 text-gray-600'}`}>
                            {article.tags[0]}
                          </span>
                        )}
                        <h3 className="text-[17px] font-black text-[#1D1D1F] leading-snug group-hover:text-[#0056D2] transition-colors inline">
                          {article.title}
                        </h3>
                      </div>
                      {article.excerpt && (
                        <p className="text-[13px] text-[#5e6b7d] leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
                      )}
                      <div className="flex items-center gap-5 text-[11px] font-bold text-[#5e6b7d] pt-2">
                        <div className="flex items-center gap-1.5"><Eye size={14} /> {article.views?.toLocaleString()} lượt xem</div>
                        {article.tags && article.tags.length > 1 && (
                          <div className="flex items-center gap-1.5"><Tag size={14} /> {article.tags.slice(1).join(', ')}</div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {latest.length === 0 && !loading && (
                  <div className="text-center py-12 text-[#8A9BB0]">Chưa có bài viết nào</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-72 shrink-0 space-y-8">

          <Link
            href="/forum/new"
            className="w-full bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-[14px] py-4 rounded-[20px] transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Edit3 size={18} /> Đăng bài mới
          </Link>

          {/* Trending Topics */}
          <div>
            <h3 className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-5 flex items-center gap-2">
              <TrendingUp size={14} className="text-[#0056D2]" /> XU HƯỚNG THẢO LUẬN
            </h3>
            <div className="space-y-4">
              {featured.map(a => (
                <Link key={a._id} href={`/forum/${a.slug}`} className="block cursor-pointer group">
                  <h4 className="text-[13px] font-bold text-[#1D1D1F] leading-snug group-hover:text-[#0056D2] transition-colors mb-1">{a.title}</h4>
                  <p className="text-[10px] text-[#8A9BB0] uppercase tracking-wider font-bold">{a.views?.toLocaleString()} LƯỢT XEM</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8EAED]"></div>

          {/* Active Members */}
          <div>
            <h3 className="text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-5 flex items-center gap-2">
              <Award size={14} className="text-[#2C7A32]" /> THÀNH VIÊN TÍCH CỰC
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full object-cover border border-[#E8EAED]" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#1D1D1F] flex items-center gap-1">Đình Dũng <CheckCircle2 size={12} className="text-[#0056D2]" /></h4>
                  <p className="text-[11px] text-[#8A9BB0]"><span className="font-bold">Mod</span> • 15.4k Điểm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full object-cover border border-[#E8EAED]" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#1D1D1F]">Hoàng Việt</h4>
                  <p className="text-[11px] text-[#8A9BB0]"><span className="font-bold">Chuyên gia</span> • 8.2k Điểm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full object-cover border border-[#E8EAED]" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#1D1D1F]">Quốc Huy</h4>
                  <p className="text-[11px] text-[#8A9BB0]">Sôi nổi • 4.1k Điểm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="bg-[#E8EAED]/50 rounded-[24px] p-6 flex items-center justify-around border border-[#E8EAED]">
            <div className="text-center">
              <div className="text-[22px] font-black text-[#0056D2] leading-none mb-1">{articles.length}</div>
              <div className="text-[8px] font-black tracking-widest text-[#5e6b7d] uppercase">BÀI VIẾT</div>
            </div>
            <div className="w-px h-10 bg-[#CBD5E1]"></div>
            <div className="text-center">
              <div className="text-[22px] font-black text-[#0056D2] leading-none mb-1">
                {articles.reduce((t, a) => t + (a.views || 0), 0).toLocaleString()}
              </div>
              <div className="text-[8px] font-black tracking-widest text-[#5e6b7d] uppercase">LƯỢT XEM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
