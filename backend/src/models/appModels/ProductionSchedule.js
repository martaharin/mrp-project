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
  bom: {
    type: mongoose.Schema.ObjectId,
    ref: 'BillOfMaterial',
    required: true,
    autopopulate: true,
  },
  machine: {
    type: mongoose.Schema.ObjectId,
    ref: 'Machine',
    required: true,
    autopopulate: true,
  },

  qty: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ['draft', 'scheduled', 'finished', 'cancelled', 'on process'],
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
module.exports = mongoose.model('ProductionSchedule', invoiceSchema);
