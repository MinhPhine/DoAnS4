"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight, ShoppingCart, Star, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const CATEGORY_INFO = {
  mobile: {
    title: "Điện thoại",
    desc: "Khám phá thế giới smartphone với những đánh giá chi tiết và so sánh khách quan nhất.",
    color: "from-[#0056D2] to-[#003d99]",
    heroImg: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800",
    articles: [
      { title: "iPhone 15 Pro Max sau 6 tháng: Vẫn là 'vị vua'?", tag: "Review", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600", time: "15 phút đọc" },
      { title: "Android 15: Những tính năng bảo mật mới cần biết", tag: "Hệ điều hành", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600", time: "8 phút đọc" },
      { title: "So sánh camera: Galaxy S24 Ultra vs Xiaomi 14 Ultra", tag: "Camera Test", img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600", time: "12 phút đọc" },
    ]
  },
  laptop: {
    title: "Máy tính & Laptop",
    desc: "Tổng hợp đánh giá laptop, PC và workstation cho mọi nhu cầu từ học tập đến chuyên nghiệp.",
    color: "from-[#7C3AED] to-[#5B21B6]",
    heroImg: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    articles: [
      { title: "MacBook Pro M3 Pro: Hiệu năng đáng kinh ngạc cho creator", tag: "Review", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600", time: "12 phút đọc" },
      { title: "Top 5 laptop gaming tầm giá 30 triệu đáng mua nhất 2024", tag: "Tư vấn", img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=600", time: "10 phút đọc" },
      { title: "Dell XPS vs ThinkPad X1: Laptop doanh nhân nào tốt hơn?", tag: "So sánh", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600", time: "8 phút đọc" },
    ]
  },
  accessory: {
    title: "Phụ kiện âm thanh",
    desc: "Tai nghe, loa và phụ kiện âm thanh cao cấp cho trải nghiệm nghe nhạc tuyệt vời.",
    color: "from-[#059669] to-[#047857]",
    heroImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    articles: [
      { title: "AirPods Pro 2 USB-C: Nâng cấp đáng giá hay chỉ đổi cổng?", tag: "Review", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600", time: "10 phút đọc" },
      { title: "Sony WH-1000XM5: Vua chống ồn có xứng danh?", tag: "Review", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600", time: "12 phút đọc" },
      { title: "Hướng dẫn chọn tai nghe True Wireless phù hợp với bạn", tag: "Tư vấn", img: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&q=80&w=600", time: "7 phút đọc" },
    ]
  },
  ai: {
    title: "AI & Robot",
    desc: "Công nghệ trí tuệ nhân tạo, thực tế ảo, drone và những thiết bị thông minh thế hệ mới.",
    color: "from-[#DC2626] to-[#B91C1C]",
    heroImg: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    articles: [
      { title: "Meta Quest 3: Thực tế hỗn hợp đã sẵn sàng cho mọi người?", tag: "Review", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600", time: "15 phút đọc" },
      { title: "DJI Mavic 3 Pro: Flycam 3 camera đầu tiên trên thế giới", tag: "Review", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600", time: "10 phút đọc" },
      { title: "ChatGPT vs Gemini vs Claude: AI nào đáng dùng nhất?", tag: "So sánh", img: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?auto=format&fit=crop&q=80&w=600", time: "8 phút đọc" },
    ]
  },
  gaming: {
    title: "Gaming Gear",
    desc: "Console, bàn phím, chuột gaming và mọi thiết bị cho game thủ chuyên nghiệp.",
    color: "from-[#EA580C] to-[#C2410C]",
    heroImg: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=800",
    articles: [
      { title: "PlayStation 5 Slim: Nhỏ hơn, mạnh hơn, đáng mua hơn?", tag: "Review", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600", time: "10 phút đọc" },
      { title: "Nintendo Switch OLED vs Steam Deck: Handheld nào cho bạn?", tag: "So sánh", img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=600", time: "12 phút đọc" },
      { title: "Top 10 gaming gear đáng mua nhất Black Friday 2024", tag: "Tư vấn", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600", time: "6 phút đọc" },
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const info = CATEGORY_INFO[slug] || {
    title: slug?.charAt(0).toUpperCase() + slug?.slice(1),
    desc: "Khám phá các sản phẩm công nghệ hàng đầu.",
    color: "from-[#0056D2] to-[#003d99]",
    heroImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    articles: []
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:5000/api/products?category=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Lỗi fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProducts();
  }, [slug]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 relative">
      
      {/* HERO SECTION */}
      <section className="container-custom pt-8 pb-4">
        <div className={`bg-gradient-to-r ${info.color} rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center relative h-[300px] p-10 md:p-16`}>
          <div className="z-10 text-white w-full md:w-3/5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-3 block">
              Danh mục
            </span>
            <h1 className="text-4xl md:text-[56px] font-black tracking-tight mb-4 drop-shadow-sm leading-tight">
              {info.title}
            </h1>
            <p className="text-[15px] text-white/90 max-w-md leading-relaxed mb-6">
              {info.desc}
            </p>
            <div className="flex gap-3">
              <span className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-[12px] font-bold">
                {products.length} Sản phẩm
              </span>
              <span className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-[12px] font-bold">
                {info.articles?.length || 0} Bài viết
              </span>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:block overflow-hidden">
            <div className="absolute right-[-10%] top-[-20%] w-[120%] h-[140%] rounded-l-[100px] transform rotate-6 overflow-hidden shadow-2xl opacity-40">
              <img src={info.heroImg} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* BÀI VIẾT NỔI BẬT */}
      {info.articles && info.articles.length > 0 && (
        <section className="container-custom mb-10">
          <h2 className="text-lg font-black text-[#1D1D1F] uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            Bài viết nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {info.articles.map((article, i) => (
              <Link href="/review-detail" key={i} className="group">
                <article className="bg-white rounded-[20px] overflow-hidden border border-[#E8EAED] hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">{article.tag}</span>
                      <span className="text-[10px] text-[#8A9BB0] font-bold">{article.time}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1D1D1F] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FILTER BAR */}
      <section className="container-custom py-4 border-b border-[#E8EAED] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-lg font-black text-[#1D1D1F] uppercase tracking-wider flex items-center gap-3">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            Sản phẩm {info.title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9BB0]" />
              <input 
                type="text" 
                placeholder={`Tìm trong ${info.title}...`}
                className="w-full bg-white border border-[#E8EAED] focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none rounded-full pl-10 pr-4 py-2 text-[12px] font-medium" 
              />
            </div>
            <button className="w-9 h-9 bg-white border border-[#E8EAED] hover:bg-[#F0F2F5] rounded-full flex items-center justify-center text-[#5e6b7d] transition-colors shrink-0">
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container-custom">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-[20px] border border-[#E8EAED] overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100"></div>
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                  <div className="h-6 bg-gray-100 rounded w-1/2 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Link href={`/product/${product.slug}`} key={product._id} className="block group">
                <article className="bg-white rounded-[20px] overflow-hidden border border-[#E8EAED] hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-white relative overflow-hidden flex items-center justify-center p-6">
                    {product.isFeatured && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-md z-10 shadow-md">
                        HOT
                      </span>
                    )}
                    {product.discountPrice && (
                      <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-md z-10 shadow-md">
                        -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                      </span>
                    )}
                    <div className="w-full h-full flex items-center justify-center">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                          <ShoppingCart size={32} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5 border-t border-[#E8EAED] flex-1 flex flex-col">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5 block">
                      {product.brand}
                    </span>
                    <h3 className="text-[13px] font-bold text-[#1D1D1F] leading-snug mb-3 line-clamp-2 min-h-[36px] group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={11} className={s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#8A9BB0] font-bold">({product.numReviews})</span>
                    </div>
                    
                    <div className="mt-auto">
                      {product.discountPrice ? (
                        <div className="mb-3">
                          <span className="text-lg font-black text-red-500 block">
                            {product.discountPrice.toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-[11px] text-gray-400 line-through">
                            {product.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-black text-[#1D1D1F] block mb-3">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                      
                      <button className="w-full py-2.5 bg-[#F0F2F5] text-[#1D1D1F] text-[11px] font-black rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider">
                        <Eye size={14} /> Xem chi tiết
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-20">
             <div className="w-20 h-20 mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
               <ShoppingCart size={32} className="text-gray-300" />
             </div>
             <p className="text-lg font-bold text-gray-400 mb-2">Chưa có sản phẩm nào</p>
             <p className="text-sm text-gray-400">Danh mục này hiện chưa có sản phẩm nào.</p>
           </div>
        )}
      </section>
    </div>
  );
}
