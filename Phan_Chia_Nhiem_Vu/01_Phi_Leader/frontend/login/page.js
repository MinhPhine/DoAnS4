"use client";

import Link from 'next/link';
import { Globe, MessageCircle, Share2 } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get('registered') === '1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Đăng nhập thất bại');
        showError(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      } else {
        login(data.user, data.token);
        showSuccess(`Chào mừng quay trở lại, ${data.user.fullname}!`);
        router.push('/');
      }
    } catch (err) {
      setError('Không thể kết nối tới máy chủ');
      showError('Lỗi kết nối máy chủ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-primary font-bold text-3xl mb-2">The Digital Curator</h1>
        <p className="text-secondary text-sm">Chào mừng bạn quay trở lại với cộng đồng công nghệ.</p>
      </div>

      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-sm border border-border-custom">
        <h2 className="text-2xl font-bold mb-8">Đăng nhập</h2>

        {justRegistered && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3 text-sm mb-4">
            ℹ️ Tài khoản đã được tạo. Vui lòng đăng nhập để bắt đầu.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-[13px] font-semibold mb-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
             {error}
          </div>
        )}


        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="EMAIL HOẶC SỐ ĐIỆN THOẠI"
            placeholder="name@example.com"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              label="MẬT KHẨU"
              placeholder="••••••••"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link href="/forgot-password" className="absolute top-0 right-1 text-primary text-[10px] font-bold uppercase hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-custom"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-secondary">Hoặc đăng nhập nhanh qua</span></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button className="flex justify-center items-center py-2.5 bg-input-field rounded-lg hover:bg-gray-200 transition-colors"><Globe size={20} className="text-gray-600" /></button>
          <button className="flex justify-center items-center py-2.5 bg-input-field rounded-lg hover:bg-gray-200 transition-colors"><MessageCircle size={20} className="text-blue-600" /></button>
          <button className="flex justify-center items-center py-2.5 bg-input-field rounded-lg hover:bg-gray-200 transition-colors"><Share2 size={20} className="text-black" /></button>
        </div>
      </div>

      <p className="mt-8 text-sm text-secondary">Chưa có tài khoản? <Link href="/register" className="text-primary font-bold hover:underline">Đăng ký ngay</Link></p>
    </div>
  );
}
