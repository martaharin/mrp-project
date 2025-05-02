const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID is required',
      });
    }

    // Tambahkan timestamp update
    updates.updated = Date.now();

    const updatedItem = await Item.findOneAndUpdate(
      { _id: id, removed: false },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found or already removed',
      });
    }

    return res.status(200).json({
      success: true,
      result: updatedItem,
      message: 'Item successfully updated',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update item',
    });
  }
};

module.exports = updateItem;
