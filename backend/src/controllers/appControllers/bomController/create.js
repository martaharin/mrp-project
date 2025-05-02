const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('BillOfMaterial');

const createBillOfMaterial = async (req, res) => {
  try {
    const { name, items, createdBy } = req.body;

    if (!name || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Name and items are required',
      });
    }

    // Create a new BOM entry
    const newBOM = new BillOfMaterial({
      name,
      items,
      createdBy,
    });

    // Save the new BOM entry
    await newBOM.save();

    return res.status(201).json({
      success: true,
      result: newBOM,
      message: 'Bill of Material successfully created',
    });
  } catch (error) {
    console.error('Error creating Bill of Material:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Bill of Material',
    });
  }
};

module.exports = createBillOfMaterial;
