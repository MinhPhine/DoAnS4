const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('./models/Article');
const User = require('./models/User');

const articles = [
  {
    title: 'Có nên mua iPhone 15 Pro Max thời điểm này hay đợi iPhone 16?',
    slug: 'co-nen-mua-iphone-15-pro-max',
    content: `iPhone 15 Pro Max đã ra mắt được gần 1 năm và hiện tại giá đã giảm khá nhiều so với ban đầu. Câu hỏi đặt ra là liệu có nên mua ngay hay đợi iPhone 16 sắp ra mắt?\n\n**Ưu điểm khi mua ngay:**\n- Giá đã giảm 3-5 triệu so với lúc ra mắt\n- Chip A17 Pro vẫn mạnh mẽ trong 3-4 năm tới\n- Camera zoom 5x xuất sắc\n- Khung Titanium nhẹ và bền\n\n**Nên đợi iPhone 16 nếu:**\n- Bạn muốn có chip A18 mới nhất\n- Muốn hỗ trợ Apple Intelligence đầy đủ\n- Không vội, có thể đợi thêm 3-4 tháng\n\nTheo kinh nghiệm cá nhân, nếu bạn đang dùng iPhone 13 trở về trước thì nâng cấp lên 15 Pro Max là hoàn toàn xứng đáng ở thời điểm này.`,
    excerpt: 'Phân tích chi tiết ưu nhược điểm khi mua iPhone 15 Pro Max ở thời điểm hiện tại so với việc đợi iPhone 16.',
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 3500,
    tags: ['hỏi đáp', 'iphone', 'apple']
  },
  {
    title: 'Cách tối ưu hóa pin cho Android 14 cực kỳ hiệu quả',
    slug: 'toi-uu-pin-android-14',
    content: `Android 14 mang đến nhiều tính năng mới nhưng cũng khiến pin nhanh hết hơn nếu bạn không biết cách tối ưu. Dưới đây là những mẹo đã được kiểm chứng:\n\n**1. Tắt các tính năng không cần thiết:**\n- Always-on Display: Tiết kiệm 5-10% pin/ngày\n- Adaptive Brightness: Thay vào đó chỉnh tay\n\n**2. Quản lý ứng dụng nền:**\n- Vào Settings > Battery > Battery Usage\n- Hạn chế các app chạy nền không cần thiết\n\n**3. Sử dụng Dark Mode:**\n- Trên màn OLED, Dark Mode tiết kiệm tới 20% pin\n\n**4. Cập nhật phần mềm thường xuyên:**\n- Các bản cập nhật thường fix bug tiêu tốn pin\n\nÁp dụng những mẹo trên, mình đã kéo dài thời gian sử dụng Galaxy S24 Ultra từ 6 giờ SOT lên 8.5 giờ.`,
    excerpt: 'Tổng hợp các mẹo tối ưu hóa pin Android 14 giúp kéo dài thời gian sử dụng đáng kể.',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 1200,
    tags: ['thủ thuật', 'android', 'pin']
  },
  {
    title: 'Đánh giá MacBook Pro M3 sau 6 tháng sử dụng thực tế',
    slug: 'danh-gia-macbook-pro-m3-6-thang',
    content: `Sau 6 tháng sử dụng MacBook Pro M3 14 inch làm máy chính cho công việc lập trình và edit video, mình chia sẻ trải nghiệm thực tế:\n\n**Hiệu năng:** 9.5/10\n- Compile dự án React Nativehalf thời gian so với M1\n- Render video 4K/10 phút trên DaVinci Resolve: 3 phút\n- Chạy Docker + VS Code + Chrome 30 tabs: mượt mà\n\n**Pin:** 9/10\n- Làm việc coding: 12-14 giờ\n- Edit video: 6-8 giờ\n- Xem phim: 16+ giờ\n\n**Màn hình:** 10/10\n- Liquid Retina XDR, HDR tuyệt vời\n- 120Hz ProMotion mượt mà\n\n**Nhược điểm:**\n- Giá vẫn cao (gần 50 triệu)\n- Webcam chỉ 1080p, chưa có Face ID\n- Thiếu touchscreen\n\nTổng kết: Nếu bạn là creative professional hoặc developer, đây là laptop tốt nhất hiện tại.`,
    excerpt: 'Review chi tiết MacBook Pro M3 sau 6 tháng sử dụng cho lập trình và edit video chuyên nghiệp.',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 5200,
    tags: ['đánh giá', 'macbook', 'apple', 'laptop']
  },
  {
    title: 'So sánh camera Galaxy S24 Ultra và iPhone 15 Pro Max',
    slug: 'so-sanh-camera-s24-ultra-vs-iphone-15-pro-max',
    content: `Hai flagship hàng đầu 2024 với hệ thống camera mạnh mẽ nhất. Mình đã chụp hơn 500 tấm ảnh trong nhiều điều kiện khác nhau để so sánh:\n\n**Ban ngày:**\n- S24 Ultra: Màu sắc tươi, HDR mạnh, chi tiết tốt\n- iPhone 15 PM: Màu tự nhiên hơn, dynamic range cân bằng\n\n**Ban đêm:**\n- S24 Ultra: Nightography tốt, giảm noise hiệu quả\n- iPhone 15 PM: Night mode tự nhiên hơn, ít AI quá đà\n\n**Zoom:**\n- S24 Ultra: 100x Space Zoom (tuy nhiên trên 30x thì mờ)\n- iPhone 15 PM: 5x optical zoom chất lượng cao\n\n**Video:**\n- S24 Ultra: 8K 30fps, chống rung OIS tốt\n- iPhone 15 PM: 4K ProRes, Cinematic Mode đỉnh\n\n**Kết luận:** Nếu thích ảnh đẹp và zoom xa chọn S24 Ultra. Nếu thích video và màu tự nhiên chọn iPhone 15 Pro Max.`,
    excerpt: 'So sánh chi tiết camera giữa Galaxy S24 Ultra và iPhone 15 Pro Max qua hơn 500 tấm ảnh thực tế.',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 4100,
    tags: ['so sánh', 'camera', 'samsung', 'apple']
  },
  {
    title: 'Top 5 bàn phím cơ gaming đáng mua nhất 2024',
    slug: 'top-5-ban-phim-co-gaming-2024',
    content: `Sau khi thử nghiệm hơn 20 bàn phím cơ gaming trong năm 2024, đây là top 5 lựa chọn tốt nhất theo từng phân khúc:\n\n**1. Razer BlackWidow V4 Pro** - Cao cấp nhất (5.990.000đ)\n- Switch Green Clicky, RGB Chroma, Command Dial\n- Phù hợp: Game thủ chuyên nghiệp\n\n**2. Keychron Q1 Pro** - Best cho cả work & game (3.500.000đ)\n- Hot-swap, QMK/VIA, Bluetooth 5.1\n- Phù hợp: Người dùng đa nhiệm\n\n**3. Royal Kludge RK84** - Giá tốt nhất (1.200.000đ)\n- Tri-mode, hot-swap, RGB\n- Phù hợp: Budget gamer\n\n**4. Logitech G915 TKL** - Wireless tốt nhất (4.200.000đ)\n- Low-profile, LIGHTSPEED, pin 40 giờ\n- Phù hợp: Setup clean\n\n**5. Corsair K70 RGB Pro** - Bền bỉ nhất (3.800.000đ)\n- Cherry MX Red, 8000Hz polling rate\n- Phù hợp: FPS competitive`,
    excerpt: 'Tổng hợp 5 bàn phím cơ gaming tốt nhất 2024 qua thử nghiệm thực tế hơn 20 sản phẩm.',
    thumbnail: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 2800,
    tags: ['top list', 'gaming', 'bàn phím cơ']
  },
  {
    title: 'Hướng dẫn build PC Gaming 20 triệu chơi mượt mọi game 2024',
    slug: 'build-pc-gaming-20-trieu-2024',
    content: `Với ngân sách 20 triệu, bạn hoàn toàn có thể build một cấu hình chơi mượt hầu hết các game AAA ở 1080p High-Ultra:\n\n**Cấu hình đề xuất:**\n- CPU: AMD Ryzen 5 5600 (3.200.000đ)\n- GPU: RX 7600 8GB (5.500.000đ)\n- RAM: 16GB DDR4 3200MHz (800.000đ)\n- SSD: 500GB NVMe (650.000đ)\n- Mainboard: B550M (2.000.000đ)\n- PSU: 650W 80+ Bronze (1.200.000đ)\n- Case: Xigmatek (600.000đ)\n- Tản nhiệt: ID-Cooling SE-214 (300.000đ)\n- Màn hình: 24" 165Hz IPS (3.500.000đ)\n\n**Tổng: ~17.750.000đ** (dư ~2.250.000đ cho phím chuột)\n\n**FPS tham khảo (1080p High):**\n- Cyberpunk 2077: 60-75fps\n- Elden Ring: 55-60fps\n- CS2: 200+ fps\n- Valorant: 300+ fps`,
    excerpt: 'Hướng dẫn chi tiết build PC Gaming 20 triệu mạnh nhất 2024 với FPS benchmark các game phổ biến.',
    thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800',
    status: 'published',
    views: 6400,
    tags: ['hướng dẫn', 'pc gaming', 'build pc']
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
