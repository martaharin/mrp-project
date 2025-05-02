const mongoose = require('mongoose');
const Item = mongoose.model('Item');

exports.read = async (req, res) => {
  try {
    if (req.params.id) {
      const item = await Item.findOne({ _id: req.params.id, removed: false });
      return res.status(200).json(item);
    } else {
      const items = await Item.find({ removed: false });
      return res.status(200).json(items);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const result = await newItem.save();
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedItem);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { removed: true }, // soft delete
      { new: true }
    );
    return res.status(200).json(deletedItem);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
