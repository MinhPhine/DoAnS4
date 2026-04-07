'use client';

import { Trash2, ShoppingBag, ShieldCheck, Lock, ArrowRight, Minus, Plus, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, loading, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container-custom pt-12">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-[40px] font-black text-[#1D1D1F] tracking-tight mb-2">Giỏ hàng của bạn</h1>
          <p className="text-[#8A9BB0] text-[15px] font-bold">
            {cart.length === 0
              ? 'Giỏ hàng đang trống.'
              : `Bạn có ${getCartCount()} sản phẩm được tuyển chọn trong giỏ hàng.`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <p className="text-lg font-bold text-gray-400 mb-4">Chưa có sản phẩm nào trong giỏ hàng</p>
            <Link href="/" className="bg-[#0056D2] text-white px-8 py-3 rounded-full font-bold text-[14px] hover:bg-blue-700 transition-colors shadow-md">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* CART ITEMS */}
            <div className="lg:w-2/3 space-y-6">
              {cart.map((item) => {
                const product = item.product;
                // Nếu product chưa populate (chỉ là id string) thì skip
                if (!product || typeof product === 'string') return null;

                const imgSrc = product.images && product.images[0]
                  ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`)
                  : 'https://via.placeholder.com/200?text=No+Image';
                const itemPrice = product.discountPrice || product.price;
                const productId = product._id;

                return (
                  <div key={productId} className="bg-[#F8F9FA] rounded-[32px] p-8 border border-[#E8EAED] flex flex-col md:flex-row gap-8 relative">
                    {/* Thumbnail */}
                    <div className="w-32 h-32 bg-white rounded-[24px] overflow-hidden border border-[#E8EAED] shrink-0">
                      <img src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-[#E8F0FE] text-[#0056D2] text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => removeFromCart(productId)}
                          className="text-[#8A9BB0] hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} strokeWidth={1.5} />
                        </button>
                      </div>
                      <h3 className="text-[20px] font-black text-[#1D1D1F] leading-tight mb-1">{product.name}</h3>
                      <p className="text-[#8A9BB0] text-[13px] font-bold mb-6">{product.category}</p>

                      <div className="mt-auto flex justify-between items-center">
                        {/* Quantity Selector */}
                        <div className="flex items-center bg-white rounded-xl border border-[#E8EAED]">
                          <button
                            onClick={() => updateQuantity(productId, item.qty - 1)}
                            className="w-10 h-10 rounded-l-xl flex items-center justify-center text-[#8A9BB0] hover:bg-gray-50 hover:text-[#1D1D1F] transition-colors"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-10 text-center font-black text-[14px] select-none">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(productId, item.qty + 1)}
                            className="w-10 h-10 rounded-r-xl flex items-center justify-center text-[#8A9BB0] hover:bg-gray-50 hover:text-[#1D1D1F] transition-colors"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                        {/* Price */}
                        <div className="text-[24px] font-black text-[#1D1D1F]">
                          {(itemPrice * item.qty).toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link href="/" className="flex items-center gap-2 text-[#0056D2] font-bold text-[14px] hover:underline mt-4">
                <ChevronLeft size={16} /> Tiếp tục mua sắm
              </Link>
            </div>

            {/* SUMMARY SIDEBAR */}
            <aside className="lg:w-1/3">
              <div className="bg-white rounded-[32px] p-10 border border-[#E8EAED] shadow-sm sticky top-24">
                <h3 className="text-[24px] font-black text-[#1D1D1F] mb-8">Tóm tắt đơn hàng</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[15px] font-bold">
                    <span className="text-[#8A9BB0]">Tạm tính</span>
                    <span className="text-[#1D1D1F]">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-[15px] font-bold">
                    <span className="text-[#8A9BB0]">Phí vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-[15px] font-bold">
                    <span className="text-[#8A9BB0]">Thuế ước tính (VAT 10%)</span>
                    <span className="text-[#1D1D1F]">{tax.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <div className="border-t border-[#F8F9FA] pt-8 mb-10">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[14px] font-black text-[#1D1D1F] uppercase tracking-widest">Tổng cộng</span>
                    <span className="text-[32px] font-black text-[#0056D2]">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <p className="text-[10px] font-black text-[#8A9BB0] text-right uppercase tracking-[0.1em]">BAO GỒM TẤT CẢ CÁC LOẠI THUẾ</p>
                </div>

                {/* Promo Code */}
                <div className="mb-10">
                  <p className="text-[11px] font-black text-[#1D1D1F] uppercase tracking-widest mb-3">Mã giảm giá</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã ưu đãi..."
                      className="flex-grow bg-[#F1F3F4] border-transparent rounded-2xl px-5 py-4 text-[13px] font-bold focus:outline-none focus:bg-white focus:border-[#0056D2] transition-all"
                    />
                    <button className="bg-[#E8F0FE] text-[#0056D2] px-6 py-4 rounded-2xl font-black text-[13px] hover:bg-[#0056D2] hover:text-white transition-all">Áp dụng</button>
                  </div>
                </div>

                <Link
                  href="/checkout/cod"
                  className="w-full bg-[#0056D2] text-white py-5 rounded-[24px] font-black text-[16px] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Tiến hành thanh toán <ArrowRight size={20} />
                </Link>

                <div className="mt-8 flex items-center justify-center gap-2 text-[#8A9BB0]">
                  <Lock size={14} className="opacity-60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Thanh toán bảo mật SSL 256-bit</span>
                </div>
              </div>

              {/* COMMITMENT BANNER */}
              <div className="mt-8 bg-[#E7F5EA] border-transparent rounded-[32px] p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2C7A32] shadow-sm shrink-0 mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#2C7A32] uppercase tracking-[0.1em] mb-1">CAM KẾT TỪ CURATOR</h4>
                  <p className="text-[12px] font-bold text-[#2C7A32]/70 leading-relaxed">Đổi trả miễn phí trong 30 ngày nếu phát hiện lỗi phần cứng.</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
