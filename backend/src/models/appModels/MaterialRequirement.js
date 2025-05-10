const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  requestedDate: {
    type: Date,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true,
        autopopulate: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],

  status: {
    type: String,
    enum: ['draft', 'submitted', 'completed', 'cancelled', 'on process'],
    default: 'draft',
  },

  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

invoiceSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('MaterialRequirement', invoiceSchema);
