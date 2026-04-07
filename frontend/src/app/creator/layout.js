'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, MessageSquare, BarChart3, Settings, HelpCircle } from 'lucide-react';

export default function CreatorLayout({ children }) {
  const pathname = usePathname();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Bảng điều khiển', href: '/creator/dashboard' },
    { icon: FileText, label: 'Bài viết của tôi', href: '/creator/posts' },
    { icon: MessageSquare, label: 'Tin nhắn', href: '/creator/messages' },
    { icon: BarChart3, label: 'Thống kê', href: '#' },
    { icon: Settings, label: 'Cài đặt', href: '#' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E8EAED] flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-[#E8EAED]">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 bg-[#0056D2] rounded-lg flex items-center justify-center text-white font-black italic">D</div>
             <span className="text-[14px] font-black text-[#0056D2] tracking-tight uppercase">The Digital Curator</span>
          </div>
          <span className="text-[10px] font-black text-[#8A9BB0] tracking-[0.2em] ml-10">CREATOR STUDIO</span>
        </div>

        {/* Profile Card */}
        <div className="px-4 py-6">
           <div className="bg-[#F8F9FA] rounded-2xl p-4 flex items-center gap-3 border border-[#E8EAED]">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
                 <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" alt="Avatar" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[12px] font-black text-[#1D1D1F]">Hoàng Việt</span>
                 <span className="text-[10px] font-bold text-[#8A9BB0]">Tech Editor</span>
              </div>
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 space-y-1">
           {menuItems.map((item, i) => {
             const isActive = pathname === item.href;
             return (
               <Link 
                 key={i} 
                 href={item.href}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${isActive ? 'bg-[#E8F0FE] text-[#0056D2]' : 'text-[#8A9BB0] hover:bg-[#F8F9FA] hover:text-[#1D1D1F]'}`}
               >
                  <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
                  <span>{item.label}</span>
               </Link>
             );
           })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E8EAED]">
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold text-[#8A9BB0] hover:bg-[#F8F9FA] hover:text-[#1D1D1F] transition-all">
              <HelpCircle size={18} />
              <span>Help Center</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow ml-64 flex flex-col min-h-screen">
        {/* Top Header Placeholder if needed, but mockups show page-specific headers */}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
