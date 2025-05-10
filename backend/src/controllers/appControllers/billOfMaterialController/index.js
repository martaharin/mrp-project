const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const create = require('./create'); // Import the create function
const update = require('./update');
const read = require('./read');
const remove = require('./remove');
const summary = require('./summary');

function modelController() {
  const Model = mongoose.model('BillOfMaterial');
  const methods = createCRUDController('BillOfMaterial');

  methods.create = create; // Add create method here
  methods.update = update;
  methods.read = read;
  methods.remove = remove;
  methods.summary = (req, res) => summary(Model, req, res);
  return methods;
}

module.exports = modelController();
