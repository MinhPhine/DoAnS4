'use client';

import { MessageSquare, TrendingUp, Sparkles, User, Mail, Phone, Lock, Bell, Star } from "lucide-react";
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="w-full pb-24 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="space-y-10">
        
        <section className="bg-white rounded-[48px] p-12 lg:p-16 border border-[#E8EAED] shadow-sm">
          
          <div className="mb-14">
            <h1 className="text-[36px] font-black text-[#1D1D1F] tracking-tighter mb-2 leading-none uppercase">
              CÀI ĐẶT TÀI KHOẢN
            </h1>
            <p className="text-[#8A9BB0] text-[15px] font-bold">
              Quản lý thông tin cá nhân, bảo mật và tùy chỉnh trải nghiệm của bạn.
            </p>
          </div>

          <div className="mb-14">
            <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight mb-10">Thông tin cá nhân</h2>
            
            <div className="flex items-center gap-10 mb-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-105">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                 <h3 className="font-black text-[#1D1D1F] text-[16px] mb-1">Ảnh đại diện</h3>
                 <p className="text-[#8A9BB0] text-[12px] font-bold mb-4">PNG, JPG tối đa 5MB</p>
                 <button className="text-[13px] font-black text-[#0061FF] hover:underline uppercase tracking-[0.2em] transition-all">
                   THAY ĐỔI ẢNH
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.25em] mb-4 px-1">
                  HO VÀ TÊN
                </label>
                <input type="text" defaultValue="Nguyễn Minh Quân" className="w-full bg-[#f1f3f4] hover:bg-[#EBECEE] focus:bg-white focus:ring-4 focus:ring-primary/10 border border-transparent focus:border-primary/40 rounded-2xl px-7 py-4.5 text-[15px] font-black text-[#1D1D1F] outline-none transition-all shadow-inner" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.25em] mb-4 px-1">
                  SỐ ĐIỆN THOẠI
                </label>
                <input type="text" defaultValue="0901 234 567" className="w-full bg-[#f1f3f4] hover:bg-[#EBECEE] focus:bg-white focus:ring-4 focus:ring-primary/10 border border-transparent focus:border-primary/40 rounded-2xl px-7 py-4.5 text-[15px] font-black text-[#1D1D1F] outline-none transition-all shadow-inner" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.25em] mb-4 px-1">
                EMAIL (KHÔNG THỂ THAY ĐỔI)
              </label>
              <input type="email" value="quan.nguyen@digitalcurator.vn" disabled className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-2xl px-7 py-4.5 text-[15px] font-bold text-[#8A9BB0] outline-none" />
            </div>
          </div>

          <div className="border-t border-[#F1F3F4] my-14"></div>

          <div className="mb-14">
            <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight mb-10">Đổi mật khẩu</h2>
            <div className="space-y-8">
              <div className="max-w-xl">
                <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4 px-1">MẬT KHẨU CŨ</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#F1F3F4] rounded-2xl px-7 py-4.5 text-[15px] font-black outline-none transition-all shadow-inner" />
              </div>
              <div className="max-w-xl">
                <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4 px-1">MẬT KHẨU MỚI</label>
                <input type="password" placeholder="Tối thiểu 8 ký tự" className="w-full bg-[#F1F3F4] rounded-2xl px-7 py-4.5 text-[15px] font-black outline-none transition-all shadow-inner" />
              </div>
              <div className="max-w-xl">
                <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-[0.2em] mb-4 px-1">XÁC NHẬN MẬT KHẨU MỚI</label>
                <input type="password" placeholder="Nhập lại mật khẩu mới" className="w-full bg-[#F1F3F4] rounded-2xl px-7 py-4.5 text-[15px] font-black outline-none transition-all shadow-inner" />
              </div>
            </div>
          </div>

          <div className="border-t border-[#F1F3F4] my-14"></div>

          <div className="mb-14">
            <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight mb-10">Cài đặt thông báo</h2>
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-[18px] bg-[#E8F0FE] flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                    <MessageSquare size={24} className="fill-current" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#1D1D1F] text-[16px] mb-1">Bình luận và Phản hồi</h4>
                    <p className="text-[#8A9BB0] text-[14px] font-bold">Nhận thông báo khi có người trả lời bài viết của bạn.</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 md:ml-auto">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-primary border border-transparent"></div>
                    </div>
                    <span className="text-[13px] font-black text-[#1D1D1F] uppercase tracking-wider group-hover:text-primary transition-colors">Push</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-14 h-7 bg-[#E8EAED] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-primary border border-transparent"></div>
                    </div>
                    <span className="text-[13px] font-black text-[#8A9BB0] uppercase tracking-wider group-hover:text-[#1D1D1F] transition-colors">Email</span>
                  </label>
                </div>
              </div>
              <div className="border-t border-[#F1F3F4]"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-[18px] bg-[#E4F5E6] flex items-center justify-center text-[#2C7A32] shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#1D1D1F] text-[16px] mb-1">Cập nhật Thị trường</h4>
                    <p className="text-[#8A9BB0] text-[14px] font-bold">Thông tin về giá các thiết bị công nghệ mới nhất.</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 md:ml-auto">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-primary border border-transparent"></div>
                    </div>
                    <span className="text-[13px] font-black text-[#1D1D1F] uppercase tracking-wider group-hover:text-primary transition-colors">Push</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-primary border border-transparent"></div>
                    </div>
                    <span className="text-[13px] font-black text-[#1D1D1F] uppercase tracking-wider group-hover:text-primary transition-colors">Email</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F1F3F4] my-14"></div>

          <div className="bg-[#F8F9FA] rounded-[32px] p-10 border border-[#E8EAED] flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-sm">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-[22px] font-black text-[#1D1D1F] tracking-tight">Bảo mật 2 lớp (2FA)</h2>
                <span className="bg-[#2C7A32] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg flex items-center gap-2">
                  <Sparkles size={12} /> Khuyên dùng
                </span>
              </div>
              <p className="text-[#8A9BB0] text-[15px] font-bold max-w-sm leading-relaxed">
                Bảo vệ tài khoản của bạn bằng cách yêu cầu mã xác minh mỗi khi đăng nhập trên thiết bị mới.
              </p>
            </div>
            <button className="bg-[#1D1D1F] text-white px-12 py-5 rounded-[24px] text-[15px] font-black hover:bg-black transition-all shadow-xl shadow-black/10 shrink-0 uppercase tracking-widest">
              Thiết lập ngay
            </button>
          </div>

          <div className="flex justify-end items-center gap-10 pt-16 text-center">
             <button className="text-[15px] font-black text-[#8A9BB0] hover:text-[#1D1D1F] transition-all uppercase tracking-[0.2em]">
               Hủy bỏ
             </button>
             <button className="bg-[#0061FF] text-white px-16 py-5 rounded-[40px] text-[16px] font-black hover:bg-[#0056D2] shadow-2xl shadow-blue-600/30 transition-all uppercase tracking-[0.05em]">
               Lưu thay đổi
             </button>
          </div>

        </section>
      </div>
    </div>
  );
}
