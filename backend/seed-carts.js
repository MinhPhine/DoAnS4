const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_curator')
  .then(async () => {
    // 1. Xóa giỏ hàng cũ
    await Cart.deleteMany({});
    
    // 2. Lấy tất cả user
    const users = await User.find();
    if (users.length === 0) {
      console.log('Chưa có user nào, vui lòng tạo user trước khi tạo giỏ hàng.');
      process.exit(1);
    }

    // 3. Lấy tất cả sản phẩm
    const products = await Product.find();
    if (products.length === 0) {
      console.log('Chưa có sản phẩm nào, vui lòng thêm sản phẩm trước khi tạo giỏ hàng.');
      process.exit(1);
    }

    let createdCarts = 0;

    // 4. Tạo giỏ hàng ngẫu nhiên cho từng user
    for (const user of users) {
      // Mỗi người dùng có từ 1 đến 3 sản phẩm trong giỏ hàng
      const numItems = Math.floor(Math.random() * 3) + 1; 
      const selectedProducts = [];
      const cartItems = [];

      for (let i = 0; i < numItems; i++) {
        // Chọn random sản phẩm không trùng
        let randomProduct;
        do {
          randomProduct = products[Math.floor(Math.random() * products.length)];
        } while (selectedProducts.includes(randomProduct._id));
        
        selectedProducts.push(randomProduct._id);
        
        cartItems.push({
          product: randomProduct._id,
          qty: Math.floor(Math.random() * 3) + 1 // Số lượng từ 1 đến 3
        });
      }

      await Cart.create({
        user: user._id,
        items: cartItems
      });

      createdCarts++;
    }

    console.log(`🎉 Đã tạo ngẫu nhiên ${createdCarts} giỏ hàng (Cart) từ dữ liệu cho từng User!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Lỗi khi seed data Cart:', err.message);
    process.exit(1);
  });
