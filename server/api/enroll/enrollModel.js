const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  //id from course
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },

  //user array who enroll to course
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

  time: {
    type: Date,
    default: Date.now,
  }
});

OrderSchema.index({courseId: 1, userId: 1},{unique: true});
module.exports = mongoose.model('enroll', OrderSchema);
