const mongoose = require('mongoose');
const { Schema } = mongoose;

// Item Schema
const itemSchema = new Schema({
  removed: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['raw material', 'finish good'], required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

itemSchema.plugin(require('mongoose-autopopulate'));
const Item = mongoose.model('Item', itemSchema);

// Machine Schema
const machineSchema = new Schema({
  removed: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  item: { type: Schema.ObjectId, ref: 'Item', autopopulate: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

machineSchema.plugin(require('mongoose-autopopulate'));
const Machine = mongoose.model('Machine', machineSchema);

// BillOfMaterial Schema
const itemDetailSchema = new Schema({
  item: { type: Schema.ObjectId, ref: 'Item', required: true, autopopulate: true },
  quantity: { type: Number, required: true },
});

// Batch Schema
const batchSchema = new Schema ({
  expired: { type: Date, required: true },  
})

const bomSchema = new Schema({
  removed: { type: Boolean, default: false },
  enabled: { type: Boolean, default: true },
  name: { type: String, required: true },
  items: [itemDetailSchema], // Now an array of items with quantity
  createdBy: { type: Schema.ObjectId, ref: 'Admin' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

bomSchema.plugin(require('mongoose-autopopulate'));
const BillOfMaterial = mongoose.model('BillOfMaterial', bomSchema);

// ProductionSchedule Schema (you shared earlier)
const productionScheduleSchema = new Schema({
  removed: { type: Boolean, default: false },
  requestedDate: { type: Date, required: true },
  bom: { type: Schema.ObjectId, ref: 'BillOfMaterial', required: true, autopopulate: true },
  machine: { type: Schema.ObjectId, ref: 'Machine', required: true, autopopulate: true },
  qty: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'finished', 'cancelled', 'on process'],
    default: 'draft',
  },
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
});

productionScheduleSchema.plugin(require('mongoose-autopopulate'));
const ProductionSchedule = mongoose.model('ProductionSchedule', productionScheduleSchema);

module.exports = { ProductionSchedule, Machine, BillOfMaterial, Item };
