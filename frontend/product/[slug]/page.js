"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight, ShoppingBag, CheckCircle2, XCircle, ThumbsUp, MessageSquare, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Tìm sản phẩm theo slug
        const res = await fetch(`http://localhost:5000/api/products`);
        if (res.ok) {
          const products = await res.json();
          const found = products.find(p => p.slug === slug);
          if (found) setProduct(found);
        }
      } catch (err) {
        console.error("Lỗi fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProduct();
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAddedToCart(true);
    showSuccess(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen pb-20">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row gap-16 animate-pulse">
            <div className="w-full lg:w-[45%]">
              <div className="aspect-square bg-gray-100 rounded-2xl"></div>
            </div>
            <div className="w-full lg:w-[55%] space-y-4">
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-8 bg-gray-100 rounded w-3/4"></div>
              <div className="h-6 bg-gray-100 rounded w-1/3 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-2">Không tìm thấy sản phẩm</p>
          <Link href="/" className="text-primary font-bold">← Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const mainImage = product.images && product.images[selectedImg]
    ? (product.images[selectedImg].startsWith('http') ? product.images[selectedImg] : `http://localhost:5000${product.images[selectedImg]}`)
    : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800";

  const categoryMap = { mobile: "Điện thoại", laptop: "Laptop", accessory: "Phụ kiện", ai: "AI & Robot", gaming: "Gaming" };

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* Breadcrumbs */}
      <div className="border-b border-[#E8EAED] bg-[#F8F9FA]">
        <div className="container-custom py-4 flex items-center gap-2 text-[11px] font-bold text-[#8A9BB0] uppercase tracking-wider">
          <Link href="/" className="hover:text-[#1D1D1F] transition-colors">Trang chủ</Link>
          <ChevronRight size={12} />
          <Link href={`/category/${product.category}`} className="hover:text-[#1D1D1F] transition-colors">
            {categoryMap[product.category] || product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1D1D1F]">{product.name}</span>
        </div>
      </div>

      {/* TOP SECTION */}
      <section className="container-custom py-10 lg:py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Left: Images */}
        <div className="w-full lg:w-[45%] shrink-0">
          <div className="bg-[#F8F9FA] rounded-2xl overflow-hidden border border-[#E8EAED] flex items-center justify-center aspect-square mb-4 group cursor-zoom-in relative">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Thumbnails - nếu có nhiều ảnh */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => {
                const imgUrl = img.startsWith('http') ? img : `http://localhost:5000${img}`;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 bg-[#F8F9FA] p-1 transition-all ${
                      selectedImg === i ? 'border-[#0056D2]' : 'border-[#E8EAED] hover:border-[#8A9BB0]'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-[55%] flex flex-col pt-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-[#E8F0FE] text-[#0056D2] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
              {product.brand}
            </span>
            {product.isFeatured && (
              <span className="bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                HOT
              </span>
            )}
            <div className="flex items-center gap-2">
              <div className="flex text-[#FFB800]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-[12px] font-medium text-[#8A9BB0]">({product.numReviews} Đánh giá)</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#1D1D1F] tracking-tight mb-6 leading-tight">
            {product.name}
          </h1>

          <p className="text-[14px] text-[#5e6b7d] leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-end gap-5 mb-8">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-black text-[#0056D2] leading-none">
                  {product.discountPrice.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-[16px] font-bold text-[#8A9BB0] line-through leading-none pb-0.5">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                <span className="bg-red-50 text-red-500 text-[12px] font-black px-2.5 py-1 rounded-lg">
                  -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-black text-[#0056D2] leading-none">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Specs nhanh */}
          {product.specs && product.specs.length > 0 && (
            <div className="mb-8 bg-[#F8F9FA] rounded-2xl p-6 border border-[#E8EAED]">
              <span className="block text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest mb-4">Thông số nổi bật</span>
              <div className="grid grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[#E8EAED] last:border-0">
                    <span className="text-[12px] text-[#8A9BB0] font-medium">{spec.key}</span>
                    <span className="text-[12px] font-bold text-[#1D1D1F]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tồn kho */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-[12px] font-bold text-emerald-500 flex items-center gap-1.5">
                <Check size={14} /> Còn hàng ({product.stock} sản phẩm)
              </span>
            ) : (
              <span className="text-[12px] font-bold text-red-500">Hết hàng</span>
            )}
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mb-10 pb-10 border-b border-[#E8EAED]">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`flex-1 font-black text-[14px] py-4 rounded-full transition-all shadow-md flex items-center justify-center gap-2 tracking-wide ${
                addedToCart
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : product.stock > 0
                    ? 'bg-[#0056D2] hover:bg-blue-700 text-white shadow-blue-500/20'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <><Check size={18} /> ĐÃ THÊM VÀO GIỎ!</>
              ) : (
                <><ShoppingBag size={18} /> THÊM VÀO GIỎ HÀNG</>
              )}
            </button>
            <button className="w-14 h-14 bg-white border border-[#E8EAED] hover:border-[#8A9BB0] text-[#5e6b7d] hover:text-red-500 rounded-full flex items-center justify-center transition-colors shrink-0 group">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-red-500/20"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0056D2] shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2l2.66 7.11a2 2 0 0 1-.5 2.11L20 18h-2M5 18a3 3 0 1 0 6 0M15 18a3 3 0 1 0 6 0M11 18h4"/></svg>
              </div>
              <p className="text-[12px] text-[#6b7987] font-medium">Miễn phí giao hàng toàn quốc</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0056D2] shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <p className="text-[12px] text-[#6b7987] font-medium">Bảo hành 12 tháng chính hãng</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0056D2] shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </div>
              <p className="text-[12px] text-[#6b7987] font-medium">Đổi trả trong 30 ngày</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY REVIEWS */}
      <section className="bg-[#F8F9FA] border-t border-[#E8EAED] py-16">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-black text-[#1D1D1F] mb-1">Đánh giá từ cộng đồng</h2>
              <p className="text-[13px] text-[#8A9BB0]">Xem khách hàng thực tế nói gì về sản phẩm này</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[30%] shrink-0">
              <div className="bg-white rounded-[32px] p-8 border border-[#E8EAED] flex flex-col items-center">
                <div className="text-[64px] font-black text-[#1D1D1F] leading-none mb-1">{product.rating}</div>
                <div className="flex gap-1 text-[#FFB800] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-[#8A9BB0]">{product.numReviews} lượt đánh giá</span>
              </div>
            </div>

            <div className="w-full lg:w-[70%]">
              <div className="border border-[#E8EAED] bg-white rounded-[24px] p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-black text-sm">NT</div>
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] text-[13px]">Nguyễn Thành Trung</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-[#FFB800]">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400" />)}</div>
                        <span className="text-[10px] font-bold text-[#2C7A32] flex items-center gap-1"><CheckCircle2 size={10} /> Đã mua hàng</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8A9BB0]">2 ngày trước</span>
                </div>
                <p className="text-[13px] text-[#444] leading-relaxed mb-4">
                  Sản phẩm chất lượng tuyệt vời, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng với dịch vụ!
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F]"><ThumbsUp size={14} /> Hữu ích (12)</button>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F]"><MessageSquare size={14} /> Phản hồi</button>
                </div>
              </div>

              <div className="border border-[#E8EAED] bg-white rounded-[24px] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8A9BB0] text-white flex items-center justify-center font-black text-sm">HL</div>
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] text-[13px]">Hoàng Lan</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-[#FFB800]">{[...Array(4)].map((_, i) => <Star key={i} size={10} className="fill-amber-400" />)}<Star size={10} className="text-gray-200" /></div>
                        <span className="text-[10px] font-bold text-[#2C7A32] flex items-center gap-1"><CheckCircle2 size={10} /> Đã mua hàng</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8A9BB0]">1 tuần trước</span>
                </div>
                <p className="text-[13px] text-[#444] leading-relaxed mb-4">
                  Dùng rất tốt, hiệu năng mạnh. Tuy nhiên giá hơi cao so với kỳ vọng. Nhìn chung vẫn là sản phẩm đáng mua trong tầm giá.
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F]"><ThumbsUp size={14} /> Hữu ích (5)</button>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#5e6b7d] hover:text-[#1D1D1F]"><MessageSquare size={14} /> Phản hồi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
