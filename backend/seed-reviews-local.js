const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');

const REVIEW_POOL = [
  { rating: 5, comment: 'Sản phẩm tuyệt vời! Đúng như mô tả, giao hàng nhanh.' },
  { rating: 5, comment: 'Chất lượng rất tốt, sử dụng được vài tuần vẫn ổn định.' },
  { rating: 5, comment: 'Mua lần đầu nhưng mình rất hài lòng. Sẽ ủng hộ tiếp!' },
  { rating: 4, comment: 'Sản phẩm tốt, chỉ tiếc là hộp hàng hơi xước một chút.' },
  { rating: 4, comment: 'Dùng được, nhưng mình nghĩ pin nên được cải thiện hơn.' },
  { rating: 4, comment: 'Khá ổn với mức giá này, không có gì phàn nàn nhiều.' },
  { rating: 3, comment: 'Tạm được, nhưng kỳ vọng cao hơn một chút.' },
  { rating: 3, comment: 'Sản phẩm bình thường, không có gì đặc biệt nổi bật.' },
  { rating: 5, comment: 'Cực kỳ hài lòng! Thiết kế đẹp, hiệu năng mượt mà.' },
  { rating: 4, comment: 'Dùng tốt, camera khá ổn ở phân khúc này.' },
  { rating: 5, comment: 'Xứng đáng với số tiền bỏ ra. Rất đáng mua!' },
  { rating: 2, comment: 'Màn hình hay bị lag sau 1 tuần dùng, hơi thất vọng.' },
  { rating: 5, comment: 'Đóng gói kĩ, giao nhanh, sản phẩm đúng như quảng cáo.' },
  { rating: 4, comment: 'Sử dụng ổn định, pin trâu hơn điện thoại cũ nhiều.' },
  { rating: 3, comment: 'Chất lượng trung bình, phù hợp với giá tiền.' },
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_curator')
  .then(async () => {
    await Review.deleteMany({});

    const users = await User.find();
    const products = await Product.find();

    if (users.length === 0 || products.length === 0) {
      console.log('Cần có ít nhất 1 User và 1 Product trong DB.');
      process.exit(1);
    }

    let totalReviews = 0;
    let totalRatingUpdates = 0;

    for (const product of products) {
      // Mỗi sản phẩm có từ 3 đến 6 đánh giá
      const numReviews = Math.floor(Math.random() * 4) + 3;
      const usedUserIds = new Set();
      let sumRating = 0;
      let countReviews = 0;

      for (let i = 0; i < numReviews; i++) {
        let randomUser;
        let attempts = 0;
        do {
          randomUser = users[Math.floor(Math.random() * users.length)];
          attempts++;
        } while (usedUserIds.has(randomUser._id.toString()) && attempts < 10);

        usedUserIds.add(randomUser._id.toString());

        const review = REVIEW_POOL[Math.floor(Math.random() * REVIEW_POOL.length)];

        await Review.create({
          product: product._id,
          user: randomUser._id,
          rating: review.rating,
          comment: review.comment,
          isApproved: true
        });

        sumRating += review.rating;
        countReviews++;
        totalReviews++;
      }

      // Cập nhật rating trung bình và numReviews trên sản phẩm
      const avgRating = Math.round((sumRating / countReviews) * 10) / 10;
      await product.constructor.updateOne(
        { _id: product._id },
        { rating: avgRating, numReviews: countReviews }
      );
      totalRatingUpdates++;
    }

    console.log(`🎉 Đã tạo thành công ${totalReviews} đánh giá cho ${products.length} sản phẩm!`);
    console.log(`✅ Đã cập nhật rating trung bình cho ${totalRatingUpdates} sản phẩm.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Lỗi khi seed Reviews:', err.message);
    process.exit(1);
  });
