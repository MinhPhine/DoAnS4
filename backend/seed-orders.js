const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Address = require('./models/Address');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_curator')
  .then(async () => {
    // 1. Wipe existing mock orders & items & addresses
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    // Phải lặp tìm address cũ để xóa nếu thích, nhưng cứ xoá hết đi
    await Address.deleteMany({});
    
    // 2. Load basic relations
    const users = await User.find();
    if (users.length === 0) {
      console.log('Chưa có user nào, vui lòng tạo user trước khi tạo orders.');
      process.exit(1);
    }
    const products = await Product.find();
    if (products.length === 0) {
      console.log('Chưa có sản phẩm nào, không thể tạo orders.');
      process.exit(1);
    }

    let createdOrdersCount = 0;
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const paymentMethods = ['COD', 'BANK', 'MOMO'];

    // 3. For each user, generate 1-3 orders
    for (const user of users) {
      // Setup Address for user
      const address = await Address.create({
        user: user._id,
        fullName: user.fullname || 'Nguyen Van A',
        phone: user.phone || '0901234567',
        address: '123 Đường Điện Biên Phủ',
        city: 'TP. Hồ Chí Minh',
        country: 'Vietnam',
        isDefault: true
      });

      const numOrders = Math.floor(Math.random() * 3) + 1; // 1 to 3 orders
      
      for (let i = 0; i < numOrders; i++) {
        // Build items logic identical to Cart items logic
        const numItems = Math.floor(Math.random() * 3) + 1;
        const selectedProductIds = [];
        const orderItemsData = [];
        let totalPrice = 0;

        for (let j = 0; j < numItems; j++) {
          let randomProduct;
          do {
            randomProduct = products[Math.floor(Math.random() * products.length)];
          } while (selectedProductIds.includes(randomProduct._id.toString()));
          
          selectedProductIds.push(randomProduct._id.toString());
          
          const qty = Math.floor(Math.random() * 2) + 1;
          const currPrice = randomProduct.discountPrice || randomProduct.price || 0;
          totalPrice += currPrice * qty;

          orderItemsData.push({
            product: randomProduct._id,
            name: randomProduct.name,
            qty: qty,
            image: (randomProduct.images && randomProduct.images[0]) || '/placeholder.jpg',
            price: currPrice
          });
        }

        const isPaidStatus = Math.random() > 0.5;
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        // Create Order Head
        const newOrder = await Order.create({
          user: user._id,
          shippingAddress: address._id,
          totalPrice: totalPrice,
          paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
          isPaid: isPaidStatus,
          paidAt: isPaidStatus ? Date.now() : null,
          isDelivered: status === 'delivered',
          deliveredAt: status === 'delivered' ? Date.now() : null,
          status: status
        });

        // Insert Order Items
        for (const itemData of orderItemsData) {
          await OrderItem.create({
            order: newOrder._id,
            product: itemData.product,
            name: itemData.name,
            qty: itemData.qty,
            image: itemData.image,
            price: itemData.price
          });
        }
        
        createdOrdersCount++;
      }
    }

    console.log(`🎉 Đã tạo ngẫu nhiên thành công ${createdOrdersCount} Đơn hàng (Orders & Items tương ứng) cùng hệ thống địa chỉ giao hàng cho tất cả Users!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Lỗi khi seed data Orders:', err.message);
    process.exit(1);
  });
