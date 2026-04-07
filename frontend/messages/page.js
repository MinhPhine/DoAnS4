import { Search, Send, Plus, MoreHorizontal, User, Phone, Video } from 'lucide-react';

export default function ChatInbox() {
  return (
    <div className="flex h-[90vh] bg-white rounded-3xl border border-border-custom shadow-2xl overflow-hidden my-4 container-custom">
      {/* Contacts List */}
      <aside className="w-96 border-r border-border-custom flex flex-col">
        <div className="p-8 border-b border-border-custom">
           <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-extrabold tracking-tight">Tin nhắn</h1>
              <div className="p-2 bg-primary/10 text-primary rounded-xl cursor-pointer hover:bg-primary/20 transition-all"><Plus size={20} /></div>
           </div>
           <div className="flex items-center bg-input-field px-4 py-2.5 rounded-xl">
              <Search size={18} className="text-secondary mr-2" />
              <input type="text" placeholder="Tìm kiếm hội thoại..." className="bg-transparent text-sm w-full outline-none" />
           </div>
        </div>
        <div className="flex-grow overflow-y-auto">
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className={`p-6 flex items-center space-x-4 border-b border-border-custom cursor-pointer transition-all ${i === 1 ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-gray-50'}`}>
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-lg shrink-0">
                   {i === 1 ? 'T' : i === 2 ? 'V' : 'H'}
                </div>
                <div className="flex-grow min-w-0">
                   <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-sm truncate">{i === 1 ? 'Thành Tùng' : 'Hoàng Việt'}</h3>
                      <span className="text-[10px] text-secondary font-bold">15:45</span>
                   </div>
                   <p className="text-xs text-secondary truncate">{i % 2 === 0 ? 'Đã gửi một ảnh' : 'Bài review của bác hay quá, em rất thích...'}</p>
                </div>
                {i === 1 && <div className="w-2 h-2 bg-primary rounded-full"></div>}
             </div>
           ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-grow flex flex-col bg-gray-50/50">
        <header className="px-8 py-4 bg-white border-b border-border-custom flex justify-between items-center">
           <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">T</div>
              <div>
                 <h4 className="font-bold text-sm">Thành Tùng</h4>
                 <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">Đang hoạt động</span>
                 </div>
              </div>
           </div>
           <div className="flex items-center space-x-6 text-secondary">
              <button className="hover:text-primary transition-colors"><Phone size={20} /></button>
              <button className="hover:text-primary transition-colors"><Video size={20} /></button>
              <button className="hover:text-primary transition-colors"><MoreHorizontal size={20} /></button>
           </div>
        </header>

        {/* Messages Feed */}
        <div className="flex-grow p-8 overflow-y-auto space-y-6">
           <div className="flex justify-center"><span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] bg-white px-4 py-1 rounded-full border border-border-custom">Hôm nay</span></div>
           
           <div className="flex space-x-3 max-w-lg">
              <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0"></div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-border-custom">
                 <p className="text-sm text-secondary leading-relaxed">Chào bác Việt, em vừa xem bài review Laptop X của bác xong. Thấy bác có nhắc đến phần màn hình OLED 4K+.</p>
              </div>
           </div>

           <div className="flex flex-row-reverse space-x-3 space-x-reverse max-w-lg ml-auto">
              <div className="w-8 h-8 rounded-lg bg-primary shrink-0"></div>
              <div className="bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-500/20 text-white">
                 <p className="text-sm leading-relaxed">Chào Tùng, đúng rồi bạn. Màn hình đó là điểm ăn tiền nhất trên Laptop X năm nay đấy. Bạn định múc nó à?</p>
              </div>
           </div>

           <div className="flex space-x-3 max-w-lg">
              <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0"></div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-border-custom">
                 <p className="text-sm text-secondary leading-relaxed">Dạ em đang phân nhắc giữa nó và con MacBook Pro M3. Không biết bác thấy thế nào về độ ổn định khi dùng Premier Pro ạ?</p>
              </div>
           </div>
        </div>

        {/* Chat Input */}
        <div className="p-8 bg-white border-t border-border-custom">
           <div className="flex items-center space-x-4 bg-input-field rounded-2xl px-6 py-3">
              <Plus size={20} className="text-secondary cursor-pointer hover:text-primary transition-colors" />
              <input type="text" placeholder="Viết tin nhắn..." className="bg-transparent flex-grow text-sm outline-none" />
              <button className="text-primary hover:scale-110 transition-transform"><Send size={20} /></button>
           </div>
        </div>
      </main>
    </div>
  );
}
