const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('BillOfMaterial');

const updateBillOfMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, item, items } = req.body;

    // Find existing BOM
    const bom = await BillOfMaterial.findOne({ _id: id, removed: false });
    if (!bom) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Bill of Material not found',
      });
    }

    // Update fields if provided
    if (name !== undefined) bom.name = name;
    if (item !== undefined) bom.item = item;
    if (items !== undefined) {
      if (!Array.isArray(items)) {
        return res.status(400).json({
          success: false,
          message: 'items must be an array of { item, quantity }',
        });
      }
      console.log({ name, item, items });

      // Optional: validate each item object structure
      for (const entry of items) {
        if (!entry.item || typeof entry.quantity !== 'number') {
          return res.status(400).json({
            success: false,
            message: 'Each item must include item (ObjectId) and quantity (Number)',
          });
        }
      }

      bom.items = items;
    }

    bom.updated = Date.now();

    await bom.save();

    return res.status(200).json({
      success: true,
      result: bom,
      message: 'Bill of Material updated successfully',
    });
  } catch (error) {
    console.error('Error updating Bill of Material:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update Bill of Material',
    });
  }
};

module.exports = updateBillOfMaterial;
