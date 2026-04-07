# The Digital Curator - Fullstack Project

Dự án đã được thiết lập thành công tại `d:\IT\DACK` với cấu trúc Fullstack:

## 📁 Cấu trúc thư mục
- `frontend/`: Ứng dụng Next.js (App Router, TailwindCSS 4, Lucide Icons).
- `backend/`: API Server Node.js/Express (MongoDB, JWT Auth).

## 🚀 Hướng dẫn khởi chạy

### 1. Khởi chạy Backend
Mở một terminal mới:
```bash
cd d:\IT\DACK\backend
npm start (hoặc node index.js)
```
*Lưu ý: Đảm bảo bạn đã cài đặt MongoDB và đang chạy tại localhost:27017.*

### 2. Khởi chạy Frontend
Mở một terminal khác:
```bash
cd d:\IT\DACK\frontend
npm run dev
```
Truy cập: [http://localhost:3000](http://localhost:3000)

## 🛠 Công nghệ sử dụng
- **Frontend**: Next.js, TailwindCSS 4, Lucide React.
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT, Bcrypt.

## 📝 Các trang hiện có
- `/`: Trang chủ (Preview Newsfeed).
- `/login`: Đăng nhập.
- `/register`: Đăng ký tài khoản.
- `/forgot-password`: Quên mật khẩu.
