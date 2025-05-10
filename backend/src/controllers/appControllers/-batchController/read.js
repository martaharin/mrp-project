const mongoose = require('mongoose');
const Batch = mongoose.model('Batch');

// Fungsi untuk membaca semua batch
const readAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find({ removed: false }).populate('item createdBy');
    return res.status(200).json({
      success: true,
      result: batches,
      message: 'Successfully retrieved all active batches',
    });
  } catch (error) {
    console.error('Error retrieving batches:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve batches',
    });
  }
};

// Fungsi untuk membaca batch berdasarkan ID
const readBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findById(id).populate('item createdBy');
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found',
      });
    }
    return res.status(200).json({
      success: true,
      result: batch,
      message: 'Successfully retrieved batch',
    });
  } catch (error) {
    console.error('Error retrieving batch by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve batch',
    });
  }
};

module.exports = { readAllBatches, readBatchById };
