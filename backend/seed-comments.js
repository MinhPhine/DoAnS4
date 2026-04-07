const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Article = require('./models/Article');
const Comment = require('./models/Comment');

const COMMENT_POOL = [
  'Bài viết rất hay, cảm ơn tác giả đã chia sẻ!',
  'Thông tin rất hữu ích, mình đã tìm kiếm điều này từ lâu rồi.',
  'Review rất chi tiết và khách quan. Đánh giá cao!',
  'Cảm ơn bạn đã so sánh rõ ràng như vậy, mình đã quyết định được rồi.',
  'Bài viết mình thấy khá ổn, nhưng mong tác giả phân tích thêm về pin.',
  'Đọc xong bài này hiểu ra nhiều thứ hơn. Rất tâm huyết!',
  'Mình đang phân vân giữa 2 món này, bài viết đã giúp mình quyết định!',
  'Sản phẩm này mình dùng rồi, đúng như bài review đánh giá.',
  'Tác giả có thể viết thêm về khả năng chống nước không?',
  'Hình ảnh bài viết sắc nét, nội dung thuyết phục. 10/10!',
  'Mình đang dùng sản phẩm cũ, sau khi đọc bài này muốn nâng cấp lắm.',
  'Chia sẻ rất thực tế, không như nhiều nơi chỉ nói tốt sản phẩm.',
  'Cảm ơn! Rất thích cách tác giả so sánh ưu nhược điểm.',
  'Bài viết nên cập nhật thêm giá mới nhất cho người đọc.',
  'Rất hữu ích cho người mới tìm hiểu về lĩnh vực này!',
  'Mình đã chia sẻ bài này cho cả hội bạn. Cảm ơn team!',
  'Đánh giá rất thực tế từ người dùng. Tiếp tục phát huy nhé!',
  'Chờ bài tiếp theo của tác giả. Subscribe ngay rồi!',
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_curator')
  .then(async () => {
    // Xóa comment cũ
    await Comment.deleteMany({});
    
    const users = await User.find();
    const articles = await Article.find();

    if (users.length === 0 || articles.length === 0) {
      console.log('Cần có ít nhất 1 User và 1 Article trong DB.');
      process.exit(1);
    }

    let totalCreated = 0;

    for (const article of articles) {
      // Mỗi bài viết có từ 3 đến 7 comment ngẫu nhiên
      const numComments = Math.floor(Math.random() * 5) + 3;
      const usedUserIds = new Set();

      for (let i = 0; i < numComments; i++) {
        // Chọn user ngẫu nhiên (không trùng cho cùng bài nếu có thể)
        let randomUser;
        let attempts = 0;
        do {
          randomUser = users[Math.floor(Math.random() * users.length)];
          attempts++;
        } while (usedUserIds.has(randomUser._id.toString()) && attempts < 10);

        usedUserIds.add(randomUser._id.toString());

        const randomComment = COMMENT_POOL[Math.floor(Math.random() * COMMENT_POOL.length)];

        await Comment.create({
          article: article._id,
          user: randomUser._id,
          content: randomComment,
          isApproved: true
        });

        totalCreated++;
      }
    }

    console.log(`🎉 Đã tạo thành công ${totalCreated} comment cho ${articles.length} bài viết!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Lỗi khi seed Comments:', err.message);
    process.exit(1);
  });
