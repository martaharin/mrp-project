const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const removeItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID is required',
      });
    }

    const removedItem = await Item.findOneAndUpdate(
      { _id: id, removed: false },
      { removed: true, updated: Date.now() },
      { new: true }
    );

    if (!removedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found or already removed',
      });
    }

    return res.status(200).json({
      success: true,
      result: removedItem,
      message: 'Item successfully removed',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove item',
    });
  }
};

module.exports = removeItem;
