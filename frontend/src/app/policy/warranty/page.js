'use client';

import { ShieldCheck, Laptop, Tablet, Smartphone, Headphones, Watch, XOctagon, RefreshCcw, Search, Hammer, CheckSquare, PhoneCall, MessageCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function WarrantyPage() {
  const warrantyPeriods = [
    { icon: Laptop, title: 'Máy tính & Laptop', period: 'Bảo hành 12 - 24 tháng theo tiêu chuẩn nhà sản xuất.' },
    { icon: Smartphone, title: 'Điện thoại di động', period: 'Bảo hành 12 tháng. 1 đổi 1 trong 30 ngày đầu.' },
    { icon: Headphones, title: 'Phụ kiện Audio', period: 'Bảo hành 6 - 12 tháng cho các lỗi kỹ thuật.' },
    { icon: Watch, title: 'Smartwatch', period: 'Bảo hành 12 tháng. Hỗ trợ thay pin miễn phí năm đầu.' },
  ];

  const refusalCases = [
    { icon: XOctagon, title: 'Hư hỏng do chất lỏng', color: 'text-red-500' },
    { icon: Hammer, title: 'Tác động vật lý', color: 'text-orange-500' },
    { icon: Search, title: 'Can thiệp trái phép', color: 'text-purple-500' },
    { icon: RefreshCcw, title: 'Lỗi phần mềm/BP khóa', color: 'text-blue-500' },
  ];

  const steps = [
    { num: '01', title: 'Tiếp nhận yêu cầu', desc: 'Liên hệ qua hotline hoặc mang trực tiếp sản phẩm đến trung tâm.' },
    { num: '02', title: 'Kiểm tra lỗi', desc: 'Kỹ thuật viên kiểm tra sơ bộ và xác nhận tình trạng bảo hành.' },
    { num: '03', title: 'Xử lý kỹ thuật', desc: 'Tiến hành thay thế linh kiện chính hãng hoặc sửa chữa chuyên sâu.' },
    { num: '04', title: 'Bàn giao & Test', desc: 'Khách hàng kiểm tra thiết bị và nhận phiếu bảo hành bổ sung.' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-[#F8F9FA] overflow-hidden relative border-b border-[#E8EAED]">
        <div className="container-custom py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-grow max-w-2xl relative z-10">
            <Breadcrumbs items={[{ label: 'Chính sách', href: '/policy' }, { label: 'Bảo hành' }]} />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-primary rounded-full"></span>
              <span className="text-primary text-[13px] font-black uppercase tracking-[0.2em]">Thông tin pháp lý</span>
            </div>
            <h1 className="text-[56px] lg:text-[72px] font-black text-[#1D1D1F] tracking-tighter leading-[0.9] mb-8">
              Chính sách <br />
              <span className="text-primary">Bảo hành Toàn diện</span>
            </h1>
            <p className="text-[#8A9BB0] text-[18px] font-bold leading-relaxed max-w-lg mb-10">
              Tại The Digital Curator, chúng tôi cam kết mang lại sự an tâm tuyệt đối cho cộng đồng qua các tiêu chuẩn bảo hành khắt khe nhất đối với mọi thiết bị công nghệ.
            </p>
            <div className="flex items-center gap-10">
               <div className="bg-white px-8 py-5 rounded-[24px] shadow-xl shadow-black/5 border border-[#E8EAED] flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E7F5EA] text-[#2C7A32] rounded-full flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-[#1D1D1F]">100% Chính hãng</p>
                    <p className="text-[11px] font-bold text-[#8A9BB0]">Cam kết linh kiện gốc</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="relative shrink-0 w-full lg:w-1/2 flex justify-center">
            {/* Technician Image Mockup */}
            <div className="relative w-[300px] h-[400px] lg:w-[400px] lg:h-[500px] bg-gradient-to-br from-blue-100 to-white rounded-[40px] overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" alt="Specialist" className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform hover:scale-105 duration-700" />
               <div className="absolute top-8 right-8 bg-[#2C7A32] text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-green-500/30">
                 <Star size={14} className="fill-white" /> Cam kết chính hãng
               </div>
            </div>
            {/* Background decorative circles */}
            <div className="absolute -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -top-20 -right-20"></div>
            <div className="absolute -z-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl bottom-10 -left-10"></div>
          </div>
        </div>
      </section>

      {/* 2. WARRANTY PERIODS & CONDITIONS */}
      <section className="py-24 container-custom">
        <div className="flex flex-col xl:flex-row gap-16">
          <div className="flex-grow">
            <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight mb-12">Thời gian bảo hành chuẩn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {warrantyPeriods.map((item, i) => (
                <div key={i} className="flex gap-6 p-6 hover:bg-[#F8F9FA] rounded-[32px] transition-colors border border-transparent hover:border-[#E8EAED]">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#F1F3F4] flex items-center justify-center text-primary shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-black text-[#1D1D1F] mb-1">{item.title}</h3>
                    <p className="text-[#8A9BB0] text-[13px] font-bold leading-relaxed">{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-[#8A9BB0] text-[11px] italic font-bold">
              * Thời gian bảo hành có thể thay đổi tùy theo chương trình khuyến mãi và thương hiệu cụ thể.
            </p>
          </div>

          <aside className="w-full xl:w-[400px] shrink-0">
            <div className="bg-primary rounded-[40px] p-10 text-white shadow-2xl shadow-blue-500/20 sticky top-28">
              <h2 className="text-[24px] font-black mb-8 leading-tight">Điều kiện <br/> Bảo hành</h2>
              <ul className="space-y-5 mb-10">
                {[
                  'Sản phẩm còn nguyên tem bảo hành và số serial không bị mờ.',
                  'Lỗi phát sinh do nhà sản xuất trong điều kiện sử dụng bình thường.',
                  'Có hóa đơn mua hàng hoặc thông tin đơn hàng điện tử hợp lệ.'
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-[14px] font-black group">
                    <div className="w-5 h-5 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white transition-all group-hover:text-primary">
                      <CheckSquare size={10} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-primary py-5 rounded-[24px] text-[14px] font-black hover:bg-gray-100 transition-all shadow-xl shadow-black/10">
                Kiểm tra Imei/Serial
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. REFUSAL CASES */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="container-custom">
          <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight mb-16 text-center lg:text-left">Trường hợp từ chối bảo hành</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {refusalCases.map((item, i) => (
              <div key={i} className="bg-white rounded-[32px] p-10 border border-[#E8EAED] text-center group hover:-translate-y-2 transition-all duration-300">
                <div className={`${item.color} w-16 h-16 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-[17px] font-black text-[#1D1D1F] mb-4">{item.title}</h3>
                <p className="text-[#8A9BB0] text-[13px] font-bold leading-relaxed opacity-80">
                  Lỗi phát sinh do người dùng sử dụng sai quy chuẩn hoặc tác động ngoại lực không được chấp nhận.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESSING STEPS */}
      <section className="py-24 container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-[28px] font-black text-[#1D1D1F] tracking-tight">Quy trình xử lý bảo hành</h2>
          <p className="text-[#8A9BB0] text-[14px] font-bold text-right max-w-sm">
            Chúng tôi tối ưu hóa quy trình để thiết bị của bạn sớm được quay trở lại phục vụ công việc và cuộc sống.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {steps.map((step, i) => (
             <div key={i} className="bg-[#F1F3F4] rounded-[48px] p-10 relative overflow-hidden group hover:bg-white hover:shadow-xl border border-transparent hover:border-[#E8EAED] transition-all duration-500">
                <div className="text-[56px] font-black text-[#8A9BB0]/20 absolute top-4 right-8 leading-none group-hover:text-primary/10 transition-colors">{step.num}</div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-10 relative z-10">
                  <span className="font-black text-[18px]">★</span>
                </div>
                <h4 className="text-[17px] font-black text-[#1D1D1F] mb-4 relative z-10">{step.title}</h4>
                <p className="text-[#8A9BB0] text-[14px] font-bold leading-relaxed relative z-10">{step.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* BOTTOM SUPPORT CALLOUT */}
      <section className="py-24 container-custom">
        <div className="bg-[#F8F9FA] rounded-[64px] border border-[#E8EAED] p-16 text-center max-w-5xl mx-auto shadow-sm">
           <h2 className="text-[36px] font-black text-[#1D1D1F] tracking-tighter mb-4 leading-none">Bạn cần hỗ trợ ngay lập tức?</h2>
           <p className="text-[#8A9BB0] text-[18px] font-bold mb-12">
             Đội ngũ kỹ thuật viên của The Digital Curator luôn sẵn sàng giải đáp mọi thắc mắc về tình trạng thiết bị của bạn 24/7.
           </p>
           <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="bg-[#0056D2] text-white px-12 py-5 rounded-[24px] text-[15px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3">
                <PhoneCall size={20} /> 1900 1234
              </button>
              <button className="bg-white text-[#1D1D1F] border border-[#E8EAED] px-12 py-5 rounded-[24px] text-[15px] font-black hover:bg-[#F1F3F4] transition-all flex items-center gap-3">
                <MessageCircle size={20} /> Chat với chuyên gia
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}
