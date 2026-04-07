import { MailOpen, MessageSquare, Award, Settings as SettingsIcon, AtSign, Sparkles } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      group: "HÔM NAY",
      items: [
        {
          id: 1,
          type: "comment",
          user: "Lê Minh Tuấn",
          action: "đã bình luận vào bài viết:",
          target: '"Đánh giá chi tiết M3 MacBook Pro 14-inch"',
          excerpt: '"Bài viết rất tâm huyết, mình cũng đang phân vân giữa bản 14 và 16 inch..."',
          time: "2 GIỜ TRƯỚC",
          avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=150",
          unread: true,
          icon: <MessageSquare size={13} className="text-white" />,
          iconBg: "bg-[#1877F2]",
        },
        {
          id: 2,
          type: "mention",
          user: "Nguyễn Thu Thủy",
          action: "đã nhắc đến bạn trong một thảo luận tại",
          target: "Creator Studio.",
          time: "5 GIỜ TRƯỚC",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
          unread: true,
          icon: <AtSign size={13} className="text-white" />,
          iconBg: "bg-[#9da4b0]",
        }
      ]
    },
    {
      group: "HÔM QUA",
      items: [
        {
          id: 3,
          type: "achievement",
          title: "Chúc mừng! Bạn đã nhận được huy hiệu Chuyên gia Công nghệ nhờ những đóng góp tích cực trong tháng này.",
          badge: "HUY HIỆU MỚI",
          time: "1 NGÀY TRƯỚC",
          icon: <Award size={20} className="text-[#2C7A32]" />,
          iconBg: "bg-[#E4F5E6]",
          unread: false,
        },
        {
          id: 4,
          type: "system",
          title: "Hệ thống: Bản cập nhật v2.4 đã sẵn sàng. Khám phá các tính năng quản lý bài viết mới trong Creator Studio ngay.",
          time: "1 NGÀY TRƯỚC",
          icon: <SettingsIcon size={20} className="text-[#5e6b7d]" />,
          iconBg: "bg-[#E8EAED]",
          unread: false,
        }
      ]
    }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <div className="container-custom max-w-4xl mx-auto pt-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">
            Thông báo
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#E8EAED] bg-white flex items-center justify-center text-[#1D1D1F]">
              <MailOpen size={18} />
            </div>
            <button className="bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#3e5270] px-5 py-2.5 rounded-full text-[12px] font-bold transition-colors">
              Đánh dấu tất cả là đã đọc
            </button>
          </div>
        </div>

        {/* Notification Groups */}
        <div className="space-y-10">
          {notifications.map((group) => (
            <div key={group.group}>
              <h3 className="text-[10px] font-black uppercase text-[#8A9BB0] tracking-[0.2em] mb-4 pl-2">
                {group.group}
              </h3>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-[24px] p-6 border flex items-start gap-4 transition-all hover:border-primary/30 cursor-pointer ${item.unread ? 'border-transparent shadow-sm' : 'border-[#E8EAED]'}`}
                  >
                    {/* Left Avatar / Icon Area */}
                    <div className="relative shrink-0">
                      {item.avatar ? (
                        <div className="w-12 h-12 rounded-[16px] overflow-hidden">
                          <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${item.iconBg}`}>
                          {item.icon}
                        </div>
                      )}
                      {/* Floating badge for avatar */}
                      {item.avatar && (
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${item.iconBg}`}>
                          {item.icon}
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0 pr-8 relative pt-1">
                      {item.type === 'comment' || item.type === 'mention' ? (
                        <div>
                          <p className="text-[13px] text-[#444] mb-2 leading-relaxed">
                            <span className="font-bold text-[#1D1D1F]">{item.user}</span> {item.action} <span className="font-bold text-primary cursor-pointer hover:underline">{item.target}</span>
                          </p>
                          {item.excerpt && (
                            <div className="bg-[#F8F9FA] rounded-xl p-3.5 text-[12px] text-[#6b7987] italic mb-3">
                              {item.excerpt}
                            </div>
                          )}
                          <p className="text-[9px] font-black text-[#8A9BB0] uppercase tracking-widest">{item.time}</p>
                        </div>
                      ) : (
                        <div>
                          {item.badge && (
                            <span className="inline-block bg-[#2C7A32] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                              {item.badge}
                            </span>
                          )}
                          <p className="text-[13px] text-[#1D1D1F] font-bold leading-relaxed mb-3">
                            {item.title}
                          </p>
                          <p className="text-[9px] font-black text-[#8A9BB0] uppercase tracking-widest">{item.time}</p>
                        </div>
                      )}

                      {/* Unread indicator dot */}
                      {item.unread && (
                        <div className="absolute right-0 top-3 w-2 h-2 rounded-full bg-primary shadow shadow-primary/40"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* End of list state */}
        <div className="bg-white rounded-[32px] p-12 mt-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#E8EAED]">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-sm mb-4">
            <Sparkles size={20} className="text-primary" />
          </div>
          <h3 className="text-[#1D1D1F] font-black text-[15px] mb-2">Bạn đã xem hết thông báo</h3>
          <p className="text-[#6b7987] text-[12px] max-w-xs leading-relaxed">
            Mọi thứ đều được cập nhật. Hãy tiếp tục khám phá những nội dung thú vị khác nhé!
          </p>
        </div>
      </div>
    </div>
  );
}
