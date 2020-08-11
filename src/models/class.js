const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
    default: 0,
  },
  adress: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Number,
    default: 1,
  },
  type: {
    type: Number,
    default: 1,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Class', ClassSchema);
