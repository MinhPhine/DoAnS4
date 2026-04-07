"use client";

import { FileText, PenTool } from "lucide-react";

export default function AdminArticlesPage() {
  // Bài viết hiện tại chưa lưu vào DB, hiện giao diện placeholder
  const sampleArticles = [
    { id: 1, title: "iPhone 15 Pro Max sau 6 tháng: Vẫn là 'vị vua'?", author: "Minh Triết", category: "mobile", status: "published", date: "15/03/2024" },
    { id: 2, title: "MacBook Pro M3 Pro: Hiệu năng đáng kinh ngạc", author: "Hoàng Nam", category: "laptop", status: "published", date: "12/03/2024" },
    { id: 3, title: "Android 15: Những tính năng bảo mật mới cần biết", author: "Thanh Tùng", category: "mobile", status: "draft", date: "10/03/2024" },
    { id: 4, title: "Top 5 laptop gaming tầm giá 30 triệu đáng mua nhất", author: "Ban Biên Tập", category: "laptop", status: "published", date: "08/03/2024" },
    { id: 5, title: "PlayStation 5 Slim: Nhỏ hơn, mạnh hơn?", author: "Minh Triết", category: "gaming", status: "review", date: "05/03/2024" },
    { id: 6, title: "AirPods Pro 2 USB-C: Nâng cấp đáng giá?", author: "Bích Ngọc", category: "accessory", status: "published", date: "01/03/2024" },
  ];

  const catLabels = { mobile: "Điện thoại", laptop: "Laptop", accessory: "Phụ kiện", gaming: "Gaming" };
  const statusLabels = {
    published: { label: "Đã xuất bản", cls: "bg-emerald-100 text-emerald-600" },
    draft: { label: "Bản nháp", cls: "bg-gray-100 text-gray-600" },
    review: { label: "Chờ duyệt", cls: "bg-amber-100 text-amber-600" },
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1D1D1F] mb-1">Quản lý Bài viết</h1>
          <p className="text-[#8A9BB0] text-[14px]">Quản lý và duyệt các bài viết đánh giá công nghệ</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8EAED] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F8F9FA] border-b border-[#E8EAED]">
            <tr className="text-[10px] font-black text-[#8A9BB0] uppercase tracking-widest">
              <th className="px-6 py-4">Bài viết</th>
              <th className="px-6 py-4">Tác giả</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Ngày đăng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F2F5]">
            {sampleArticles.map((a) => (
              <tr key={a.id} className="hover:bg-[#F8F9FA] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <PenTool size={16} className="text-blue-400" />
                    </div>
                    <span className="text-[13px] font-bold text-[#1D1D1F] line-clamp-1 max-w-[300px]">{a.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#5e6b7d] font-medium">{a.author}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-lg bg-[#F0F2F5] text-[11px] font-bold text-[#5e6b7d]">
                    {catLabels[a.category] || a.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusLabels[a.status]?.cls}`}>
                    {statusLabels[a.status]?.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-[12px] text-[#8A9BB0]">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-[#E8EAED] text-[12px] text-[#8A9BB0] font-medium">
          Hiện {sampleArticles.length} bài viết
        </div>
      </div>
    </div>
  );
}
