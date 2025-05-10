const mongoose = require('mongoose');

const itemDetailSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: true,
    autopopulate: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const bomSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: true,
    autopopulate: true,
  },
  items: [itemDetailSchema], // Now an array of items with quantity
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

bomSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('BillOfMaterial', bomSchema);
