const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },

  imgPath: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    enum: ['business', 'art', 'history', 'health', 'nature', 'languages', 'law', 'literature', 'science'],
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('course', courseSchema);