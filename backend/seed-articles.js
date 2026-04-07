const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('./models/Article');
const User = require('./models/User');

const articles = [
  // CÔNG NGHỆ
  {
    title: 'Có nên mua iPhone 15 Pro Max thời điểm này hay đợi iPhone 16?',
    slug: 'co-nen-mua-iphone-15-pro-max',
    content: `iPhone 15 Pro Max đã ra mắt được gần 1 năm và hiện tại giá đã giảm khá nhiều so với ban đầu. Câu hỏi đặt ra là liệu có nên mua ngay hay đợi iPhone 16 sắp ra mắt?\n\n**Ưu điểm khi mua ngay:**\n- Giá đã giảm 3-5 triệu so với lúc ra mắt\n- Chip A17 Pro vẫn mạnh mẽ trong 3-4 năm tới\n- Camera zoom 5x xuất sắc\n- Khung Titanium nhẹ và bền\n\n**Nên đợi iPhone 16 nếu:**\n- Bạn muốn có chip A18 mới nhất\n- Muốn hỗ trợ Apple Intelligence đầy đủ\n- Không vội, có thể đợi thêm 3-4 tháng\n\nTheo kinh nghiệm cá nhân, nếu bạn đang dùng iPhone 13 trở về trước thì nâng cấp lên 15 Pro Max là hoàn toàn xứng đáng ở thời điểm này.`,
    excerpt: 'Phân tích chi tiết ưu nhược điểm khi mua iPhone 15 Pro Max ở thời điểm hiện tại so với việc đợi iPhone 16.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 3500,
    tags: ['công nghệ', 'iphone', 'apple']
  },
  {
    title: 'Đánh giá MacBook Pro M3 sau 6 tháng sử dụng thực tế',
    slug: 'danh-gia-macbook-pro-m3-6-thang',
    content: `Sau 6 tháng sử dụng MacBook Pro M3 14 inch làm máy chính cho công việc lập trình và edit video, mình chia sẻ trải nghiệm thực tế.\n\nNếu bạn là creative professional hoặc developer, đây là laptop tốt nhất hiện tại.`,
    excerpt: 'Review chi tiết MacBook Pro M3 sau 6 tháng sử dụng cho lập trình và edit video chuyên nghiệp.',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 5200,
    tags: ['công nghệ', 'macbook', 'apple', 'laptop']
  },

  // THIẾT KẾ
  {
    title: 'Top 5 công cụ thiết kế UI/UX thay thế Figma năm 2024',
    slug: 'cong-cu-thiet-ke-thay-the-figma',
    content: `Dù Figma đang thống trị, nhưng vẫn có những lựa chọn mới mang tính đột phá cho các nhà phát triển và thiết kế đồ hoạ.\n\n1. Penpot\n2. Sketch\n3. Framer\n4. Adobe XD\n5. InVision Studio...`,
    excerpt: 'Nếu bạn đang tìm kiếm công cụ thay thế Figma với các tính năng đột phá, hãy thử qua danh sách này.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 4100,
    tags: ['thiết kế', 'ui/ux', 'công cụ']
  },
  {
    title: 'Nguyên lý phối màu cơ bản trong thiết kế Website',
    slug: 'nguyen-ly-phoi-mau-website',
    content: `Việc lựa chọn màu sắc ảnh hưởng đến tỷ lệ chuyển đổi và cảm xúc người dùng trên website...`,
    excerpt: 'Bí kíp phối màu chuẩn sắc, hiện đại giúp website của bạn tăng trải nghiệm người dùng đến 30%.',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 1800,
    tags: ['thiết kế', 'màu sắc', 'website']
  },

  // BLOCKCHAIN
  {
    title: 'Bitcoin Halving 2024 là gì và tác động ra sao?',
    slug: 'bitcoin-halving-2024',
    content: `Sự kiện Bitcoin Halving sẽ giảm đi phần thưởng khai thác. Nó đã kích hoạt những chu kỳ tăng giá mạnh trên thị trường...`,
    excerpt: 'Tìm hiểu sâu về Bitcoin Halving và cách chuẩn bị kịch bản cho chu kỳ tăng trưởng của Crypto 2024-2025.',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 7900,
    tags: ['blockchain', 'bitcoin', 'crypto']
  },
  {
    title: 'Mạng lưới Web3 và kỷ nguyên mới của Internet phi tập trung',
    slug: 'web3-va-ky-nguyen-internet',
    content: `Các ứng dụng phi tập trung DApps đang thay đổi cách chúng ta tương tác với thế giới công nghệ...`,
    excerpt: 'Giải ngố bức tranh Web3: Nó có thực sự đem lại giá trị hay chỉ là thuật ngữ thổi phồng?',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 2200,
    tags: ['blockchain', 'web3', 'tương lai']
  },

  // AI ART
  {
    title: 'Midjourney V6: Bản đồ hoạ đột phá cho giới Creator',
    slug: 'midjourney-v6-dot-pha',
    content: `Sau bản cập nhật V6, Midjourney không chỉ tạo được ảnh photorealism mà còn giúp lồng ghép Text hoàn hảo...`,
    excerpt: 'Sử dụng Midjourney V6 tối ưu nhất với 10 câu lệnh prompt đẳng cấp.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 10400,
    tags: ['ai art', 'midjourney', 'prompt']
  },
  {
    title: 'Sáng tạo Video AI: Biến ý tưởng thành thước phim trong 5 phút',
    slug: 'sang-tao-video-ai',
    content: `Các công cụ chuyển từ Text-to-Video bằng AI như OpenAI Sora đã thay đổi luật chơi...`,
    excerpt: 'Làm thế nào để tạo ra một đoạn video chuyên nghiệp mà không cần dùng đến một chiếc camera nào?',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 5300,
    tags: ['ai art', 'video ai', 'sora']
  },

  // XU HƯỚNG
  {
    title: 'Xu hướng kính thực tế ảo sau màn ra mắt của Apple Vision Pro',
    slug: 'xu-huong-ar-vr-apple-vision-pro',
    content: `Apple Vision Pro đã chứng minh không gian thực tế hỗn hợp (Spatial Computing) có thể...`,
    excerpt: 'Sau sự ra mắt của siêu phẩm Apple Vision Pro, liệu thể chiến của AR/VR sẽ diễn biến ra sao?',
    thumbnail: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 6500,
    tags: ['xu hướng', 'apple vision pro', 'ar/vr']
  },
  {
    title: 'Làm việc từ xa (Remote Work) trong năm 2024: Có còn hấp dẫn?',
    slug: 'lam-viec-tu-xa-2024',
    content: `Trong khi nhiều công ty công nghệ lớn bắt buộc nhân viên quay lại văn phòng, văn hoá Remote vẫn...`,
    excerpt: 'Hàng loạt tập đoàn lớn siết chặt chính sách làm việc. Tương lai của làm việc từ xa sẽ đi về đâu?',
    thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 3100,
    tags: ['xu hướng', 'remote work', 'workspace']
  }
];

async function seedArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    // Tìm user admin để làm author
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('❌ Không tìm thấy user admin. Hãy tạo tài khoản admin trước.');
      process.exit(1);
    }
    console.log(`📝 Sử dụng author: ${admin.fullname} (${admin.email})`);

    // Xóa bài viết cũ
    await Article.deleteMany({});
    console.log('🗑️  Đã xóa toàn bộ bài viết cũ');

    // Thêm author cho tất cả bài viết
    const articlesWithAuthor = articles.map(a => ({ ...a, author: admin._id }));
    const result = await Article.insertMany(articlesWithAuthor);
    console.log(`✅ Đã thêm thành công ${result.length} bài viết!`);

    result.forEach(a => console.log(`   - ${a.title}`));

    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

seedArticles();
