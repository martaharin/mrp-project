const mongoose = require('mongoose');
// const Item = require('./path/to/your/item-model'); // adjust the path if needed
const { appModelsList, routesList, entityList } = require('./models/utils');
const Item = require('./models/appModels/Item');
const ProductionSchedule = require('./models/appModels/ProductionSchedule');

// Connect to MongoDB

const dummyData = {
  Machine: [
    {
      removed: false,
      enabled: true,
      name: 'Machine 1', // You can name your machines according to your business needs
      capacity: 100, // Capacity (can be in terms of grams, pieces, etc.)
      item: '680e1a1c3a690ed85d9ebf9a', // ObjectId for 'Beng-Beng Bar'
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      enabled: true,
      name: 'Machine 2',
      capacity: 200,
      item: '680e1a1c3a690ed85d9ebf9b', // ObjectId for 'Energen Sachet'
      created: new Date(),
      updated: new Date(),
    },
  ],

  ProductionSchedule: [
    {
      removed: false,
      requestedDate: new Date('2025-04-27T12:30:00.000Z'),
      bom: '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
      machine: '680e22356a596f802cee62a4', // Machine 1
      qty: 500,
      status: 'draft',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-27T12:45:00.000Z'),
      bom: '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
      machine: '680e22356a596f802cee62a5', // Machine 2
      qty: 300,
      status: 'scheduled',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-28T08:00:00.000Z'),
      bom: '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
      machine: '680e22356a596f802cee62a4', // Machine 1
      qty: 600,
      status: 'on process',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-28T10:00:00.000Z'),
      bom: '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
      machine: '680e22356a596f802cee62a5', // Machine 2
      qty: 350,
      status: 'finished',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-29T12:00:00.000Z'),
      bom: '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
      machine: '680e22356a596f802cee62a4', // Machine 1
      qty: 450,
      status: 'draft',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-29T15:00:00.000Z'),
      bom: '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
      machine: '680e22356a596f802cee62a5', // Machine 2
      qty: 400,
      status: 'scheduled',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-30T08:30:00.000Z'),
      bom: '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
      machine: '680e22356a596f802cee62a4', // Machine 1
      qty: 550,
      status: 'on process',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-04-30T11:30:00.000Z'),
      bom: '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
      machine: '680e22356a596f802cee62a5', // Machine 2
      qty: 450,
      status: 'finished',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-05-01T09:00:00.000Z'),
      bom: '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
      machine: '680e22356a596f802cee62a4', // Machine 1
      qty: 500,
      status: 'draft',
      created: new Date(),
      updated: new Date(),
    },
    {
      removed: false,
      requestedDate: new Date('2025-05-01T12:00:00.000Z'),
      bom: '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
      machine: '680e22356a596f802cee62a5', // Machine 2
      qty: 380,
      status: 'scheduled',
      created: new Date(),
      updated: new Date(),
    },
  ],
  // Add more model data here as needed
};

const productionSchedules = [];

const bomIds = [
  '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
  '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
];

const machineIds = [
  '680e22356a596f802cee62a4', // Machine 1
  '680e22356a596f802cee62a5', // Machine 2
];

const statusOptions = ['draft', 'scheduled', 'on process', 'finished', 'cancelled'];

function getRandomDate(year) {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomStatus() {
  return statusOptions[Math.floor(Math.random() * statusOptions.length)];
}

function getRandomQty() {
  return Math.floor(Math.random() * (500 - 200 + 1)) + 200; // Quantity between 200 and 500
}

for (let i = 0; i < 200; i++) {
  const requestedDate = getRandomDate(2025); // Random date in 2025
  const bom = bomIds[Math.floor(Math.random() * bomIds.length)];
  const machine = machineIds[Math.floor(Math.random() * machineIds.length)];
  const qty = getRandomQty();
  const status = getRandomStatus();

  productionSchedules.push({
    removed: false,
    requestedDate,
    bom,
    machine,
    qty,
    status,
    created: new Date(),
    updated: new Date(),
  });
}

// Insert data
// mongoose
//   .connect(
//     'mongodb+srv://martaharin:martaharin@cluster0.qry4kn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//   )
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Connection error', err));
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
    console.log(entityList);

    // const model = 'ProductionSchedule';
    // const Model = mongoose.model('ProductionSchedule');
    // // console.log(appModelsList);
    // await Model.insertMany(productionSchedules);
    // console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy data', error);
  } finally {
    mongoose.connection.close();
  }
}

seedItems();
