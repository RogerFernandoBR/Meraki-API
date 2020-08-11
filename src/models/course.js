const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    default: 1,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Number,
    default: 1,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
