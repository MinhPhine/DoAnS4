import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, MessageCircle } from 'lucide-react';

export default function BlogCard({ article }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E8EAED] hover:shadow-xl transition-all hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
          <Image 
            src={article.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        {article.category && (
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-4 text-[11px] text-[#8A9BB0] font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {new Date(article.createdAt).toLocaleDateString('vi-VN')}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} /> {article.author?.fullname || 'Admin'}
          </span>
        </div>

        <Link href={`/blog/${article.slug}`}>
          <h3 className="text-[16px] font-black text-[#1D1D1F] leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-[13px] text-[#555] leading-relaxed line-clamp-3 mb-4 font-medium">
          {article.excerpt || article.content.substring(0, 120) + '...'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#F0F2F5]">
          <Link 
            href={`/blog/${article.slug}`}
            className="text-[13px] font-bold text-primary hover:underline flex items-center gap-1"
          >
            Đọc tiếp
          </Link>
          <div className="flex items-center gap-1 text-[#8A9BB0] text-[12px] font-bold">
            <MessageCircle size={14} /> 0
          </div>
        </div>
      </div>
    </div>
  );
}
