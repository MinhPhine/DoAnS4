'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { articleService } from '@/services/articleService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Calendar, User, MessageCircle, Share2, CornerDownRight, Send } from 'lucide-react';
import Image from 'next/image';

export default function ArticleDetail({ params }) {
  const { slug } = params;
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const art = await articleService.getBySlug(slug);
        setArticle(art);
        if (art?._id) {
          const coms = await articleService.getComments(art._id);
          setComments(coms);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showError('Vui lòng đăng nhập để bình luận');
      return;
    }
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const result = await articleService.postComment({
        article: article._id,
        content: newComment
      }, localStorage.getItem('token'));
      
      setComments([result, ...comments]);
      setNewComment('');
      showSuccess('Cảm ơn bình luận của bạn!');
    } catch (error) {
      showError('Không thể gửi bình luận lúc này');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Đang tải bài viết...</div>;
  if (!article) return <div className="min-h-screen bg-white flex items-center justify-center">Không tìm thấy bài viết</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-10 text-center">
            <div className="inline-block bg-primary/10 text-primary text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              {article.category?.name || 'Tin tức'}
            </div>
            <h1 className="text-[42px] lg:text-[52px] font-black text-[#1D1D1F] leading-[1.1] mb-8 tracking-tighter">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-[13px] text-[#86868B] font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                  {article.author?.fullname?.charAt(0) || 'A'}
                </div>
                <span>{article.author?.fullname || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} /> {new Date(article.createdAt).toLocaleDateString('vi-VN')}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} /> {comments.length} bình luận
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[500px] w-full rounded-[32px] overflow-hidden mb-12 shadow-2xl shadow-gray-200">
            <Image 
              src={article.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-[#1D1D1F] leading-[1.6] mb-16 font-medium">
            <p className="text-[20px] font-bold mb-8 text-[#555] leading-relaxed italic border-l-4 border-primary pl-6">
              {article.excerpt}
            </p>
            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between py-6 border-y border-[#F5F5F7] mb-16">
            <div className="flex gap-4">
              {article.tags?.map(tag => (
                <span key={tag} className="text-[13px] text-[#0066CC] font-bold hover:underline cursor-pointer">#{tag}</span>
              ))}
            </div>
            <button className="flex items-center gap-2 bg-[#F5F5F7] px-5 py-2.5 rounded-full text-[13px] font-bold text-[#1D1D1F] hover:bg-[#E8E8ED] transition-colors">
              <Share2 size={16} /> Chia sẻ bài viết
            </button>
          </div>

          {/* Comments Section */}
          <section id="comments" className="bg-[#FAFBFD] rounded-[40px] p-8 lg:p-12">
            <h3 className="text-[24px] font-black text-[#1D1D1F] mb-8 flex items-center gap-3">
              <MessageCircle size={24} className="text-primary" /> Bình luận ({comments.length})
            </h3>

            {/* Comment Form */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8EAED] mb-12">
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={user ? "Chia sẻ suy nghĩ của bạn về bài viết này..." : "Bạn cần đăng nhập để bình luận"}
                  disabled={!user || submitting}
                  className="w-full bg-transparent border-none focus:ring-0 text-[15px] min-h-[100px] resize-none mb-4"
                ></textarea>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {user && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                         {user.fullname.charAt(0)}
                      </div>
                    )}
                    <span className="text-[12px] text-[#86868B] font-bold">
                      {user ? `Đang đăng bài dưới tên ${user.fullname}` : 'Đăng nhập để tham gia thảo luận'}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={!user || !newComment.trim() || submitting}
                    className="bg-primary text-white px-8 py-2.5 rounded-full text-[14px] font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    {submitting ? 'Đang gửi...' : 'Gửi bình luận'} <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
                      {comment.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-[#E8EAED]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] font-black text-[#1D1D1F]">{comment.user?.name || 'Người dùng'}</span>
                        <span className="text-[11px] text-[#86868B] font-bold">{new Date(comment.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <p className="text-[14px] text-[#444] leading-relaxed font-medium">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-[#86868B] font-bold text-[14px]">
                  Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ!
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
