"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Share2, Plus, ArrowLeftRight, X, Search, ShoppingBag, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ComparisonPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [selected, setSelected] = useState([]); // max 3 sản phẩm
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showSuccess } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data);
          // Mặc định chọn 2 sản phẩm đầu tiên
          if (data.length >= 2) setSelected([data[0], data[1]]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  function addProduct(product) {
    if (selected.length >= 3) return;
    if (selected.find(p => p._id === product._id)) return;
    setSelected([...selected, product]);
    setShowPicker(false);
    setSearch("");
  }

  function removeProduct(id) {
    setSelected(selected.filter(p => p._id !== id));
  }

  function handleBuy(product) {
    addToCart(product);
    showSuccess(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }

  const filteredProducts = allProducts.filter(p =>
    !selected.find(s => s._id === p._id) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const categoryLabels = { mobile: "Điện thoại", laptop: "Laptop", accessory: "Phụ kiện", ai: "AI & Robot", gaming: "Gaming" };

  // Tạo spec rows từ sản phẩm đã chọn
  function getSpecRows() {
    if (selected.length === 0) return [];
    // Thu thập tất cả spec keys từ các sản phẩm đã chọn
    const allKeys = new Set();
    selected.forEach(p => {
      if (p.specs) p.specs.forEach(s => allKeys.add(s.key));
    });
    return [...allKeys].map(key => ({
      label: key,
      values: selected.map(p => {
        const spec = p.specs?.find(s => s.key === key);
        return spec ? spec.value : "—";
      })
    }));
  }

  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen pb-20 pt-10">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20 pt-10">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0056D2] mb-3 block">CÔNG CỤ SO SÁNH</span>
            <h1 className="text-3xl lg:text-4xl font-black text-[#1D1D1F] tracking-tight mb-3">So sánh sản phẩm</h1>
            <p className="text-[#6b7987] text-[14px]">Chọn tối đa 3 sản phẩm để so sánh thông số kỹ thuật chi tiết.</p>
          </div>
          {selected.length < 3 && (
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-2 bg-[#0056D2] hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow-md shadow-blue-500/20 transition-colors shrink-0"
            >
              <Plus size={16} /> Thêm sản phẩm ({selected.length}/3)
            </button>
          )}
        </div>

        {/* Product Picker Modal */}
        {showPicker && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={() => setShowPicker(false)}>
            <div className="bg-white rounded-[24px] w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-[#E8EAED]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-[#1D1D1F]">Chọn sản phẩm</h3>
                  <button onClick={() => setShowPicker(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]" />
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                    className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl pl-11 pr-4 py-3 text-[13px] font-medium outline-none focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
              <div className="overflow-y-auto flex-1 p-4">
                {filteredProducts.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">Không tìm thấy sản phẩm</p>
                ) : (
                  <div className="space-y-2">
                    {filteredProducts.map(product => {
                      const imgSrc = product.images?.[0]?.startsWith('http') ? product.images[0] : `http://localhost:5000${product.images?.[0] || ''}`;
                      return (
                        <button
                          key={product._id}
                          onClick={() => addProduct(product)}
                          className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#F0F2F5] transition-colors text-left"
                        >
                          <div className="w-12 h-12 bg-[#F8F9FA] rounded-lg overflow-hidden border border-[#E8EAED] shrink-0">
                            {product.images?.[0] ? (
                              <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300"><ShoppingBag size={16} /></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-[#1D1D1F] truncate">{product.name}</p>
                            <p className="text-[11px] text-[#8A9BB0]">{product.brand} • {categoryLabels[product.category] || product.category}</p>
                          </div>
                          <span className="text-[13px] font-black text-[#0056D2] shrink-0">
                            {(product.discountPrice || product.price)?.toLocaleString('vi-VN')}đ
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selected.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-[#E8EAED] shadow-sm p-16 text-center">
            <ArrowLeftRight size={48} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Chưa có sản phẩm nào được chọn</h3>
            <p className="text-gray-400 text-sm mb-6">Bấm "Thêm sản phẩm" để bắt đầu so sánh</p>
            <button onClick={() => setShowPicker(true)} className="bg-[#0056D2] text-white px-6 py-3 rounded-full font-bold text-[14px]">
              <Plus size={16} className="inline mr-2" /> Thêm sản phẩm
            </button>
          </div>
        ) : (
          /* COMPARISON TABLE */
          <div className="bg-white rounded-[32px] border border-[#E8EAED] shadow-sm mb-16 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E8EAED]">
                  <th className="w-[200px] p-6 align-middle border-r border-[#F0F2F5]">
                    <div className="flex items-center gap-2 text-[11px] font-black text-[#0056D2] uppercase tracking-widest">
                      <ArrowLeftRight size={14} /> THÔNG SỐ
                    </div>
                  </th>
                  {selected.map(product => {
                    const imgSrc = product.images?.[0]?.startsWith('http') ? product.images[0] : `http://localhost:5000${product.images?.[0] || ''}`;
                    return (
                      <th key={product._id} className="p-6 align-top min-w-[220px]">
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 bg-[#F8F9FA] rounded-xl overflow-hidden border border-[#E8EAED] shrink-0">
                            {product.images?.[0] ? (
                              <img src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300"><ShoppingBag size={18} /></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#1D1D1F] text-[13px] leading-tight mb-1 truncate">{product.name}</h3>
                            <div className="text-[11px] font-black text-[#0056D2] mb-1">
                              {(product.discountPrice || product.price)?.toLocaleString('vi-VN')}đ
                            </div>
                            {product.discountPrice && (
                              <span className="text-[10px] text-[#8A9BB0] line-through">{product.price?.toLocaleString('vi-VN')}đ</span>
                            )}
                          </div>
                          <button
                            onClick={() => removeProduct(product._id)}
                            className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                            title="Bỏ sản phẩm"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0F2F5]">
                {/* Brand */}
                <tr>
                  <td className="p-6 border-r border-[#F0F2F5] text-[10px] font-black tracking-widest text-[#5e6b7d] uppercase bg-[#F8F9FA]/50">THƯƠNG HIỆU</td>
                  {selected.map(p => <td key={p._id} className="p-6 text-[13px] font-bold text-[#1D1D1F]">{p.brand}</td>)}
                </tr>

                {/* Category */}
                <tr>
                  <td className="p-6 border-r border-[#F0F2F5] text-[10px] font-black tracking-widest text-[#5e6b7d] uppercase bg-[#F8F9FA]/50">DANH MỤC</td>
                  {selected.map(p => <td key={p._id} className="p-6 text-[13px] text-[#1D1D1F]">{categoryLabels[p.category] || p.category}</td>)}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-6 border-r border-[#F0F2F5] text-[10px] font-black tracking-widest text-[#5e6b7d] uppercase bg-[#F8F9FA]/50">ĐÁNH GIÁ</td>
                  {selected.map(p => (
                    <td key={p._id} className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />)}</div>
                        <span className="text-[12px] font-bold text-[#1D1D1F]">{p.rating}</span>
                        <span className="text-[10px] text-[#8A9BB0]">({p.numReviews})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Stock */}
                <tr>
                  <td className="p-6 border-r border-[#F0F2F5] text-[10px] font-black tracking-widest text-[#5e6b7d] uppercase bg-[#F8F9FA]/50">TỒN KHO</td>
                  {selected.map(p => (
                    <td key={p._id} className="p-6">
                      <span className={`text-[12px] font-bold ${p.stock > 20 ? 'text-emerald-500' : p.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                        {p.stock > 0 ? `Còn ${p.stock} sản phẩm` : 'Hết hàng'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Dynamic Specs */}
                {getSpecRows().map((row, i) => (
                  <tr key={i}>
                    <td className="p-6 border-r border-[#F0F2F5] text-[10px] font-black tracking-widest text-[#5e6b7d] uppercase bg-[#F8F9FA]/50">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="p-6 text-[12px] font-medium text-[#1D1D1F]">{val}</td>
                    ))}
                  </tr>
                ))}

                {/* Price Comparison */}
                <tr className="bg-[#F8F9FA]/50">
                  <td className="p-6 border-r border-[#F0F2F5] text-[10px] font-black tracking-widest text-[#5e6b7d] uppercase">GIÁ BÁN</td>
                  {selected.map(p => (
                    <td key={p._id} className="p-6">
                      <div className="text-xl font-black text-[#0056D2]">{(p.discountPrice || p.price)?.toLocaleString('vi-VN')}đ</div>
                      {p.discountPrice && (
                        <div className="text-[12px] text-[#8A9BB0] line-through mt-1">{p.price?.toLocaleString('vi-VN')}đ</div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-6 border-r border-[#F0F2F5] bg-[#F8F9FA]/50"></td>
                  {selected.map(product => (
                    <td key={product._id} className="p-6 space-y-3">
                      <button
                        onClick={() => handleBuy(product)}
                        className="w-full bg-[#0056D2] hover:bg-blue-700 text-white px-4 py-3 rounded-full text-[13px] font-bold transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Thêm vào giỏ
                      </button>
                      <Link
                        href={`/product/${product.slug}`}
                        className="block text-center w-full bg-white hover:bg-[#F8F9FA] text-[#1D1D1F] border border-[#E8EAED] px-4 py-3 rounded-full text-[13px] font-bold transition-colors"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
