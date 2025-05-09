const mongoose = require('mongoose');
const Batch = mongoose.model('Batch');

const updateBatch = async (req, res) => {
  try {
    const { id } = req.params; // Batch ID yang ingin diupdate
    const { name, quantity, item, enabled, removed } = req.body;

    // Validasi data yang diperlukan
    if (!name || !quantity || !item) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (name, quantity, item)',
      });
    }

    // Mencari Batch berdasarkan ID
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found',
      });
    }

    // Update batch dengan data baru
    batch.name = name;
    batch.quantity = quantity;
    batch.item = item;
    batch.enabled = enabled !== undefined ? enabled : batch.enabled; // Jika tidak diberikan, tetap menggunakan nilai sebelumnya
    batch.removed = removed !== undefined ? removed : batch.removed; // Jika tidak diberikan, tetap menggunakan nilai sebelumnya
    batch.updated = Date.now(); // Update waktu terakhir

    // Simpan perubahan batch
    await batch.save();

    return res.status(200).json({
      success: true,
      result: batch,
      message: 'Batch updated successfully',
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update batch',
    });
  }
};

module.exports = updateBatch;
