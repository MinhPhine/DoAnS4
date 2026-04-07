import { ChevronLeft, ShieldCheck, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container-custom">
        <div className="flex items-center space-x-4 mb-12">
           <Link href="/cart" className="p-2 bg-white rounded-full border border-border-custom hover:border-primary text-secondary hover:text-primary transition-all">
              <ChevronLeft size={20} />
           </Link>
           <h1 className="text-3xl font-extrabold text-[#1D1D1F]">Thanh toán</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-3xl border border-border-custom shadow-sm p-8">
               <h3 className="text-lg font-bold mb-8 flex items-center space-x-3">
                  <MapPin size={20} className="text-primary" />
                  <span>THÔNG TIN GIAO HÀNG</span>
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Họ và tên" placeholder="Nguyễn Văn A" required />
                  <Input label="Số điện thoại" placeholder="090 123 4567" required />
                  <div className="md:col-span-2">
                     <Input label="Địa chỉ gợi ý" placeholder="Số nhà, tên đường..." required />
                  </div>
                  <Input label="Tỉnh / Thành phố" placeholder="Hồ Chí Minh" required />
                  <Input label="Quận / Huyện" placeholder="Quận 1" required />
               </div>
               <div className="mt-4">
                  <Input label="Ghi chú đơn hàng" placeholder="Ví dụ: Giao giờ hành chính..." />
               </div>
            </div>

            <div className="bg-white rounded-3xl border border-border-custom shadow-sm p-8">
               <h3 className="text-lg font-bold mb-8 flex items-center space-x-3">
                  <CreditCard size={20} className="text-primary" />
                  <span>PHƯƠNG THỨC THANH TOÁN</span>
               </h3>
               <div className="space-y-4">
                  <label className="flex items-center justify-between p-6 border-2 border-primary bg-primary/5 rounded-2xl cursor-pointer">
                     <div className="flex items-center space-x-4">
                        <div className="w-5 h-5 border-4 border-primary rounded-full"></div>
                        <div>
                           <p className="font-bold text-sm">Thanh toán khi nhận hàng (COD)</p>
                           <p className="text-xs text-secondary">Thanh toán tiền mặt khi nhận hàng.</p>
                        </div>
                     </div>
                  </label>
                  <label className="flex items-center justify-between p-6 border border-border-custom rounded-2xl cursor-pointer hover:border-gray-400 transition-colors">
                     <div className="flex items-center space-x-4 opacity-50">
                        <div className="w-5 h-5 border-2 border-border-custom rounded-full"></div>
                        <div>
                           <p className="font-bold text-sm">Chuyển khoản ngân hàng</p>
                           <p className="text-xs text-secondary">Quét mã QR để thanh toán nhanh hơn.</p>
                        </div>
                     </div>
                  </label>
               </div>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-3xl border border-border-custom shadow-xl p-8 sticky top-24">
               <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#1D1D1F]">Đơn hàng của bạn</h3>
               <div className="space-y-6 mb-8">
                  {[1, 2].map(i => (
                    <div key={i} className="flex space-x-4">
                       <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-border-custom p-2">
                          <img src="https://images.unsplash.com/photo-1695048133142-13c8ed4202c4?auto=format&fit=crop&q=80&w=100" alt="Product" className="w-full h-full object-contain" />
                       </div>
                       <div className="flex-grow">
                          <h4 className="font-bold text-xs line-clamp-2">iPhone 15 Pro Max 256GB - Titan Tự Nhiên</h4>
                          <div className="flex justify-between items-center mt-1">
                             <span className="text-[10px] text-secondary">x1</span>
                             <span className="font-bold text-xs">34.990.000đ</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="border-t border-border-custom pt-6 space-y-4 mb-8">
                  <div className="flex justify-between text-xs">
                     <span className="text-secondary">Tạm tính</span>
                     <span className="font-bold">69.980.000đ</span>
                  </div>
                  <div className="flex justify-between text-xs">
                     <span className="text-secondary">Vận chuyển</span>
                     <span className="font-bold text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border-custom">
                     <span className="font-bold uppercase tracking-widest text-xs">Tổng cộng</span>
                     <span className="text-xl font-extrabold text-primary">69.980.000đ</span>
                  </div>
               </div>
               <Button className="py-4 shadow-lg shadow-blue-500/20">XÁC NHẬN ĐẶT HÀNG</Button>
               <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-secondary font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span>Thanh toán bảo mật 100%</span>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
