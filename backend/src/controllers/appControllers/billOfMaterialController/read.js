const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('BillOfMaterial');

const readBillOfMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    // Find BOM by id or get all BOMs
    let query = {};
    if (id) {
      query = { _id: id, removed: false, enabled: true };
    } else {
      query = { removed: false, enabled: true };
    }

    const bom = id
      ? await BillOfMaterial.findOne(query).populate('item')
      : await BillOfMaterial.find(query).populate('item');

    if (!bom && id) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Bill of Material not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: bom,
      message: id ? 'Successfully fetched BOM' : 'Successfully fetched all BOMs',
    });
  } catch (error) {
    console.error('Error reading Bill of Material:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Bill of Material',
    });
  }
};

module.exports = readBillOfMaterial;
