const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  thumbnail: String,
  youtubeId: String, // YouTube video ID để embed
  duration: String, // VD: "12:45"
  category: { type: String, enum: ['unboxing', 'review', 'hands-on', 'tutorial', 'shorts'], default: 'review' },
  views: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
