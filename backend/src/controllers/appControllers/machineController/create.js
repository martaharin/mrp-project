const mongoose = require('mongoose');
const Machine = mongoose.model('Machine');

const createMachine = async (req, res) => {
  try {
    const { name, capacity, item } = req.body;

    if (!name || !capacity) {
      return res.status(400).json({
        success: false,
        message: 'Name and capacity are required',
      });
    }

    const newMachine = new Machine({
      name,
      capacity,
      item,
    });

    const savedMachine = await newMachine.save();

    return res.status(201).json({
      success: true,
      result: savedMachine,
      message: 'Machine created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create machine',
    });
  }
};

module.exports = createMachine;
