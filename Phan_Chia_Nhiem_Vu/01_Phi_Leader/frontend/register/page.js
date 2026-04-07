"use client";

import Link from 'next/link';
import { ShieldCheck, Users } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Đăng ký thất bại');
      } else {
        // Redirect to login with success message
        router.push('/login?registered=1');
      }
    } catch (err) {
      setError('Không thể kết nối tới máy chủ. Hãy kiểm tra backend đã chạy chưa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-5xl w-full flex flex-col md:flex-row">

        {/* Left: Illustration */}
        <div className="bg-white p-12 md:w-1/2 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">Cộng đồng công nghệ</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D1D1F] leading-tight mb-6">
              Gia nhập <br /><span className="text-primary">The Digital Curator</span>
            </h1>
            <p className="text-secondary text-sm mb-12 max-w-xs leading-relaxed">Nơi những đánh giá công nghệ tinh hoa hội tụ.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-input-field p-6 rounded-2xl">
                <ShieldCheck className="text-primary mb-3" size={24} />
                <h3 className="font-bold text-sm mb-1">Đánh giá chuẩn</h3>
              </div>
              <div className="bg-input-field p-6 rounded-2xl">
                <Users className="text-primary mb-3" size={24} />
                <h3 className="font-bold text-sm mb-1">Diễn đàn mở</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-12 md:w-1/2 border-l border-border-custom">
          <div className="mb-8">
            <h1 className="text-primary font-bold text-2xl mb-2">The Digital Curator</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              type="text"
              required
              value={form.fullname}
              onChange={handleChange('fullname')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                placeholder="example@email.com"
                type="email"
                required
                value={form.email}
                onChange={handleChange('email')}
              />
              <Input
                label="Số điện thoại"
                placeholder="090 123 4567"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
              />
            </div>
            <Input
              label="Mật khẩu"
              placeholder="••••••••"
              type="password"
              required
              value={form.password}
              onChange={handleChange('password')}
            />
            <Input
              label="Xác nhận mật khẩu"
              placeholder="••••••••"
              type="password"
              required
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
            <Button type="submit" className="py-3 mt-4" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký ngay'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-secondary">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
