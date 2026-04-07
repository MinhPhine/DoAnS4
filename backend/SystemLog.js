const mongoose = require('mongoose');

const SystemLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  action: { type: String, required: true }, // e.g., 'CREATE_PRODUCT', 'DELETE_USER'
  module: { type: String, required: true }, // e.g., 'Products', 'Auth'
  details: String,
  ipAddress: String
}, { timestamps: true });

module.exports = mongoose.model('SystemLog', SystemLogSchema);
