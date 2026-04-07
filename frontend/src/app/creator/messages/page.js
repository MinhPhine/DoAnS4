import { Search, Info, Phone, Video, MoreVertical, Plus, Image as ImageIcon, Smile, Send, CheckCircle2, MoreHorizontal, ChevronRight, Paperclip, Download } from 'lucide-react';

export default function MessagesPage() {
  const contacts = [
    { id: 1, name: 'Thanh Vy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', lastMsg: 'Tôi thấy bài viết của bạn rất hay!', time: '12:45 PM', active: true, unread: 0, status: 'online' },
    { id: 2, name: 'Minh Phi', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150', lastMsg: 'Hello!', time: 'Hôm qua', active: false, unread: 1, status: 'offline' },
    { id: 3, name: 'Tech Reviewers Hub', avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=150', lastMsg: 'Dũng: Bài đó hay', time: 'Thứ Ba', active: false, unread: 0, status: 'online', isGroup: true },
    { id: 4, name: 'Phương Anh Đào', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', lastMsg: 'Cảm ơn bạn!', time: 'Thứ Hai', active: false, unread: 0, status: 'online' }
  ];

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      
      {/* LEFT: CHAT LIST */}
      <div className="w-[380px] border-r border-[#E8EAED] flex flex-col shrink-0 flex-grow lg:flex-grow-0">
         <div className="p-6">
            <h1 className="text-[24px] font-black text-[#1D1D1F] mb-6 tracking-tight">Messages</h1>
            <div className="relative mb-6">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9BB0]" size={18} />
               <input 
                 type="text" 
                 placeholder="Search conversations..." 
                 className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl py-3 pl-12 pr-4 text-[13px] font-medium outline-none"
               />
            </div>
            <div className="flex gap-6 border-b border-[#E8EAED]">
               <button className="pb-3 text-[13px] font-black text-[#0056D2] border-b-2 border-[#0056D2]">Focused</button>
               <button className="pb-3 text-[13px] font-bold text-[#8A9BB0] hover:text-[#1D1D1F]">Other</button>
            </div>
         </div>

         <div className="flex-grow overflow-y-auto scrollbar-hide px-3">
            {contacts.map((contact, i) => (
              <div 
                key={contact.id} 
                className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all hover:bg-[#F8F9FA] group ${i === 0 ? 'bg-[#E8F0FE]/50 relative' : ''}`}
              >
                 {i === 0 && <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#0056D2] rounded-r-full" />}
                 <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8EAED]">
                       <img src={contact.avatar} alt={contact.name} />
                    </div>
                    {contact.status === 'online' && (
                      <div className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                 </div>
                 <div className="flex-grow flex flex-col gap-0.5 overflow-hidden">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[14px] font-black text-[#1D1D1F] line-clamp-1 truncate">{contact.name}</h4>
                       <span className="text-[10px] font-bold text-[#8A9BB0]">{contact.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <p className={`text-[12px] line-clamp-1 truncate ${contact.unread > 0 ? 'font-black text-[#1D1D1F]' : 'text-[#8A9BB0]'}`}>
                         {contact.lastMsg}
                       </p>
                       {contact.unread > 0 && (
                         <span className="bg-[#0056D2] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                           {contact.unread}
                         </span>
                       )}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* RIGHT: CHAT BOX */}
      <div className="flex-grow flex flex-col bg-white">
         
         {/* Top Header */}
         <header className="h-[80px] border-b border-[#E8EAED] px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
               <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E8EAED]">
                     <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Avatar" />
                  </div>
                  <div className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
               </div>
               <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                     <h2 className="text-[15px] font-black text-[#1D1D1F]">Thanh Vy</h2>
                     <CheckCircle2 size={14} className="text-[#0056D2] fill-[#E8F0FE]" />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">● Active Now</span>
               </div>
            </div>
            <div className="flex items-center gap-4 text-[#8A9BB0]">
               <button className="p-3 hover:bg-[#F8F9FA] hover:text-[#1D1D1F] rounded-xl transition-all"><Video size={20} /></button>
               <button className="p-3 hover:bg-[#F8F9FA] hover:text-[#1D1D1F] rounded-xl transition-all"><Phone size={20} /></button>
               <button className="p-3 hover:bg-[#F8F9FA] hover:text-[#1D1D1F] rounded-xl transition-all"><MoreVertical size={20} /></button>
            </div>
         </header>

         {/* Chat History */}
         <div className="flex-grow overflow-y-auto p-10 space-y-8 scrollbar-hide bg-[#FFFFFF] shadow-inner shadow-black/5">
            
            <div className="flex justify-center">
               <span className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-[0.3em] bg-[#F8F9FA] px-4 py-1.5 rounded-full">TODAY</span>
            </div>

            {/* Recipient Message */}
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" />
               </div>
               <div className="flex flex-col gap-2">
                  <div className="bg-[#F8F9FA] border border-[#E8EAED] p-4 rounded-2xl rounded-tl-none text-[14px] text-[#444] leading-relaxed">
                    Tôi thấy bài viết của bạn rất hay!
                  </div>
                  <span className="text-[10px] font-bold text-[#8A9BB0] ml-1">12:38 PM</span>
               </div>
            </div>

            {/* Sender Message */}
            <div className="flex flex-row-reverse gap-4 max-w-full">
               <div className="flex flex-col items-end gap-2">
                  <div className="bg-[#0056D2] text-white p-4 rounded-2xl rounded-tr-none text-[14px] font-medium leading-relaxed shadow-lg shadow-blue-500/10">
                    Thank Vy! Hãy chia sẻ nhé
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#8A9BB0]">12:42 PM</span>
                    <CheckCircle2 size={12} className="text-[#0056D2]" />
                  </div>
               </div>
            </div>

            {/* Recipient Message with Image */}
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" />
               </div>
               <div className="flex flex-col gap-2">
                  <div className="bg-[#F8F9FA] border border-[#E8EAED] p-4 rounded-2xl rounded-tl-none text-[14px] text-[#444]">
                    Cái này đẹp
                  </div>
                  <div className="bg-[#F8F9FA] border border-[#E8EAED] rounded-2xl overflow-hidden max-w-[320px] shadow-sm">
                     <img src="https://images.unsplash.com/photo-1695048133142-1a20a5bf616f?auto=format&fit=crop&q=80&w=600" className="w-full h-48 object-cover" />
                     <div className="p-3 flex items-center justify-between bg-white border-t border-[#E8EAED]">
                        <span className="text-[11px] font-bold text-[#1D1D1F] line-clamp-1">m3-max-review-cover.jpg</span>
                        <button className="text-[#0056D2] font-black text-[11px] hover:underline flex items-center gap-1">Download <Download size={14} /></button>
                     </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#8A9BB0] ml-1">12:45 PM</span>
               </div>
            </div>

         </div>

         {/* Input Box */}
         <div className="p-8 border-t border-[#E8EAED]">
            <div className="bg-[#F8F9FA] border border-[#E8EAED] rounded-[24px] p-2 flex items-center gap-1 shadow-inner shadow-black/5">
                <button className="p-3 text-[#8A9BB0] hover:text-[#0056D2] hover:bg-white rounded-full transition-all"><Plus size={20} /></button>
                <button className="p-3 text-[#8A9BB0] hover:text-[#0056D2] hover:bg-white rounded-full transition-all"><ImageIcon size={20} /></button>
                <div className="w-px h-6 bg-[#E8EAED] mx-2"></div>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-grow bg-transparent outline-none px-4 text-[14px] font-medium text-[#1D1D1F]"
                />
                <button className="p-3 text-[#8A9BB0] hover:text-[#0056D2] transition-all"><Smile size={20} /></button>
                <button className="p-4 bg-[#0056D2] text-white rounded-full transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95">
                   <Send size={20} />
                </button>
            </div>
         </div>

      </div>

    </div>
  );
}
