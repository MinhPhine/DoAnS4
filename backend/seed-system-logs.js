const mongoose = require('mongoose');
require('dotenv').config();

const SystemLog = require('./models/SystemLog');
const User = require('./models/User');

const MONGO_URI = process.env.MONGODB_URI;

async function seedSystemLogs() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    const users = await User.find({});
    if (users.length === 0) {
      console.log('❌ Không có user nào. Tạo user trước đã.');
      process.exit(1);
    }

    const admin = users.find(u => u.role === 'admin') || users[0];
    const otherUser = users.find(u => u.role !== 'admin') || users[0];

    await SystemLog.deleteMany({});
    console.log('🗑️  Đã xoá log cũ');

    const now = new Date();
    const logs = [
      { user: admin._id, action: 'LOGIN',               module: 'Auth',     details: `Admin ${admin.email} đăng nhập`,          ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 2) },
      { user: admin._id, action: 'UPDATE_ORDER_STATUS', module: 'Orders',   details: 'Đổi trạng thái đơn #A1B2C3D4 → shipped',  ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 10) },
      { user: admin._id, action: 'UPDATE_ORDER_STATUS', module: 'Orders',   details: 'Đổi trạng thái đơn #E5F6A7B8 → delivered',ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 30) },
      { user: admin._id, action: 'DELETE_COMMENT',      module: 'Comments', details: 'Xoá bình luận: "Sản phẩm rất tệ, không...',ipAddress: '192.168.1.2', createdAt: new Date(now - 1000 * 60 * 45) },
      { user: admin._id, action: 'UPDATE_ARTICLE_STATUS',module:'Articles', details: 'Đổi trạng thái bài "Cà phê Việt Nam trên..." → published', ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 60) },
      { user: admin._id, action: 'UPDATE_USER_ROLE',    module: 'Users',    details: `Đổi role ${otherUser.email} → creator`,   ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 90) },
      { user: admin._id, action: 'DELETE_PRODUCT',      module: 'Products', details: 'Xoá sản phẩm: Cà phê Robusta Buôn Ma Thuột (hết hàng)', ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 120) },
      { user: admin._id, action: 'UPDATE_PRODUCT',      module: 'Products', details: 'Cập nhật sản phẩm: Phin Nhôm Classic - giá mới 85,000đ', ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 150) },
      { user: admin._id, action: 'DELETE_REVIEW',       module: 'Reviews',  details: 'Xoá đánh giá 1⭐: "Hàng giả, không mua nữa"', ipAddress: '192.168.1.5', createdAt: new Date(now - 1000 * 60 * 180) },
      { user: admin._id, action: 'UPDATE_ORDER_STATUS', module: 'Orders',   details: 'Đổi trạng thái đơn #C9D0E1F2 → cancelled', ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 200) },
      { user: admin._id, action: 'DELETE_ARTICLE',      module: 'Articles', details: 'Xoá bài viết: "Quảng cáo không liên quan"', ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 240) },
      { user: admin._id, action: 'DELETE_VIDEO',        module: 'Videos',   details: 'Xoá video: "Review cà phê 2023 - vi phạm bản quyền"', ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 300) },
      { user: admin._id, action: 'UPDATE_USER_ROLE',    module: 'Users',    details: 'Đổi role user@test.com → admin',             ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 360) },
      { user: admin._id, action: 'DELETE_USER',         module: 'Users',    details: 'Xoá user: Tài khoản spam (spam123@gmail.com)', ipAddress: '192.168.1.3', createdAt: new Date(now - 1000 * 60 * 400) },
      { user: admin._id, action: 'DELETE_COMMENT',      module: 'Comments', details: 'Xoá bình luận spam từ user ẩn danh',         ipAddress: '127.0.0.1', createdAt: new Date(now - 1000 * 60 * 480) },
    ];

    const inserted = await SystemLog.insertMany(logs, { timestamps: false });
    console.log(`✅ Đã thêm ${inserted.length} system logs`);

    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

seedSystemLogs();
