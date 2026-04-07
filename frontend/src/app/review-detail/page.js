"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, ThumbsUp, MessageSquare, Send, Star, Eye, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function ReviewDetailPage() {
  const { user } = useAuth();
  const { showSuccess } = useToast();
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesRes, reviewsRes, productsRes] = await Promise.all([
          fetch("http://localhost:5000/api/articles"),
          fetch("http://localhost:5000/api/reviews"),
          fetch("http://localhost:5000/api/products"),
        ]);
        
        if (articlesRes.ok) {
          const data = await articlesRes.json();
          setArticles(data);
          if (data.length > 0) setArticle(data[0]); // Bài đầu tiên 
        }
        if (reviewsRes.ok) setReviews(await reviewsRes.json());
        if (productsRes.ok) {
          const prods = await productsRes.json();
          setProducts(prods);
          if (prods.length > 0) setSelectedProduct(prods[0]._id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleSubmitComment() {
    if (!commentText.trim() || !user || !selectedProduct) return;
    setSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({
          product: selectedProduct,
          rating: commentRating,
          comment: commentText,
        })
      });
      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setCommentText("");
        showSuccess("Đã gửi bình luận thành công!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Vừa xong";
    if (h < 24) return `${h} giờ trước`;
    const d = Math.floor(h / 24);
    return `${d} ngày trước`;
  }

  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen animate-pulse">
        <div className="w-full h-[60vh] bg-gray-200"></div>
        <div className="container-custom py-12"><div className="h-8 bg-gray-200 rounded w-1/2"></div></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen relative">

      {/* IMMERSIVE HERO */}
      <section className="w-full h-[60vh] md:h-[70vh] relative flex items-end">
        <img
          src={article?.thumbnail || "https://images.unsplash.com/photo-1618424181497-157f25b6ce89?auto=format&fit=crop&q=80&w=1920"}
          className="absolute inset-0 w-full h-full object-cover filter brightness-50"
          alt={article?.title || "Review"}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent"></div>
        <div className="container-custom relative z-10 pb-12 w-full">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#0056D2] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                Review Flagship
              </span>
              {article?.createdAt && (
                <span className="text-[12px] font-bold text-white/70">
                  {new Date(article.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.1] tracking-tight drop-shadow-lg">
              {article?.title || "Đánh giá chi tiết sản phẩm"}
            </h1>
          </div>
        </div>
      </section>

      {/* TWO COLUMN CONTENT */}
      <section className="container-custom py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LEFT: MAIN ARTICLE */}
          <div className="w-full lg:w-[65%] shrink-0">

            {/* Author Block */}
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-[#E8EAED]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shrink-0">
                {article?.author?.fullname?.charAt(0) || 'A'}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1D1D1F] flex items-center gap-2 mb-1">
                  {article?.author?.fullname || 'Admin'}
                  <span className="bg-[#2C7A32] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Expert Reviewer</span>
                </h3>
                <p className="text-[12px] text-[#6b7987]">Chuyên gia phân tích tại The Digital Curator</p>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[12px] text-[#8A9BB0]">
                <span className="flex items-center gap-1"><Eye size={14} /> {article?.views?.toLocaleString()}</span>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none text-[#444] leading-relaxed">
              {article?.content?.split('\n').map((line, i) => {
                if (line.trim() === '') return <br key={i} />;
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={i} className="text-[15px] text-[#444] leading-relaxed mb-4">
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-[#1D1D1F] font-black">{part.replace(/\*\*/g, '')}</strong>;
                      }
                      if (part.startsWith('- ')) {
                        return <span key={j} className="block ml-4">• {part.substring(2)}</span>;
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </article>

            {/* Tags */}
            {article?.tags && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#E8EAED]">
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-[#F0F2F5] text-[#5e6b7d] text-[11px] font-bold px-3 py-1.5 rounded-md">{tag}</span>
                ))}
              </div>
            )}

            {/* COMMENTS / REVIEWS SECTION */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-[#1D1D1F]">Đánh giá sản phẩm ({reviews.length})</h3>
              </div>

              {/* Comment Input */}
              {user ? (
                <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] mb-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {user.fullname?.charAt(0)}
                    </div>
                    <span className="text-[13px] font-bold text-[#1D1D1F]">{user.fullname}</span>
                  </div>

                  {/* Chọn sản phẩm */}
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <select
                      value={selectedProduct}
                      onChange={e => setSelectedProduct(e.target.value)}
                      className="flex-1 bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-2.5 text-[13px] font-medium outline-none"
                    >
                      {products.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => (
                        <button key={s} onClick={() => setCommentRating(s)}>
                          <Star size={20} className={s <= commentRating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Chia sẻ ý kiến của bạn về sản phẩm này..."
                    className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl resize-none h-24 outline-none text-[14px] text-[#1D1D1F] placeholder:text-[#8A9BB0] p-4 focus:border-[#0056D2] transition-colors mb-4"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmitComment}
                      disabled={submitting || !commentText.trim()}
                      className="bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-[13px] px-6 py-2.5 rounded-full shadow-md shadow-blue-500/20 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send size={14} /> {submitting ? "Đang gửi..." : "Gửi bình luận"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F8F9FA] rounded-[24px] p-6 border border-[#E8EAED] mb-10 text-center">
                  <p className="text-[#8A9BB0] font-bold mb-3">Đăng nhập để bình luận</p>
                  <Link href="/login" className="bg-[#0056D2] text-white px-6 py-2.5 rounded-full font-bold text-[13px]">Đăng nhập</Link>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review._id} className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-black text-[13px] shrink-0">
                        {review.user?.fullname?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-[#1D1D1F] text-[13px]">{review.user?.fullname || 'Ẩn danh'}</span>
                          {review.user?.email === 'admin@digitalcurator.com' && (
                            <span className="bg-[#2C7A32] text-white text-[7px] font-black uppercase tracking-widest px-1.5 rounded">Admin</span>
                          )}
                          <span className="text-[10px] text-[#8A9BB0]">{timeAgo(review.createdAt)}</span>
                        </div>

                        {/* Product info */}
                        {review.product && typeof review.product === 'object' && (
                          <Link href={`/product/${review.product.slug}`} className="inline-flex items-center gap-2 bg-[#F0F2F5] px-3 py-1 rounded-lg mb-2 text-[11px] font-bold text-[#5e6b7d] hover:text-[#0056D2] transition-colors">
                            <ChevronRight size={10} /> {review.product.name}
                          </Link>
                        )}

                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                          ))}
                        </div>

                        <p className="text-[13px] text-[#444] leading-relaxed mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#5e6b7d] hover:text-[#0056D2]"><ThumbsUp size={14} /> Hữu ích</button>
                          <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F]"><MessageSquare size={14} /> Phản hồi</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[35%] shrink-0 space-y-8 lg:mt-5">

            {/* Related Articles */}
            <div>
              <h3 className="text-[12px] font-black text-[#8A9BB0] uppercase tracking-widest mb-6">Bài viết liên quan</h3>
              <div className="space-y-6">
                {articles.slice(0, 4).map(a => (
                  <Link key={a._id} href={`/forum/${a.slug}`} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                      {a.thumbnail ? (
                        <img src={a.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={a.title} />
                      ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                      )}
                    </div>
                    <div>
                      {a.tags?.[0] && (
                        <span className="text-[9px] font-black text-[#0056D2] uppercase tracking-widest block mb-1">{a.tags[0]}</span>
                      )}
                      <h4 className="font-bold text-[#1D1D1F] text-[13px] leading-snug mb-2 group-hover:text-[#0056D2] transition-colors line-clamp-2">{a.title}</h4>
                      <span className="text-[10px] text-[#8A9BB0]">{a.views?.toLocaleString()} lượt xem</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#0056D2] rounded-[24px] p-8 text-white sticky top-24 shadow-xl shadow-blue-500/10">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-5">
                <Mail size={20} />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">Nhận tin công nghệ mới nhất</h3>
              <p className="text-[12px] text-white/80 mb-6 leading-relaxed">Đăng ký để không bỏ lỡ những bài đánh giá chuyên sâu hàng tuần.</p>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full bg-white/10 border border-white/20 focus:bg-white focus:text-[#1D1D1F] outline-none rounded-xl px-4 py-3 text-[13px] placeholder:text-white/60 transition-colors mb-3"
              />
              <button className="w-full bg-white hover:bg-gray-100 text-[#0056D2] font-black text-[11px] uppercase tracking-widest py-3 rounded-xl transition-colors shadow-sm">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
