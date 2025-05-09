const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('BillOfMaterial');

const removeBillOfMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi apakah BOM dengan ID tersebut ada
    const bom = await BillOfMaterial.findOne({ _id: id, removed: false });
    if (!bom) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Bill of Material not found or already removed',
      });
    }

    // Update status 'removed' menjadi true
    bom.removed = true;
    bom.updated = Date.now(); // Update timestamp

    // Simpan perubahan
    await bom.save();

    return res.status(200).json({
      success: true,
      result: bom,
      message: 'Bill of Material removed successfully',
    });
  } catch (error) {
    console.error('Error removing Bill of Material:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove Bill of Material',
    });
  }
};

module.exports = removeBillOfMaterial;
