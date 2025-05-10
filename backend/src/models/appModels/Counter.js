// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: {
    type: String, // Format: PREFIX-YYMM, e.g., MPS-2505
    required: true,
  },
  seq: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Counter', counterSchema);
