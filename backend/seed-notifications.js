const mongoose = require('mongoose');
require('dotenv').config();

const Notification = require('./models/Notification');
const User = require('./models/User');

const MONGO_URI = process.env.MONGODB_URI;

async function seedNotifications() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    // Lấy tất cả user trong DB
    const users = await User.find({});
    if (users.length === 0) {
      console.log('❌ Không có user nào trong DB. Hãy tạo user trước.');
      process.exit(1);
    }

    // Xoá notifications cũ (tuỳ chọn)
    await Notification.deleteMany({});
    console.log('🗑️  Đã xoá thông báo cũ');

    const notifications = [];

    users.forEach((user) => {
      notifications.push(
        {
          user: user._id,
          title: 'Chào mừng bạn!',
          message: `Xin chào ${user.fullname}, cảm ơn bạn đã đăng ký tài khoản tại Digital Curator.`,
          type: 'success',
          isRead: false,
          link: '/profile',
        },
        {
          user: user._id,
          title: 'Đơn hàng đã được xác nhận',
          message: 'Đơn hàng #ORD001 của bạn đang được xử lý và sẽ giao trong 3-5 ngày.',
          type: 'info',
          isRead: false,
          link: '/orders',
        },
        {
          user: user._id,
          title: 'Khuyến mãi đặc biệt',
          message: 'Giảm 20% cho tất cả sản phẩm cà phê trong tuần này. Đừng bỏ lỡ!',
          type: 'warning',
          isRead: true,
          link: '/products',
        },
        {
          user: user._id,
          title: 'Thanh toán thành công',
          message: 'Bạn đã thanh toán thành công đơn hàng #ORD002 với số tiền 250.000 VNĐ.',
          type: 'success',
          isRead: true,
          link: '/orders',
        },
        {
          user: user._id,
          title: 'Giao hàng thất bại',
          message: 'Đơn hàng #ORD003 không thể giao do địa chỉ không chính xác. Vui lòng cập nhật địa chỉ.',
          type: 'error',
          isRead: false,
          link: '/profile/addresses',
        }
      );
    });

    const inserted = await Notification.insertMany(notifications);
    console.log(`✅ Đã thêm ${inserted.length} thông báo cho ${users.length} user(s)`);

    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

seedNotifications();
