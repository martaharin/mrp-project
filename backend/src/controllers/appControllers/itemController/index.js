const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const createItem = require('./create'); //fungsi create
const readItem = require('./read'); // fungsi read
const updateItem = require('./update'); // fungsi update
const removeItem = require('./remove'); // fungsi remove
const summary = require('./summary');

const Item = mongoose.model('Item');

function modelController() {
  const Model = Item; // Set the Model to Item
  const methods = createCRUDController('Item');

  methods.create = createItem; // method read
  methods.read = readItem; 
  methods.update = updateItem;
  methods.delete = removeItem;
  methods.summary = (req, res) => summary(Model, req, res);
  return methods;
}

module.exports = modelController();
