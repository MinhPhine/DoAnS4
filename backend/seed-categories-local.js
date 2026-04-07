const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./models/Category');

const CATEGORY_INFO = {
  mobile: {
    title: 'Điện thoại',
    desc: 'Khám phá thế giới smartphone với những đánh giá chi tiết và so sánh khách quan nhất.',
    heroImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'
  },
  laptop: {
    title: 'Máy tính & Laptop',
    desc: 'Tổng hợp đánh giá laptop, PC và workstation cho mọi nhu cầu từ học tập đến chuyên nghiệp.',
    heroImg: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'
  },
  accessory: {
    title: 'Phụ kiện âm thanh',
    desc: 'Tai nghe, loa và phụ kiện âm thanh cao cấp cho trải nghiệm nghe nhạc tuyệt vời.',
    heroImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
  },
  ai: {
    title: 'AI & Robot',
    desc: 'Công nghệ trí tuệ nhân tạo, thực tế ảo, drone và những thiết bị thông minh thế hệ mới.',
    heroImg: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
  },
  gaming: {
    title: 'Gaming Gear',
    desc: 'Console, bàn phím, chuột gaming và mọi thiết bị cho game thủ chuyên nghiệp.',
    heroImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
  }
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_curator')
  .then(async () => {
    let count = 0;
    for (const [slug, data] of Object.entries(CATEGORY_INFO)) {
      const exists = await Category.findOne({ slug });
      if (!exists) {
        await Category.create({
          name: data.title,
          slug: slug,
          description: data.desc,
          image: data.heroImg,
          type: 'article'
        });
        count++;
        console.log('✅ Đã thêm:', data.title);
      } else {
         await Category.updateOne({ slug }, {
            name: data.title,
            description: data.desc,
            image: data.heroImg,
            type: 'article'
         });
         console.log('🔄 Đã cập nhật:', data.title);
         count++;
      }
    }
    console.log('🎉 Hoàn tất đưa dữ liệu danh mục local vào database! Tổng cộng:', count);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Lỗi kết nối DB:', err.message);
    process.exit(1);
  });
