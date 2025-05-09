const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const readItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Jika ada ID, cari satu item
    if (id) {
      const item = await Item.findOne({ _id: id, removed: false });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item not found',
        });
      }

      return res.status(200).json({
        success: true,
        result: item,
        message: 'Item successfully retrieved',
      });
    }

    // Jika tidak ada ID, ambil semua item (kecuali yang dihapus)
    const items = await Item.find({ removed: false });

    return res.status(200).json({
      success: true,
      result: items,
      message: 'Items successfully retrieved',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving items.',
    });
  }
};

module.exports = readItem;
