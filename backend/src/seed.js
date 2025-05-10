const mongoose = require('mongoose');
// const Item = require('./path/to/your/item-model'); // adjust the path if needed
const { appModelsList, routesList, entityList } = require('./models/utils');
const Item = require('./models/appModels/Item');
const ProductionSchedule = require('./models/appModels/ProductionSchedule');
const { quantity } = require('./locale/translation/en_us');

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

  item: [
    {
      enabled: true,
      name: 'Sugar',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Glucose',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Vegetable Oil',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Wheat Flour',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Cocoa Powder',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Wheat Flour',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Milk Powder',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Non-Dairy Creamer',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Malt Extract',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Egg Powder',
      type: 'raw material',
    },
    {
      enabled: true,
      name: 'Beng-Beng Bar',
      type: 'finish good',
    },
    {
      enabled: true,
      name: 'Energen Sachet',
      type: 'finish good',
    },
  ],

  // Add more model data here as needed
};

// const productionSchedules = [];

// const bomIds = [
//   '680e229552b4935757de2e03', // Beng-Beng Bar BillOfMaterial
//   '680e229552b4935757de2e09', // Energen Sachet BillOfMaterial
// ];

// const machineIds = [
//   '680e22356a596f802cee62a4', // Machine 1
//   '680e22356a596f802cee62a5', // Machine 2
// ];

// const statusOptions = ['draft', 'scheduled', 'on process', 'finished', 'cancelled'];

// function getRandomDate(year) {
//   const start = new Date(year, 0, 1);
//   const end = new Date(year, 11, 31);
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

// function getRandomStatus() {
//   return statusOptions[Math.floor(Math.random() * statusOptions.length)];
// }

// function getRandomQty() {
//   return Math.floor(Math.random() * (500 - 200 + 1)) + 200; // Quantity between 200 and 500
// }

// for (let i = 0; i < 200; i++) {
//   const requestedDate = getRandomDate(2025); // Random date in 2025
//   const bom = bomIds[Math.floor(Math.random() * bomIds.length)];
//   const machine = machineIds[Math.floor(Math.random() * machineIds.length)];
//   const qty = getRandomQty();
//   const status = getRandomStatus();

//   productionSchedules.push({
//     removed: false,
//     requestedDate,
//     bom,
//     machine,
//     qty,
//     status,
//     created: new Date(),
//     updated: new Date(),
//   });
// }

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

