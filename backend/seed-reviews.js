const mongoose = require('mongoose');
require('dotenv').config();
const Review = require('./models/Review');
const Product = require('./models/Product');
const User = require('./models/User');

async function seedReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) { console.error('❌ Không tìm thấy admin'); process.exit(1); }

    const products = await Product.find({});
    if (products.length === 0) { console.error('❌ Không có sản phẩm'); process.exit(1); }

    await Review.deleteMany({});
    console.log('🗑️  Đã xóa reviews cũ');

    const comments = [
      'Sản phẩm chất lượng tuyệt vời, rất đáng đồng tiền bát gạo. Giao hàng nhanh, đóng gói cẩn thận.',
      'Dùng được 2 tuần rồi, rất hài lòng. Hiệu năng mạnh, thiết kế đẹp. Sẽ giới thiệu cho bạn bè.',
      'Sản phẩm ổn, tuy nhiên giá hơi cao so với kỳ vọng. Pin dùng thoải mái cả ngày.',
      'Đây là sản phẩm tốt nhất trong tầm giá. Màn hình đẹp, camera chụp ảnh sắc nét.',
      'Mình mua cho vợ dùng, vợ mình rất thích. Build quality cao cấp, cảm giác cầm nắm rất premium.',
      'Review chi tiết: Sau 1 tháng sử dụng, sản phẩm vẫn hoạt động mượt mà. Không có lỗi gì đáng kể.',
      'Chất lượng âm thanh xuất sắc, chống ồn rất tốt. Đeo cả ngày không đau tai.',
      'Hiệu năng gaming rất tốt, không bị lag hay giật. Tản nhiệt hoạt động hiệu quả.',
      'Thiết kế rất đẹp và sang trọng. Mọi người đều hỏi mình mua ở đâu.',
      'Spec mạnh, giá hợp lý. Recommend cho ai đang tìm sản phẩm trong phân khúc này.',
    ];

    const reviews = [];
    // Tạo 2-3 reviews cho mỗi sản phẩm
    for (const product of products) {
      const numReviews = 2 + Math.floor(Math.random() * 2); // 2-3 reviews
      for (let i = 0; i < numReviews; i++) {
        reviews.push({
          product: product._id,
          user: admin._id,
          rating: 4 + Math.floor(Math.random() * 2), // 4 or 5
          comment: comments[Math.floor(Math.random() * comments.length)],
        });
      }
    }

    const result = await Review.insertMany(reviews);
    console.log(`✅ Đã thêm ${result.length} reviews cho ${products.length} sản phẩm!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

seedReviews();
