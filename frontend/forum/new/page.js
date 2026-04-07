"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", tags: "", thumbnail: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.content) {
      setError("Tiêu đề và nội dung là bắt buộc");
      return;
    }
    setSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    const slug = form.title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      const res = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({
          title: form.title,
          slug: slug + "-" + Date.now().toString(36),
          content: form.content,
          excerpt: form.excerpt || form.content.substring(0, 150) + "...",
          thumbnail: form.thumbnail || "",
          tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
          status: "published"
        })
      });

      if (res.ok) {
        router.push("/forum");
      } else {
        const data = await res.json();
        setError(data.error || data.message || "Lỗi khi đăng bài");
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-400 mb-4">Vui lòng đăng nhập để đăng bài</p>
          <Link href="/login" className="bg-[#0056D2] text-white px-6 py-3 rounded-full font-bold">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <div className="container-custom max-w-2xl py-10">
        <Link href="/forum" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0056D2] hover:underline mb-6">
          <ArrowLeft size={14} /> Quay về diễn đàn
        </Link>

        <div className="bg-white rounded-[24px] p-8 border border-[#E8EAED] shadow-sm">
          <h1 className="text-2xl font-black text-[#1D1D1F] mb-8">Đăng bài viết mới</h1>

          {error && (
            <div className="bg-red-50 text-red-600 text-[13px] font-bold p-4 rounded-xl mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-2">Tiêu đề *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder='VD: "Có nên mua Galaxy S24 Ultra không?"'
                className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-2">Mô tả ngắn</label>
              <input
                type="text"
                value={form.excerpt}
                onChange={e => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết"
                className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-2">Nội dung *</label>
              <textarea
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Viết nội dung bài viết ở đây... (hỗ trợ **bold**)"
                rows={12}
                className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-2">Link ảnh thumbnail</label>
              <input
                type="text"
                value={form.thumbnail}
                onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-[#8A9BB0] uppercase tracking-widest mb-2">Tags (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm({ ...form, tags: e.target.value })}
                placeholder="VD: hỏi đáp, samsung, android"
                className="w-full bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-[#0056D2] focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0056D2] hover:bg-blue-700 text-white font-black text-[14px] py-4 rounded-full transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? "Đang đăng..." : <><Send size={16} /> Đăng bài viết</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
