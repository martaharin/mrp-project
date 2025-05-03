const mongoose = require('mongoose');
const Batch = mongoose.model('Batch');

const createBatch = async (req, res) => {
  try {
    const { name, quantity, item, createdBy, expired } = req.body;

    // Validasi input
    if (!name || !quantity || !item || !createdBy || !expired) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Missing required fields (name, quantity, item, createdBy, expired)',
      });
    }

    // Cek apakah nama batch sudah ada (dan belum dihapus)
    const existing = await Batch.findOne({ name: name, removed: false });
    if (existing) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Batch name already exists',
      });
    }

    // Membuat batch baru
    const newBatch = new Batch({
      name,
      quantity,
      item,
      createdBy,
      expired,
    });

    // Simpan batch ke database
    await newBatch.save();

    return res.status(201).json({
      success: true,
      result: newBatch,
      message: 'Batch created successfully',
    });
  } catch (error) {
    console.error('Error creating batch:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create batch',
    });
  }
};

module.exports = createBatch;
