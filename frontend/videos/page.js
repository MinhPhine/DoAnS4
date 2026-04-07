"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Play, PlayCircle, Eye, Activity, Clock, ChevronRight, Zap, X } from "lucide-react";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null); // Lưu video đang phát (YouTube iframe)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        if (res.ok) {
          const data = await res.json();
          setVideos(data.filter(v => v.category !== "shorts"));
          setShorts(data.filter(v => v.category === "shorts"));
        }
      } catch (err) {
        console.error("Lỗi fetch videos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Vừa xong";
    if (h < 24) return `${h} giờ trước`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d} ngày trước`;
    return `${Math.floor(d / 30)} tháng trước`;
  }

  // Video nổi bật là video đầu tiên (có `isFeatured: true` hoặc chỉ là video đầu tiên)
  const featuredVideo = videos.find(v => v.isFeatured) || videos[0];
  // Playlist là các video tiếp theo
  const playlistVideos = featuredVideo ? videos.filter(v => v._id !== featuredVideo._id).slice(0, 4) : [];
  // Quick hands-on
  const handsOnVideos = videos.filter(v => v.category !== "shorts" && v._id !== featuredVideo?._id).slice(4);

  // Component Video Modal Poup
  function VideoModal({ video, onClose }) {
    if (!video) return null;
    return (
      <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden relative shadow-2xl">
          <div className="absolute top-4 right-4 z-10 flex gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="aspect-video w-full bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6 bg-[#1D1D1F]">
            <h2 className="text-xl font-black text-white mb-2">{video.title}</h2>
            <div className="flex items-center gap-4 text-gray-400 text-[12px] font-bold">
              <span>{video.views?.toLocaleString()} lượt xem</span>
              <span>•</span>
              <span>{timeAgo(video.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen pb-20 pt-10">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-10"></div>
            <div className="flex flex-col lg:flex-row gap-6 mb-10">
              <div className="w-full lg:w-[70%] aspect-video bg-gray-200 rounded-[24px]"></div>
              <div className="w-full lg:w-[30%] bg-gray-200 rounded-[24px]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      
      {/* HEADER HERO */}
      <section className="container-custom pt-10 pb-8">
        <h1 className="text-[32px] md:text-[40px] font-black tracking-tight text-[#1D1D1F] mb-3 leading-none">
          Video & Trên tay
        </h1>
        <p className="text-[#6b7987] text-[15px] max-w-2xl mb-10 leading-relaxed">
          Khám phá những video mở hộp, đánh giá chi tiết và trải nghiệm thực tế các sản phẩm công nghệ mới nhất từ đội ngũ Digital Curator.
        </p>

        {featuredVideo && (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Main Hero Video */}
            <div 
              className="w-full lg:w-[70%] relative rounded-[24px] overflow-hidden group cursor-pointer aspect-video bg-black shadow-lg shadow-black/5 shrink-0"
              onClick={() => setActiveVideo(featuredVideo)}
            >
              <img 
                src={featuredVideo.thumbnail || "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1200"} 
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0056D2] transition-all">
                   <Play className="text-white fill-white ml-2" size={32} />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8">
                 <span className="bg-[#0056D2] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4 shadow-md">
                   NỔI BẬT
                 </span>
                 <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 drop-shadow-md">
                   {featuredVideo.title}
                 </h2>
                 <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <Clock size={14} /> {timeAgo(featuredVideo.createdAt)}
                    </div>
                    <div className="flex items-center gap-2">
                       <Eye size={14} /> {featuredVideo.views?.toLocaleString()} lượt xem
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Sidebar Widgets */}
            <div className="w-full lg:w-[30%] flex flex-col gap-6 shrink-0">
              
              {/* Product Info / Spec Box */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm">
                <h3 className="font-black text-[#1D1D1F] text-[14px] mb-4">Sản phẩm trong video</h3>
                {featuredVideo.product ? (
                  <>
                    <h4 className="font-bold text-[#0056D2] text-[13px] mb-3">{featuredVideo.product.name}</h4>
                    <p className="text-[12px] text-[#5e6b7d] line-clamp-3 mb-4">{featuredVideo.description}</p>
                    <Link href={`/product/${featuredVideo.product.slug}`} className="block w-full text-center bg-white border border-[#E8EAED] hover:border-[#0056D2] text-[#1D1D1F] hover:text-[#0056D2] font-black text-[11px] uppercase tracking-widest py-3 rounded-xl transition-colors shadow-sm">
                      Xem chi tiết sản phẩm
                    </Link>
                  </>
                ) : (
                  <>
                     <p className="text-[12px] text-[#5e6b7d] line-clamp-4 mb-4">{featuredVideo.description}</p>
                     <div className="flex flex-wrap gap-2">
                       {featuredVideo.tags?.map(tag => (
                         <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-2 py-1 rounded">#{tag}</span>
                       ))}
                     </div>
                  </>
                )}
              </div>

              {/* Playlist Box */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E8EAED] shadow-sm flex-1">
                <h3 className="font-black text-[#1D1D1F] text-[14px] mb-5">Đề xuất cho bạn</h3>
                <div className="space-y-4">
                  {playlistVideos.map(video => (
                    <div key={video._id} onClick={() => setActiveVideo(video)} className="flex gap-4 group cursor-pointer">
                      <div className="w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-black relative shadow-sm border border-[#E8EAED]">
                        <img src={video.thumbnail || "https://images.unsplash.com/photo-1695048133142-1a20a5bf616f?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-70" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle size={18} className="text-white opacity-80" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] font-bold px-1 rounded">{video.duration || "00:00"}</div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[11px] font-bold text-[#1D1D1F] leading-snug group-hover:text-[#0056D2] transition-colors mb-1 line-clamp-2">{video.title}</h4>
                        <span className="text-[9px] font-bold text-[#8A9BB0] uppercase tracking-wide">{timeAgo(video.createdAt)} • {video.views?.toLocaleString()} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* QUICK HANDS-ON (TRÊN TAY NHANH) */}
      {handsOnVideos.length > 0 && (
        <section className="container-custom py-10 border-t border-[#E8EAED]/60 mt-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-[#1D1D1F] tracking-tight">Trên tay & Đánh giá</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {handsOnVideos.map(video => (
              <div key={video._id} className="group cursor-pointer flex flex-col h-full" onClick={() => setActiveVideo(video)}>
                <div className="aspect-video rounded-[20px] overflow-hidden relative mb-4 bg-gray-100 shadow-sm border border-[#E8EAED]/50 shrink-0">
                  <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">{video.duration || "00:00"}</div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                      <Play size={20} className="text-[#0056D2] fill-[#0056D2] ml-1" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                  <span className="text-[#0056D2]">{video.category}</span>
                  <span className="text-[#E8EAED]">•</span>
                  <span className="text-[#8A9BB0]">{timeAgo(video.createdAt)}</span>
                </div>
                <h3 className="text-[17px] font-black text-[#1D1D1F] leading-snug group-hover:text-[#0056D2] transition-colors mb-4 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-[#8A9BB0] text-[10px] font-bold uppercase tracking-widest mt-auto mb-1">
                  <div className="flex items-center gap-1.5"><Eye size={12} /> {(video.views || 0).toLocaleString()}</div>
                  <div className="flex items-center gap-1.5"><Activity size={12} /> Tương tác cao</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TOPIC FILTERS */}
      <section className="container-custom py-12 mt-4">
        <div className="bg-white border border-[#E8EAED] shadow-sm rounded-[32px] p-10 flex flex-col gap-6">
          <span className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.2em]">Khám phá theo chủ đề</span>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
             {['Smartphone', 'Laptop & PC', 'Audio & Hi-fi', 'Smart Home', 'Máy ảnh', 'Phụ kiện', 'Gaming Gear'].map(topic => (
               <button key={topic} className="shrink-0 bg-white hover:bg-gray-50 text-[#1D1D1F] hover:text-[#0056D2] hover:border-[#0056D2] border mb-1 border-[#E8EAED] shadow-sm font-bold text-[12px] px-8 py-3.5 rounded-[18px] transition-all hover:-translate-y-0.5 whitespace-nowrap">
                 {topic}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* DIGITAL SHORTS */}
      {shorts.length > 0 && (
        <section className="container-custom py-10 mb-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
            
            {/* Left Column Text */}
            <div className="w-full lg:w-[25%] flex flex-col py-4 shrink-0 justify-center lg:block">
               <h2 className="text-[32px] font-black tracking-tight text-[#1D1D1F] mb-3 leading-none">Digital<br className="hidden lg:block"/> Shorts</h2>
               <p className="text-[#6b7987] text-[12px] leading-relaxed mb-8">
                 Cập nhật nhanh tin công nghệ trong 60 giây.
               </p>
               <button className="bg-[#1D1D1F] hover:bg-black text-white font-bold text-[11px] uppercase tracking-widest py-3.5 px-6 rounded-xl transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2 max-w-max">
                 <Zap size={14} fill="white" /> Xem thêm Shorts
               </button>
            </div>

            {/* Right Column Videos */}
            <div className="w-full lg:w-[75%] grid grid-cols-2 lg:grid-cols-4 gap-4">
               {shorts.map(short => (
                 <div key={short._id} onClick={() => setActiveVideo(short)} className="aspect-[9/16] rounded-[24px] overflow-hidden relative group cursor-pointer bg-gray-100 shadow-md">
                   <img src={short.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={short.title} />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={20} className="text-white fill-white ml-1" />
                      </div>
                   </div>
                   <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                     {short.duration || "1:00"}
                   </div>
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-4">
                      <h4 className="text-white font-bold text-[13px] leading-tight drop-shadow-md pb-2 line-clamp-3">
                        {short.title}
                      </h4>
                   </div>
                 </div>
               ))}
            </div>

          </div>
        </section>
      )}

      {/* Video Player Modal */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}

    </div>
  );
}
