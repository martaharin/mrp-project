const mongoose = require('mongoose');
const fs = require('fs');
const { ProductionSchedule } = require('./schema');
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.error('Database connection failed:', error));

const schema = new mongoose.Schema({
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
async function seedItems() {
  try {
    const model = 'ProductionSchedule';
    // const Model = mongoose.model('ProductionSchedule', schema);

    const products = await ProductionSchedule.find()
      .populate('bom') // Populating the 'bom' reference from the BillOfMaterial collection
      .populate('machine');
    fs.writeFileSync(model + '.json', JSON.stringify(products, null, 2));
    // console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy data', error);
  } finally {
    mongoose.connection.close();
  }
}

seedItems();
