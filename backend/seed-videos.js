const mongoose = require('mongoose');
require('dotenv').config();
const Video = require('./models/Video');
const Product = require('./models/Product');
const User = require('./models/User');

const videos = [
  {
    title: 'Trên tay iPhone 15 Pro Max: Khi Titanium thay đổi cuộc chơi',
    slug: 'tren-tay-iphone-15-pro-max',
    description: 'Mở hộp và trải nghiệm nhanh iPhone 15 Pro Max với khung Titanium, chip A17 Pro, camera 48MP và cổng USB-C đầu tiên trên iPhone.',
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1200',
    youtubeId: 'xqyUdNxWazA',
    duration: '15:30',
    category: 'unboxing',
    views: 12500,
    tags: ['iphone', 'apple', 'unboxing'],
    isFeatured: true
  },
  {
    title: 'Trên tay Samsung Galaxy S24 Ultra: Titanium và AI thay đổi tất cả',
    slug: 'tren-tay-samsung-s24-ultra',
    description: 'Đánh giá nhanh Samsung Galaxy S24 Ultra với Galaxy AI, S Pen tích hợp và camera 200MP. Có xứng đáng là flagship Android 2024?',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'hSBu9mIuH0c',
    duration: '12:45',
    category: 'unboxing',
    views: 9800,
    tags: ['samsung', 'android', 'unboxing']
  },
  {
    title: 'Sony WH-1000XM5 sau 1 năm sử dụng - Có còn đáng mua?',
    slug: 'sony-wh-1000xm5-1-nam',
    description: 'Sau 1 năm sử dụng thực tế, Sony WH-1000XM5 có còn giữ được phong độ? Đánh giá về chống ồn, chất âm và độ bền.',
    thumbnail: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'eBmhYMgvYi0',
    duration: '08:20',
    category: 'review',
    views: 12400,
    tags: ['sony', 'headphone', 'review']
  },
  {
    title: 'Build PC Gaming 30 triệu cực đẹp cho năm 2024',
    slug: 'build-pc-gaming-30-trieu-2024',
    description: 'Hướng dẫn build PC Gaming 30 triệu đồng với hiệu năng mạnh mẽ, thiết kế đẹp và RGB hoành tráng cho năm 2024.',
    thumbnail: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'BL4DCEp7blY',
    duration: '18:15',
    category: 'tutorial',
    views: 8900,
    tags: ['pc gaming', 'build pc', 'tutorial']
  },
  {
    title: 'Bàn phím cơ Custom giá rẻ đáng mua nhất 2024',
    slug: 'ban-phim-co-custom-gia-re',
    description: 'Top bàn phím cơ custom dưới 2 triệu tốt nhất. So sánh chất lượng, switch, keycap và trải nghiệm gõ thực tế.',
    thumbnail: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'lSMVTqSTjyQ',
    duration: '05:40',
    category: 'review',
    views: 18100,
    tags: ['keyboard', 'gaming', 'review']
  },
  {
    title: 'Đánh giá nhanh DJI Pocket 3 - Camera vlog tốt nhất?',
    slug: 'danh-gia-dji-pocket-3',
    description: 'DJI Pocket 3 với cảm biến 1-inch và màn hình xoay 2 inch liệu có phải là camera vlog lý tưởng nhất hiện nay?',
    thumbnail: 'https://images.unsplash.com/photo-1607513361958-3f5f6ce83c74?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'qSIG0eXFTnQ',
    duration: '22:10',
    category: 'hands-on',
    views: 5200,
    tags: ['dji', 'camera', 'vlog']
  },
  {
    title: 'MacBook Pro M3 Max - Quái vật hiệu năng cho Creator',
    slug: 'macbook-pro-m3-max-review',
    description: 'Đánh giá chi tiết MacBook Pro M3 Max: hiệu năng render video, compile code, và xử lý đồ họa nặng.',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    youtubeId: 'UgjhSlgCbGo',
    duration: '20:35',
    category: 'review',
    views: 15300,
    tags: ['macbook', 'apple', 'laptop']
  },
  {
    title: 'Top 5 phụ kiện công nghệ đáng mua dưới 500k',
    slug: 'top-5-phu-kien-duoi-500k',
    description: 'Giới thiệu 5 phụ kiện công nghệ giá rẻ nhưng chất lượng cao, đáng mua nhất trong năm 2024.',
    thumbnail: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    youtubeId: '3eVy1-eg7ac',
    duration: '10:22',
    category: 'hands-on',
    views: 7600,
    tags: ['phụ kiện', 'budget', 'top list']
  },
  // Shorts
  {
    title: 'Kinh nghiệm dùng AI hiệu quả ai cũng làm được',
    slug: 'kinh-nghiem-dung-ai',
    description: 'Mẹo sử dụng AI hiệu quả trong công việc hàng ngày.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    youtubeId: 'aircAruvnKk',
    duration: '00:58',
    category: 'shorts',
    views: 22000,
    tags: ['ai', 'tips']
  },
  {
    title: 'Làm kịch bản video bằng AI trong 60 giây',
    slug: 'kich-ban-video-ai',
    description: 'Hướng dẫn nhanh tạo kịch bản video bằng ChatGPT.',
    thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=400',
    youtubeId: '2IK3DFHRFfw',
    duration: '00:45',
    category: 'shorts',
    views: 18500,
    tags: ['ai', 'video']
  },
  {
    title: '5 yếu tố quan trọng để có video đẹp',
    slug: '5-yeu-to-video-dep',
    description: 'Những tips quan trọng nhất khi quay video.',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    youtubeId: 'K4TOrB7at0Y',
    duration: '00:52',
    category: 'shorts',
    views: 14200,
    tags: ['video', 'tips']
  },
  {
    title: '5 bí kíp build PC gaming giá rẻ',
    slug: 'bi-kip-build-pc-gia-re',
    description: 'Mẹo build PC gaming tiết kiệm mà vẫn mạnh.',
    thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=400',
    youtubeId: 'BL4DCEp7blY',
    duration: '00:59',
    category: 'shorts',
    views: 11800,
    tags: ['pc', 'gaming', 'budget']
  }
];

async function seedVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) { console.error('❌ Không tìm thấy admin'); process.exit(1); }

    await Video.deleteMany({});
    console.log('🗑️  Đã xóa videos cũ');

    const videosWithAuthor = videos.map(v => ({ ...v, author: admin._id }));
    const result = await Video.insertMany(videosWithAuthor);
    console.log(`✅ Đã thêm ${result.length} videos!`);
    result.forEach(v => console.log(`   - [${v.category}] ${v.title}`));

    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

seedVideos();
