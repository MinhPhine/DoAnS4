"use client";

import { useEffect, useState } from "react";
import { MailOpen, MessageSquare, Award, Settings as SettingsIcon, AtSign, Sparkles, ShoppingBag, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { notificationService } from "@/services/notificationService";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await notificationService.getAll(token);
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await notificationService.markAllAsRead(token);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await notificationService.markAsRead(id, token);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Helper to get icon based on type or title keywords
  const getNotificationIcon = (type, title = "") => {
    const t = title.toLowerCase();
    if (t.includes("đơn hàng") || t.includes("thanh toán")) {
      return {
        icon: <ShoppingBag size={20} className="text-[#1877F2]" />,
        iconBg: "bg-[#E7F3FF]",
        displayType: "order"
      };
    }
    
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle size={20} className="text-[#2C7A32]" />,
          iconBg: "bg-[#E4F5E6]",
          displayType: "success"
        };
      case "error":
        return {
          icon: <AlertCircle size={20} className="text-[#D32F2F]" />,
          iconBg: "bg-[#FDECEA]",
          displayType: "error"
        };
      case "warning":
        return {
          icon: <AlertCircle size={20} className="text-[#F57C00]" />,
          iconBg: "bg-[#FFF4E5]",
          displayType: "warning"
        };
      default:
        return {
          icon: <Info size={20} className="text-[#1D1D1F]" />,
          iconBg: "bg-[#F0F2F5]",
          displayType: "info"
        };
    }
  };

  // Group notifications by day
  const groupNotifications = (list) => {
    const groups = {};
    
    list.forEach(item => {
      const date = new Date(item.createdAt);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let groupName = "TRƯỚC ĐÓ";
      if (date.toDateString() === today.toDateString()) {
        groupName = "HÔM NAY";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupName = "HÔM QUA";
      }

      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(item);
    });

    return Object.keys(groups).map(key => ({
      group: key,
      items: groups[key]
    })).sort((a, b) => {
      const order = { "HÔM NAY": 0, "HÔM QUA": 1, "TRƯỚC ĐÓ": 2 };
      return order[a.group] - order[b.group];
    });
  };

  const groupedNotifications = groupNotifications(notifications);

  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen pt-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 text-center border border-[#E8EAED] shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MailOpen size={30} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-[#1D1D1F] mb-4">Vui lòng đăng nhập</h2>
          <p className="text-[#6b7987] mb-8">Bạn cần đăng nhập để xem thông báo cá nhân của mình.</p>
          <a href="/login" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <div className="container-custom max-w-4xl mx-auto pt-10 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">
            Thông báo
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#E8EAED] bg-white flex items-center justify-center text-[#1D1D1F]">
              <MailOpen size={18} />
            </div>
            <button 
              onClick={markAllAsRead}
              className="bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#3e5270] px-5 py-2.5 rounded-full text-[12px] font-bold transition-colors"
            >
              Đánh dấu tất cả là đã đọc
            </button>
          </div>
        </div>

        {/* Notification Groups */}
        <div className="space-y-10">
          {notifications.length > 0 ? (
            groupedNotifications.map((group) => (
              <div key={group.group}>
                <h3 className="text-[10px] font-black uppercase text-[#8A9BB0] tracking-[0.2em] mb-4 pl-2">
                  {group.group}
                </h3>
                <div className="space-y-3">
                  {group.items.map((item) => {
                    const { icon, iconBg } = getNotificationIcon(item.type, item.title);
                    return (
                      <div 
                        key={item._id} 
                        onClick={() => !item.isRead && markAsRead(item._id)}
                        className={`bg-white rounded-[24px] p-6 border flex items-start gap-4 transition-all hover:border-primary/30 cursor-pointer ${!item.isRead ? 'border-transparent shadow-md' : 'border-[#E8EAED] opacity-80'}`}
                      >
                        {/* Icon Area */}
                        <div className="relative shrink-0">
                          <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${iconBg}`}>
                            {icon}
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-w-0 pr-8 relative pt-1">
                          <div className="mb-2">
                            <h4 className={`text-[15px] font-bold ${!item.isRead ? 'text-[#1D1D1F]' : 'text-[#666]'}`}>
                              {item.title}
                            </h4>
                            <p className="text-[13px] text-[#444] mt-1 leading-relaxed">
                              {item.message}
                            </p>
                          </div>
                          <p className="text-[9px] font-black text-[#8A9BB0] uppercase tracking-widest">
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: vi })}
                          </p>

                          {/* Unread indicator dot */}
                          {!item.isRead && (
                            <div className="absolute right-0 top-3 w-2 h-2 rounded-full bg-primary shadow shadow-primary/40"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[32px] p-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#E8EAED]">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Sparkles size={24} className="text-gray-300" />
              </div>
              <h3 className="text-[#1D1D1F] font-black text-[18px] mb-2">Chưa có thông báo nào</h3>
              <p className="text-[#6b7987] text-[14px] max-w-xs leading-relaxed">
                Khi có thông báo mới, chúng sẽ xuất hiện ở đây.
              </p>
            </div>
          )}
        </div>

        {/* End of list state */}
        {notifications.length > 0 && (
          <div className="bg-white rounded-[32px] p-12 mt-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#E8EAED]">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-sm mb-4">
              <Sparkles size={20} className="text-primary" />
            </div>
            <h3 className="text-[#1D1D1F] font-black text-[15px] mb-2">Bạn đã xem hết thông báo</h3>
            <p className="text-[#6b7987] text-[12px] max-w-xs leading-relaxed">
              Mọi thứ đều được cập nhật. Hãy tiếp tục khám phá những nội dung thú vị khác nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
