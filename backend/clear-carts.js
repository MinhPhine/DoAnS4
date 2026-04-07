const mongoose = require('mongoose');
require('dotenv').config();

const Cart = require('./models/Cart');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital_curator')
  .then(async () => {
    const result = await Cart.deleteMany({});
    console.log('Đã xóa ' + result.deletedCount + ' giỏ hàng khỏi database thành công!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Lỗi khi xóa Carts:', err.message);
    process.exit(1);
  });
