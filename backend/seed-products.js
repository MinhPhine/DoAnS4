const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  // === ĐIỆN THOẠI (mobile) ===
  {
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max',
    description: 'iPhone 15 Pro Max với chip A17 Pro, khung Titan, camera 48MP tiên tiến nhất từ Apple.',
    price: 28990000,
    discountPrice: 26990000,
    category: 'mobile',
    brand: 'Apple',
    images: ['/images/products/iphone-15-pro-max.jpg'],
    specs: [
      { key: 'Màn hình', value: '6.7 inch Super Retina XDR' },
      { key: 'Chip', value: 'A17 Pro' },
      { key: 'RAM', value: '8GB' },
      { key: 'Pin', value: '4422 mAh' }
    ],
    stock: 50,
    rating: 4.8,
    numReviews: 234,
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Galaxy S24 Ultra trang bị chip Snapdragon 8 Gen 3, S Pen tích hợp, Galaxy AI thông minh.',
    price: 29990000,
    discountPrice: 26490000,
    category: 'mobile',
    brand: 'Samsung',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '6.8 inch Dynamic AMOLED 2X' },
      { key: 'Chip', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '12GB' },
      { key: 'Pin', value: '5000 mAh' }
    ],
    stock: 35,
    rating: 4.7,
    numReviews: 189,
    isFeatured: true
  },
  {
    name: 'Xiaomi 14 Ultra',
    slug: 'xiaomi-14-ultra',
    description: 'Xiaomi 14 Ultra với hệ thống camera Leica chuyên nghiệp, chip Snapdragon 8 Gen 3.',
    price: 19990000,
    discountPrice: 17990000,
    category: 'mobile',
    brand: 'Xiaomi',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '6.73 inch LTPO AMOLED' },
      { key: 'Chip', value: 'Snapdragon 8 Gen 3' },
      { key: 'RAM', value: '16GB' },
      { key: 'Pin', value: '5000 mAh' }
    ],
    stock: 20,
    rating: 4.6,
    numReviews: 95,
    isFeatured: false
  },
  {
    name: 'OPPO Find X7 Ultra',
    slug: 'oppo-find-x7-ultra',
    description: 'OPPO Find X7 Ultra với camera kép periscope, chip Dimensity 9300.',
    price: 21990000,
    discountPrice: 19990000,
    category: 'mobile',
    brand: 'OPPO',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '6.82 inch LTPO AMOLED' },
      { key: 'Chip', value: 'Dimensity 9300' },
      { key: 'RAM', value: '16GB' },
      { key: 'Pin', value: '5210 mAh' }
    ],
    stock: 15,
    rating: 4.5,
    numReviews: 67,
    isFeatured: false
  },

  // === LAPTOP ===
  {
    name: 'MacBook Pro 14 M3 Pro',
    slug: 'macbook-pro-14-m3-pro',
    description: 'MacBook Pro 14 inch chip M3 Pro, hiệu năng vượt trội cho công việc sáng tạo chuyên nghiệp.',
    price: 49990000,
    discountPrice: 46990000,
    category: 'laptop',
    brand: 'Apple',
    images: ['/images/products/macbook-pro-14-m3-pro.jpg'],
    specs: [
      { key: 'Màn hình', value: '14.2 inch Liquid Retina XDR' },
      { key: 'Chip', value: 'Apple M3 Pro' },
      { key: 'RAM', value: '18GB' },
      { key: 'SSD', value: '512GB' }
    ],
    stock: 25,
    rating: 4.9,
    numReviews: 312,
    isFeatured: true
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    slug: 'asus-rog-zephyrus-g14',
    description: 'Laptop gaming mỏng nhẹ với RTX 4060, AMD Ryzen 9, màn hình OLED 120Hz.',
    price: 39990000,
    discountPrice: 35990000,
    category: 'laptop',
    brand: 'ASUS',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '14 inch 2.8K OLED 120Hz' },
      { key: 'CPU', value: 'AMD Ryzen 9 8945HS' },
      { key: 'GPU', value: 'RTX 4060' },
      { key: 'RAM', value: '16GB DDR5' }
    ],
    stock: 18,
    rating: 4.7,
    numReviews: 156,
    isFeatured: true
  },
  {
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'Dell XPS 15 với màn hình InfinityEdge, chip Intel Core i7 thế hệ 14, thiết kế siêu mỏng.',
    price: 37990000,
    discountPrice: 34990000,
    category: 'laptop',
    brand: 'Dell',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '15.6 inch 3.5K OLED' },
      { key: 'CPU', value: 'Intel Core i7-14700H' },
      { key: 'RAM', value: '16GB DDR5' },
      { key: 'SSD', value: '512GB' }
    ],
    stock: 22,
    rating: 4.6,
    numReviews: 98,
    isFeatured: false
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    slug: 'lenovo-thinkpad-x1-carbon-gen11',
    description: 'ThinkPad X1 Carbon - laptop doanh nhân hàng đầu với bàn phím huyền thoại và bảo mật doanh nghiệp.',
    price: 34990000,
    discountPrice: 31990000,
    category: 'laptop',
    brand: 'Lenovo',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '14 inch 2.8K OLED' },
      { key: 'CPU', value: 'Intel Core i7-1365U' },
      { key: 'RAM', value: '16GB LPDDR5' },
      { key: 'SSD', value: '512GB' }
    ],
    stock: 12,
    rating: 4.8,
    numReviews: 203,
    isFeatured: false
  },

  // === PHỤ KIỆN ÂM THANH (accessory) ===
  {
    name: 'AirPods Pro 2 (USB-C)',
    slug: 'airpods-pro-2-usbc',
    description: 'AirPods Pro thế hệ 2 với cổng USB-C, chống ồn chủ động ANC, âm thanh không gian.',
    price: 5990000,
    discountPrice: 5490000,
    category: 'accessory',
    brand: 'Apple',
    images: ['/images/products/airpods-pro-2-usbc.jpg'],
    specs: [
      { key: 'Chống ồn', value: 'ANC chủ động' },
      { key: 'Chip', value: 'Apple H2' },
      { key: 'Pin', value: '6 giờ (30 giờ với hộp sạc)' }
    ],
    stock: 100,
    rating: 4.8,
    numReviews: 540,
    isFeatured: true
  },
  {
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Tai nghe chụp tai Sony cao cấp, chống ồn hàng đầu thế giới, pin 30 giờ.',
    price: 7490000,
    discountPrice: 6490000,
    category: 'accessory',
    brand: 'Sony',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Chống ồn', value: 'ANC cao cấp, 8 microphone' },
      { key: 'Pin', value: '30 giờ' },
      { key: 'Kết nối', value: 'Bluetooth 5.3, Multipoint' }
    ],
    stock: 40,
    rating: 4.9,
    numReviews: 325,
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy Buds3 Pro',
    slug: 'samsung-galaxy-buds3-pro',
    description: 'Galaxy Buds3 Pro thiết kế mới, chống ồn AI, âm thanh 360 Audio.',
    price: 4990000,
    discountPrice: 4290000,
    category: 'accessory',
    brand: 'Samsung',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Chống ồn', value: 'ANC thông minh AI' },
      { key: 'Pin', value: '7 giờ (30 giờ với hộp sạc)' },
      { key: 'Chống nước', value: 'IPX7' }
    ],
    stock: 60,
    rating: 4.5,
    numReviews: 142,
    isFeatured: false
  },

  // === AI & ROBOT (ai) ===
  {
    name: 'Meta Quest 3 128GB',
    slug: 'meta-quest-3-128gb',
    description: 'Kính thực tế hỗn hợp Meta Quest 3 với chip Snapdragon XR2 Gen 2, mixed reality tiên tiến.',
    price: 12990000,
    discountPrice: 11490000,
    category: 'ai',
    brand: 'Meta',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Chip', value: 'Snapdragon XR2 Gen 2' },
      { key: 'Bộ nhớ', value: '128GB' },
      { key: 'Màn hình', value: '2064x2208 mỗi mắt' }
    ],
    stock: 30,
    rating: 4.6,
    numReviews: 87,
    isFeatured: true
  },
  {
    name: 'DJI Mavic 3 Pro',
    slug: 'dji-mavic-3-pro',
    description: 'Flycam chuyên nghiệp DJI Mavic 3 Pro với 3 camera, quay 5.1K, bay 43 phút.',
    price: 45990000,
    discountPrice: 42990000,
    category: 'ai',
    brand: 'DJI',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Camera', value: 'Hasselblad + Tele 3x + Tele 7x' },
      { key: 'Video', value: '5.1K/50fps' },
      { key: 'Thời gian bay', value: '43 phút' }
    ],
    stock: 10,
    rating: 4.9,
    numReviews: 56,
    isFeatured: true
  },

  // === GAMING GEAR (gaming) ===
  {
    name: 'PlayStation 5 Slim',
    slug: 'playstation-5-slim',
    description: 'PS5 Slim phiên bản mỏng gọn hơn 30%, ổ SSD 1TB, hiệu năng giữ nguyên.',
    price: 13990000,
    discountPrice: 12490000,
    category: 'gaming',
    brand: 'Sony',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'CPU/GPU', value: 'AMD Zen 2 / RDNA 2' },
      { key: 'SSD', value: '1TB NVMe' },
      { key: 'Đồ họa', value: '4K 120fps, Ray Tracing' }
    ],
    stock: 45,
    rating: 4.8,
    numReviews: 425,
    isFeatured: true
  },
  {
    name: 'Razer BlackWidow V4 Pro',
    slug: 'razer-blackwidow-v4-pro',
    description: 'Bàn phím cơ gaming Razer cao cấp, switch Green clicky, RGB Chroma, Command Dial.',
    price: 5990000,
    discountPrice: 4990000,
    category: 'gaming',
    brand: 'Razer',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Switch', value: 'Razer Green Mechanical' },
      { key: 'Đèn', value: 'RGB Chroma' },
      { key: 'Kết nối', value: 'USB-C, có dây' }
    ],
    stock: 30,
    rating: 4.6,
    numReviews: 178,
    isFeatured: false
  },
  {
    name: 'Logitech G Pro X Superlight 2',
    slug: 'logitech-g-pro-x-superlight-2',
    description: 'Chuột gaming không dây siêu nhẹ 60g, cảm biến HERO 2, pin 95 giờ.',
    price: 3490000,
    discountPrice: 2990000,
    category: 'gaming',
    brand: 'Logitech',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Cảm biến', value: 'HERO 2 (32K DPI)' },
      { key: 'Trọng lượng', value: '60g' },
      { key: 'Pin', value: '95 giờ' }
    ],
    stock: 55,
    rating: 4.7,
    numReviews: 230,
    isFeatured: true
  },
  {
    name: 'Nintendo Switch OLED',
    slug: 'nintendo-switch-oled',
    description: 'Nintendo Switch phiên bản OLED 7 inch, dock có cổng LAN, chân đế rộng cải tiến.',
    price: 8490000,
    discountPrice: 7490000,
    category: 'gaming',
    brand: 'Nintendo',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'],
    specs: [
      { key: 'Màn hình', value: '7 inch OLED' },
      { key: 'Bộ nhớ', value: '64GB' },
      { key: 'Pin', value: '4.5-9 giờ' }
    ],
    stock: 35,
    rating: 4.7,
    numReviews: 380,
    isFeatured: false
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');
    
    // Xóa sản phẩm cũ
    await Product.deleteMany({});
    console.log('🗑️  Đã xóa toàn bộ sản phẩm cũ');
    
    // Thêm sản phẩm mới
    const result = await Product.insertMany(products);
    console.log(`✅ Đã thêm thành công ${result.length} sản phẩm!`);
    
    // Thống kê
    const stats = {};
    products.forEach(p => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    console.log('\n📊 Thống kê theo danh mục:');
    Object.entries(stats).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} sản phẩm`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

seedProducts();
