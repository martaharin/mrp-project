const mongoose = require('mongoose');
const Item = mongoose.model('Item'); // Import the Item model

// The create function that will handle the logic of creating an item
const createItem = async (req, res) => {
  try {
    const {name, type } = req.body; // Extract necessary fields from the request

    // Validation
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: 'Name and type are required fields.',
      });
    }

    // Create a new Item
    const newItem = new Item({
      name,
      type,
    });

    // Save the new item to the database
    await newItem.save();

    return res.status(201).json({
      success: true,
      result: newItem,
      message: 'Item successfully created.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the item.',
    });
  }
};

module.exports = createItem;
