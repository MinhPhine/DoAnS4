'use client';

import { ShoppingBag, Package, Truck, Clock, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PurchaseHistoryPage() {
  const [activeStatus, setActiveStatus] = useState('all');

  const statuses = [
    { id: 'all', label: 'Tất cả đơn hàng' },
    { id: 'processing', label: 'Đang xử lý' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'done', label: 'Đã hoàn thành' }
  ];

  const orders = [
    {
      id: 'DC-9284751',
      date: '15 Th05, 2024',
      status: 'ĐÃ HOÀN THÀNH',
      statusType: 'done',
      badgeClass: 'bg-[#E7F5EA] text-[#2C7A32]',
      dotClass: 'bg-[#2C7A32]',
      icon: ShoppingBag,
      product: 'MacBook Pro M3 Max - 14-inch Space Black',
      specs: 'Cấu hình: 36GB RAM, 1TB SSD, 14-core GPU',
      price: '74.990.000đ',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200',
      actions: [
        { label: 'Chi tiết', type: 'ghost' },
        { label: 'Mua lại', type: 'primary' }
      ]
    },
    {
      id: 'DC-1029384',
      date: '22 Th05, 2024',
      status: 'ĐANG GIAO',
      statusType: 'shipping',
      badgeClass: 'bg-[#0056D2] text-white',
      dotClass: 'bg-white',
      icon: Truck,
      product: 'Sony WH-1000XM5 Wireless Noise Cancelling',
      specs: 'Màu sắc: Midnight Blue | Số lượng: 01',
      price: '8.490.000đ',
      image: 'https://images.unsplash.com/photo-1618366712010-8c0e2474d2c4?auto=format&fit=crop&q=80&w=200',
      actions: [
        { label: 'Theo dõi lộ trình', type: 'ghost' }
      ]
    },
    {
      id: 'DC-3344556',
      date: 'Hôm nay, 10:24 AM',
      status: 'ĐANG XỬ LÝ',
      statusType: 'processing',
      badgeClass: 'bg-[#F1F3F4] text-[#8A9BB0]',
      dotClass: 'bg-[#8A9BB0]',
      icon: MessageSquare,
      product: 'Keychron Q1 Pro Wireless Mechanical Keyboard',
      specs: 'Switch: Gateron Jupiter Red | Layout: 75%',
      price: '4.250.000đ',
      image: 'https://images.unsplash.com/photo-1618384881928-1b5cd81882c8?auto=format&fit=crop&q=80&w=200',
      actions: [
        { label: 'Hủy đơn hàng', type: 'danger' }
      ]
    }
  ];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      
      <div className="mb-14">
        <h1 className="text-[40px] font-black text-[#1D1D1F] tracking-tighter mb-3 leading-none uppercase">
          Lịch sử mua hàng
        </h1>
        <p className="text-[#8A9BB0] text-[16px] font-bold max-w-3xl leading-relaxed">
          Theo dõi các đơn hàng công nghệ, linh kiện và các gói thành viên cao cấp của bạn tại The Digital Curator.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        <aside className="w-full lg:w-[240px] shrink-0 space-y-6 lg:sticky lg:top-28">
           <div className="bg-white rounded-[32px] border border-[#E8EAED] p-8 shadow-sm">
             <h4 className="text-[12px] font-black text-[#1D1D1F] uppercase tracking-[0.2em] mb-4">Trạng thái</h4>
             <div className="space-y-3">
                {statuses.map((status) => (
                  <label 
                    key={status.id} 
                    className="flex items-center gap-3.5 cursor-pointer group"
                    onClick={() => setActiveStatus(status.id)}
                  >
                    <div className={`w-5.5 h-5.5 rounded-md border-2 flex items-center justify-center transition-all ${
                      activeStatus === status.id ? 'bg-[#0056D2] border-[#0056D2]' : 'border-[#E8EAED] group-hover:border-[#0056D2]'
                    }`}>
                      {activeStatus === status.id && <CheckCircle2 size={12} className="text-white fill-white" />}
                    </div>
                    <span className={`text-[13px] font-bold transition-colors ${
                      activeStatus === status.id ? 'text-[#1D1D1F]' : 'text-[#8A9BB0] group-hover:text-[#1D1D1F]'
                    }`}>
                      {status.label}
                    </span>
                  </label>
                ))}
             </div>
           </div>

           <div className="bg-white rounded-[32px] border border-[#E8EAED] p-8 shadow-sm">
             <h4 className="text-[12px] font-black text-[#1D1D1F] uppercase tracking-[0.2em] mb-4">Khoảng thời gian</h4>
             <button className="w-full bg-[#f1f3f4] hover:bg-[#EBECEE] border-none rounded-xl px-5 py-3.5 flex items-center justify-between text-[13px] font-bold text-[#1D1D1F] transition-all">
                30 ngày gần nhất 
                <ChevronDown size={18} className="text-[#8A9BB0]" />
             </button>
           </div>
        </aside>

        <div className="flex-grow space-y-8 w-full">
           {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-[32px] border border-[#E8EAED] shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                 
                 <div className="px-10 py-6 border-b border-[#F1F3F4] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                       <div className="flex items-center gap-4">
                          <div className="w-9 h-9 bg-[#F1F3F4] rounded-lg flex items-center justify-center text-[#1D1D1F]">
                             <order.icon size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest leading-none mb-1">Mã đơn hàng</p>
                             <p className="text-[14px] font-black text-[#1D1D1F]">#{order.id}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div>
                             <p className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest leading-none mb-1">Ngày mua</p>
                             <p className="text-[14px] font-black text-[#1D1D1F]">{order.date}</p>
                          </div>
                       </div>
                    </div>
                    <span className={`${order.badgeClass} text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-sm`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${order.dotClass}`} /> 
                       {order.status}
                    </span>
                 </div>

                 <div className="p-10 flex flex-col md:flex-row items-center md:items-stretch gap-8 relative">
                    <div className="w-24 h-24 bg-[#F8F9FA] rounded-2xl overflow-hidden border border-[#E8EAED] shrink-0 p-3 group-hover:scale-105 transition-all duration-500">
                       <img src={order.image} alt={order.product} className="w-full h-full object-contain mix-blend-darken" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between text-center md:text-left">
                       <div>
                          <h3 className="text-[17px] font-black text-[#1D1D1F] mb-1 tracking-tight leading-tight">{order.product}</h3>
                          <p className="text-[#8A9BB0] text-[12px] font-bold mb-4">{order.specs}</p>
                       </div>
                       <div className="text-[22px] font-black text-[#0056D2] tracking-tighter mt-auto">
                          {order.price}
                       </div>
                    </div>
                    
                    {/* BUTTONS POSITIONED AT BOTTOM RIGHT */}
                    <div className="flex items-center gap-3 w-full md:w-auto self-end mt-4 md:mt-0 lg:absolute lg:bottom-10 lg:right-10">
                       {order.actions.map((action, i) => (
                         <button 
                           key={i}
                           className={`px-8 py-2.5 rounded-full text-[13px] font-bold transition-all whitespace-nowrap ${
                             action.type === 'primary' ? 'bg-[#0056D2] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10' :
                             action.type === 'danger' ? 'bg-[#FEECEC] text-[#C53030] hover:bg-red-100' :
                             'bg-[#E8F0FE] text-[#5e6b7d] hover:bg-blue-100'
                           }`}
                         >
                           {action.label}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