const dumData = [
  {
    // _id: 'mocked_id_01',
    removed: false,
    name: 'MPS24/08/0001',
    startDate: '2024-08-10T11:12:20.451000Z',
    endDate: '2024-09-09T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 300,
    status: 'completed',
    updated: '2024-08-10T11:12:57.894000Z',
    created: '2024-08-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_02',
    removed: false,
    name: 'MPS24/09/0002',
    startDate: '2024-09-10T11:12:20.451000Z',
    endDate: '2024-10-10T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 250,
    status: 'completed',
    updated: '2024-09-10T11:12:57.894000Z',
    created: '2024-09-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_03',
    removed: false,
    name: 'MPS24/10/0003',
    startDate: '2024-10-10T11:12:20.451000Z',
    endDate: '2024-11-09T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 350,
    status: 'completed',
    updated: '2024-10-10T11:12:57.894000Z',
    created: '2024-10-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_04',
    removed: false,
    name: 'MPS24/11/0004',
    startDate: '2024-11-10T11:12:20.451000Z',
    endDate: '2024-12-10T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 200,
    status: 'completed',
    updated: '2024-11-10T11:12:57.894000Z',
    created: '2024-11-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_05',
    removed: false,
    name: 'MPS24/12/0005',
    startDate: '2024-12-10T11:12:20.451000Z',
    endDate: '2025-01-09T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 250,
    status: 'completed',
    updated: '2024-12-10T11:12:57.894000Z',
    created: '2024-12-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_06',
    removed: false,
    name: 'MPS25/01/0006',
    startDate: '2025-01-10T11:12:20.451000Z',
    endDate: '2025-02-09T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 300,
    status: 'completed',
    updated: '2025-01-10T11:12:57.894000Z',
    created: '2025-01-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_07',
    removed: false,
    name: 'MPS25/02/0007',
    startDate: '2025-02-10T11:12:20.451000Z',
    endDate: '2025-03-12T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 400,
    status: 'completed',
    updated: '2025-02-10T11:12:57.894000Z',
    created: '2025-02-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_08',
    removed: false,
    name: 'MPS25/03/0008',
    startDate: '2025-03-10T11:12:20.451000Z',
    endDate: '2025-04-09T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 250,
    status: 'completed',
    updated: '2025-03-10T11:12:57.894000Z',
    created: '2025-03-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_09',
    removed: false,
    name: 'MPS25/04/0009',
    startDate: '2025-04-10T11:12:20.451000Z',
    endDate: '2025-05-10T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 350,
    status: 'completed',
    updated: '2025-04-10T11:12:57.894000Z',
    created: '2025-04-10T11:12:57.894000Z',
    __v: 0,
  },
  {
    // _id: 'mocked_id_10',
    removed: false,
    name: 'MPS25/05/0010',
    startDate: '2025-05-10T11:12:20.451000Z',
    endDate: '2025-06-09T11:12:20.451000Z',
    bom: '681f18935c90ef753dacc6ec',
    machine: '681a3308cc9f22ee23782e03',
    quantity: 300,
    status: 'completed',
    updated: '2025-05-10T11:12:57.894000Z',
    created: '2025-05-10T11:12:57.894000Z',
    __v: 0,
  },
];
// const dumData = [
//   {
//     // _id: 'mocked_id_01',
//     removed: false,
//     name: 'MPS23/01/0001',
//     startDate: '2023-01-10T11:12:20.451000Z',
//     endDate: '2023-02-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 250,
//     status: 'completed',
//     updated: '2023-01-10T11:12:57.894000Z',
//     created: '2023-01-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_02',
//     removed: false,
//     name: 'MPS23/02/0002',
//     startDate: '2023-02-10T11:12:20.451000Z',
//     endDate: '2023-03-12T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 300,
//     status: 'completed',
//     updated: '2023-02-10T11:12:57.894000Z',
//     created: '2023-02-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_03',
//     removed: false,
//     name: 'MPS23/03/0003',
//     startDate: '2023-03-10T11:12:20.451000Z',
//     endDate: '2023-04-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 250,
//     status: 'completed',
//     updated: '2023-03-10T11:12:57.894000Z',
//     created: '2023-03-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_04',
//     removed: false,
//     name: 'MPS23/04/0004',
//     startDate: '2023-04-10T11:12:20.451000Z',
//     endDate: '2023-05-10T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 300,
//     status: 'completed',
//     updated: '2023-04-10T11:12:57.894000Z',
//     created: '2023-04-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_05',
//     removed: false,
//     name: 'MPS23/05/0005',
//     startDate: '2023-05-10T11:12:20.451000Z',
//     endDate: '2023-06-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 400,
//     status: 'completed',
//     updated: '2023-05-10T11:12:57.894000Z',
//     created: '2023-05-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_06',
//     removed: false,
//     name: 'MPS23/06/0006',
//     startDate: '2023-06-10T11:12:20.451000Z',
//     endDate: '2023-07-10T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 250,
//     status: 'completed',
//     updated: '2023-06-10T11:12:57.894000Z',
//     created: '2023-06-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_07',
//     removed: false,
//     name: 'MPS23/07/0007',
//     startDate: '2023-07-10T11:12:20.451000Z',
//     endDate: '2023-08-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 350,
//     status: 'completed',
//     updated: '2023-07-10T11:12:57.894000Z',
//     created: '2023-07-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_08',
//     removed: false,
//     name: 'MPS23/08/0008',
//     startDate: '2023-08-10T11:12:20.451000Z',
//     endDate: '2023-09-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 400,
//     status: 'completed',
//     updated: '2023-08-10T11:12:57.894000Z',
//     created: '2023-08-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_09',
//     removed: false,
//     name: 'MPS23/09/0009',
//     startDate: '2023-09-10T11:12:20.451000Z',
//     endDate: '2023-10-10T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 250,
//     status: 'completed',
//     updated: '2023-09-10T11:12:57.894000Z',
//     created: '2023-09-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_10',
//     removed: false,
//     name: 'MPS23/10/0010',
//     startDate: '2023-10-10T11:12:20.451000Z',
//     endDate: '2023-11-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 400,
//     status: 'completed',
//     updated: '2023-10-10T11:12:57.894000Z',
//     created: '2023-10-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_11',
//     removed: false,
//     name: 'MPS23/11/0011',
//     startDate: '2023-11-10T11:12:20.451000Z',
//     endDate: '2023-12-10T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 300,
//     status: 'completed',
//     updated: '2023-11-10T11:12:57.894000Z',
//     created: '2023-11-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_12',
//     removed: false,
//     name: 'MPS23/12/0012',
//     startDate: '2023-12-10T11:12:20.451000Z',
//     endDate: '2024-01-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 200,
//     status: 'completed',
//     updated: '2023-12-10T11:12:57.894000Z',
//     created: '2023-12-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_13',
//     removed: false,
//     name: 'MPS24/01/0013',
//     startDate: '2024-01-10T11:12:20.451000Z',
//     endDate: '2024-02-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 250,
//     status: 'completed',
//     updated: '2024-01-10T11:12:57.894000Z',
//     created: '2024-01-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_14',
//     removed: false,
//     name: 'MPS24/02/0014',
//     startDate: '2024-02-10T11:12:20.451000Z',
//     endDate: '2024-03-11T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 400,
//     status: 'completed',
//     updated: '2024-02-10T11:12:57.894000Z',
//     created: '2024-02-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_15',
//     removed: false,
//     name: 'MPS24/03/0015',
//     startDate: '2024-03-10T11:12:20.451000Z',
//     endDate: '2024-04-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 250,
//     status: 'completed',
//     updated: '2024-03-10T11:12:57.894000Z',
//     created: '2024-03-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_16',
//     removed: false,
//     name: 'MPS24/04/0016',
//     startDate: '2024-04-10T11:12:20.451000Z',
//     endDate: '2024-05-10T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 350,
//     status: 'completed',
//     updated: '2024-04-10T11:12:57.894000Z',
//     created: '2024-04-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_17',
//     removed: false,
//     name: 'MPS24/05/0017',
//     startDate: '2024-05-10T11:12:20.451000Z',
//     endDate: '2024-06-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 200,
//     status: 'completed',
//     updated: '2024-05-10T11:12:57.894000Z',
//     created: '2024-05-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_18',
//     removed: false,
//     name: 'MPS24/06/0018',
//     startDate: '2024-06-10T11:12:20.451000Z',
//     endDate: '2024-07-10T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 300,
//     status: 'completed',
//     updated: '2024-06-10T11:12:57.894000Z',
//     created: '2024-06-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_19',
//     removed: false,
//     name: 'MPS24/07/0019',
//     startDate: '2024-07-10T11:12:20.451000Z',
//     endDate: '2024-08-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 300,
//     status: 'completed',
//     updated: '2024-07-10T11:12:57.894000Z',
//     created: '2024-07-10T11:12:57.894000Z',
//     __v: 0,
//   },
//   {
//     // _id: 'mocked_id_20',
//     removed: false,
//     name: 'MPS24/08/0020',
//     startDate: '2024-08-10T11:12:20.451000Z',
//     endDate: '2024-09-09T11:12:20.451000Z',
//     bom: '681f18935c90ef753dacc6ec',
//     machine: '681a3308cc9f22ee23782e03',
//     quantity: 400,
//     status: 'completed',
//     updated: '2024-08-10T11:12:57.894000Z',
//     created: '2024-08-10T11:12:57.894000Z',
//     __v: 0,
//   },
// ];

async function seedItems() {
  try {
    // console.log(entityList);

    // const model = 'ProductionSchedule';
    const Model = mongoose.model('ProductionSchedule');
    // // // console.log(appModelsList);
    await Model.insertMany(dumData);
    // await Model.updateMany(
    //   {}, // Match all documents
    //   { $rename: { qty: 'quantity' } }
    // );
    // const result = await Model.updateMany(
    //   { qty: { $exists: true } }, // Only update documents where 'qty' exists
    //   { $rename: { qty: 'quantity' } }
    // );

    // await Model.updateMany({ endDate: { $exists: true } }, [
    //   {
    //     $set: {
    //       date: {
    //         $dateSubtract: {
    //           startDate: '$endDate',
    //           unit: 'day',
    //           amount: 10,
    //         },
    //       },
    //     },
    //   },
    // ]);

    // console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy data', error);
  } finally {
    mongoose.connection.close();
  }
}

seedItems();
