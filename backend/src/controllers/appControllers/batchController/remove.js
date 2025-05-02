const mongoose = require('mongoose');
const Batch = mongoose.model('Batch');

// Fungsi untuk menghapus (soft delete) batch berdasarkan ID
const removeBatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari batch berdasarkan ID
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found',
      });
    }

    // Soft delete batch dengan mengubah status 'removed' menjadi true
    batch.removed = true;
    batch.updated = Date.now(); // Update timestamp
    await batch.save();

    return res.status(200).json({
      success: true,
      message: 'Batch successfully removed',
    });
  } catch (error) {
    console.error('Error removing batch:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove batch',
    });
  }
};

// Fungsi untuk menghapus batch secara permanen berdasarkan ID
const permanentlyRemoveBatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari batch berdasarkan ID
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found',
      });
    }

    // Hapus batch secara permanen dari database
    await batch.remove();

    return res.status(200).json({
      success: true,
      message: 'Batch permanently removed',
    });
  } catch (error) {
    console.error('Error permanently removing batch:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to permanently remove batch',
    });
  }
};

module.exports = { removeBatch, permanentlyRemoveBatch };
