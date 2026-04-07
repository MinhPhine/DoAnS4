"use client";

import { useToast } from '@/context/ToastContext';
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Image as ImageIcon, Clock, Bold, Italic, Link as LinkIcon, List, Type, Quote, Code, MoreHorizontal, ChevronDown, UploadCloud, X, Check } from 'lucide-react';
import Link from 'next/link';

export default function ArticleEditorPage() {
  const { showSuccess } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState('Vừa xong');
  const [title, setTitle] = useState('');

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPublishing(false);
    showSuccess('Bài viết của bạn đã được đăng thành công!');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastSaved(new Date().toLocaleTimeString());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      
      {/* TOP STICKY NAV */}
      <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-[#E8EAED] z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
           <Link href="/creator/dashboard" className="text-[#8A9BB0] hover:text-[#1D1D1F] transition-colors font-bold text-[13px] flex items-center gap-2">
             Bài viết mới <span className="text-[#E8EAED] text-lg font-normal">/</span> <span className="text-[#8A9BB0]">{title || 'Bản nháp không có tiêu đề'}</span>
           </Link>
           <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full ml-4">
             <Check size={12} /> Đã lưu ({lastSaved})
           </span>
        </div>
        <div className="flex items-center gap-6">
           <button className="text-[14px] font-black text-[#0056D2] hover:underline decoration-2 underline-offset-4">Lưu nháp</button>
           <button 
             onClick={handlePublish}
             disabled={isPublishing}
             className="bg-[#0056D2] hover:bg-blue-700 text-white font-black text-[13px] px-8 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 disabled:opacity-70"
           >
             {isPublishing ? (
               <>
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 Đang đăng...
               </>
             ) : 'Đăng bài'}
           </button>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="pt-24 px-8 pb-20 flex gap-8 max-w-[1400px] mx-auto w-full">
        
        {/* LEFT: EDITOR BODY */}
        <div className="flex-grow flex flex-col gap-6">
           <textarea 
             placeholder="Tiêu đề bài viết..."
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             className="w-full bg-transparent text-[48px] font-black text-[#1D1D1F] placeholder:text-[#E8EAED] outline-none resize-none leading-tight"
             rows={2}
           />

           <div className="flex items-center gap-6 text-[13px] font-bold text-[#8A9BB0]">
              <button className="flex items-center gap-2 hover:text-[#1D1D1F] transition-colors">
                <ImageIcon size={18} /> Thêm ảnh bìa
              </button>
              <button className="flex items-center gap-2 hover:text-[#1D1D1F] transition-colors">
                <Clock size={18} /> Đặt lịch đăng
              </button>
           </div>

           {/* Toolbar */}
           <div className="bg-white border border-[#E8EAED] rounded-xl p-2 flex items-center gap-1 shadow-sm sticky top-20 z-40">
              {[Bold, Italic, Type, Quote, LinkIcon, ImageIcon, Code, List].map((Icon, i) => (
                <button key={i} className="p-2.5 text-[#5e6b7d] hover:bg-[#F8F9FA] hover:text-[#0056D2] rounded-lg transition-all">
                  <Icon size={18} />
                </button>
              ))}
              <div className="w-px h-6 bg-[#E8EAED] mx-2"></div>
              <button className="p-2.5 text-[#5e6b7d] hover:bg-[#F8F9FA] rounded-lg transition-all ml-auto">
                <MoreHorizontal size={18} />
              </button>
           </div>

           {/* Content Area */}
           <div className="bg-white rounded-[32px] border border-[#E8EAED] shadow-sm min-h-[600px] p-12">
              <textarea 
                placeholder="Bắt đầu viết nội dung tại đây..."
                className="w-full h-full text-[17px] leading-relaxed text-[#444] placeholder:text-[#E8EAED] outline-none resize-none"
              />
           </div>
        </div>

        {/* RIGHT: CONFIGURATION SIDEBAR */}
        <div className="w-[320px] shrink-0 flex flex-col gap-6 sticky top-24 self-start">
           
           {/* Section: Ảnh đại diện */}
           <div className="bg-white rounded-[24px] border border-[#E8EAED] p-6 shadow-sm">
              <h4 className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4">ẢNH ĐẠI DIỆN</h4>
              <div className="aspect-video bg-[#F8F9FA] rounded-[20px] border-2 border-dashed border-[#E8EAED] flex flex-col items-center justify-center text-[#8A9BB0] hover:border-[#0056D2] hover:bg-[#E8F0FE]/50 transition-all cursor-pointer group p-4 text-center">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} className="text-[#0056D2]" />
                 </div>
                 <p className="text-[11px] font-bold leading-relaxed px-4">Tải lên hoặc kéo thả ảnh vào đây</p>
              </div>
           </div>

           {/* Section: Chuyên mục */}
           <div className="bg-white rounded-[24px] border border-[#E8EAED] p-6 shadow-sm">
              <h4 className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4">CHUYÊN MỤC</h4>
              <button className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 flex items-center justify-between text-[13px] font-bold text-[#1D1D1F] hover:border-[#8A9BB0] transition-colors">
                 Chọn chuyên mục <ChevronDown size={16} />
              </button>
           </div>

           {/* Section: Thẻ (Tags) */}
           <div className="bg-white rounded-[24px] border border-[#E8EAED] p-6 shadow-sm">
              <h4 className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4">THẺ (TAGS)</h4>
              <input 
                type="text" 
                placeholder="Nhập thẻ và nhấn Enter..." 
                className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 text-[13px] font-medium outline-none focus:border-[#0056D2] mb-3"
              />
              <div className="flex flex-wrap gap-2">
                 {['gadgets', 'apple'].map(tag => (
                   <span key={tag} className="bg-[#E8F0FE] text-[#0056D2] text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                     #{tag} <X size={12} className="cursor-pointer hover:text-red-500" />
                   </span>
                 ))}
              </div>
           </div>

           {/* Section: Toggles */}
           <div className="bg-white rounded-[24px] border border-[#E8EAED] p-6 shadow-sm space-y-6">
              {[
                { label: 'Hiển thị công khai', active: true },
                { label: 'Cho phép bình luận', active: true },
                { label: 'Bài viết nổi bật', active: false }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between">
                   <span className="text-[12px] font-bold text-[#444]">{row.label}</span>
                   <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${row.active ? 'bg-[#0056D2]' : 'bg-[#E8EAED]'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${row.active ? 'translate-x-4' : 'translate-x-0'}`} />
                   </div>
                </div>
              ))}
           </div>

           {/* Section: SEO PREVIEW */}
            <div className="bg-white rounded-[24px] border border-[#E8EAED] p-6 shadow-sm hover-lift">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em]">SEO PREVIEW</h4>
                <button className="text-[10px] font-black text-[#0056D2] uppercase tracking-[0.1em] hover:underline">Chỉnh sửa</button>
              </div>
              <div className="flex flex-col gap-1">
                 <h5 className="text-[15px] font-bold text-[#0056D2] line-clamp-1">{title || 'Tiêu đề bài viết...'} | The Digital Curator</h5>
                 <span className="text-[12px] text-[#2C7A32] line-clamp-1">https://digitalcurator.tech/p/untitled-draft</span>
                 <p className="text-[12px] text-[#8A9BB0] leading-snug line-clamp-2">Cung cấp một mô tả hấp dẫn về nội dung bài viết của bạn tại đây để thu hút lượt click từ...</p>
              </div>
           </div>

        </div>
      </div>

    </div>
  );
}
