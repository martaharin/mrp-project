const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('BillOfMaterial');

const updateBillOfMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items, enabled } = req.body;

    // Validasi jika ID BOM tidak ditemukan
    const bom = await BillOfMaterial.findOne({ _id: id, removed: false });
    if (!bom) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Bill of Material not found',
      });
    }

    // Update fields
    bom.name = name || bom.name;
    bom.items = items || bom.items;
    bom.enabled = enabled !== undefined ? enabled : bom.enabled;
    bom.updated = Date.now(); // Update timestamp

    // Simpan perubahan
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
