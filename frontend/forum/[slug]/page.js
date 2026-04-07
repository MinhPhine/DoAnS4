"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight, Eye, Clock, Tag, ArrowLeft, ThumbsUp, MessageSquare, Share2 } from "lucide-react";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${slug}`);
        if (res.ok) setArticle(await res.json());
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container-custom max-w-3xl py-16 animate-pulse">
          <div className="h-6 bg-gray-100 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-100 rounded w-full mb-6"></div>
          <div className="h-64 bg-gray-100 rounded-2xl mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-4">Không tìm thấy bài viết</p>
          <Link href="/forum" className="text-primary font-bold">← Quay về diễn đàn</Link>
        </div>
      </div>
    );
  }

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Vừa xong";
    if (h < 24) return `${h} giờ trước`;
    const d = Math.floor(h / 24);
    return `${d} ngày trước`;
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-[#E8EAED] bg-[#F8F9FA]">
        <div className="container-custom py-4 flex items-center gap-2 text-[11px] font-bold text-[#8A9BB0] uppercase tracking-wider">
          <Link href="/" className="hover:text-[#1D1D1F]">Trang chủ</Link>
          <ChevronRight size={12} />
          <Link href="/forum" className="hover:text-[#1D1D1F]">Diễn đàn</Link>
          <ChevronRight size={12} />
          <span className="text-[#1D1D1F] truncate max-w-[200px]">{article.title}</span>
        </div>
      </div>

      <article className="container-custom max-w-3xl py-10">
        {/* Back */}
        <Link href="/forum" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0056D2] hover:underline mb-6">
          <ArrowLeft size={14} /> Quay về diễn đàn
        </Link>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.tags.map((tag, i) => (
              <span key={i} className="bg-[#E8F0FE] text-[#0056D2] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-[#1D1D1F] tracking-tight leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#E8EAED]">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
            {article.author?.fullname?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#1D1D1F]">{article.author?.fullname || 'Ẩn danh'}</p>
            <div className="flex items-center gap-4 text-[12px] text-[#8A9BB0] font-medium">
              <span className="flex items-center gap-1"><Clock size={12} /> {timeAgo(article.createdAt)}</span>
              <span className="flex items-center gap-1"><Eye size={12} /> {article.views?.toLocaleString()} lượt xem</span>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-[#E8EAED]">
            <img src={article.thumbnail} alt={article.title} className="w-full h-auto object-cover max-h-[400px]" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[#333] leading-relaxed">
          {article.content.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h3 key={i} className="text-xl font-black text-[#1D1D1F] mt-8 mb-4">{line.replace(/\*\*/g, '')}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="text-[15px] text-[#444] ml-6 mb-2 list-disc">{line.substring(2)}</li>;
            }
            if (line.trim() === '') return <br key={i} />;
            // Handle inline bold
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={i} className="text-[15px] text-[#444] leading-relaxed mb-4">
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="text-[#1D1D1F] font-black">{part.replace(/\*\*/g, '')}</strong>;
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[#E8EAED]">
          <button className="flex items-center gap-2 bg-[#F0F2F5] hover:bg-[#E8EAED] px-5 py-2.5 rounded-full text-[13px] font-bold text-[#5e6b7d] transition-colors">
            <ThumbsUp size={16} /> Hữu ích
          </button>
          <button className="flex items-center gap-2 bg-[#F0F2F5] hover:bg-[#E8EAED] px-5 py-2.5 rounded-full text-[13px] font-bold text-[#5e6b7d] transition-colors">
            <Share2 size={16} /> Chia sẻ
          </button>
        </div>
      </article>
    </div>
  );
}
