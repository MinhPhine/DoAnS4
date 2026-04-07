"use client";

import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-primary font-bold text-3xl mb-2">The Digital Curator</h1>
        <h2 className="text-2xl font-bold mb-2">Quên mật khẩu?</h2>
        <p className="text-secondary text-sm max-w-xs mx-auto">Nhập email liên kết với tài khoản của bạn.</p>
      </div>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-sm border border-border-custom">
        <form className="space-y-6">
          <div className="relative">
            <Input label="Địa chỉ Email" placeholder="name@example.com" type="email" required className="pl-10" />
            <Mail className="absolute bottom-3 left-3 text-secondary" size={18} />
          </div>
          <Button type="submit" className="py-3">Gửi mã xác nhận</Button>
        </form>
        <Link href="/login" className="mt-6 flex items-center justify-center space-x-2 text-primary text-sm font-bold hover:underline">
          <ArrowLeft size={16} /><span>Quay lại Đăng nhập</span>
        </Link>
      </div>
    </div>
  );
}
