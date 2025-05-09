const mongoose = require('mongoose');
const Machine = mongoose.model('Machine');

const readMachine = async (req, res) => {
  try {
    const { id } = req.params;

    let result;

    if (id) {
      result = await Machine.findOne({ _id: id, removed: false }).populate('item');
      if (!result) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'Machine not found',
        });
      }
    } else {
      result = await Machine.find({ removed: false }).populate('item');
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully retrieved machine(s)',
    });
  } catch (error) {
    console.error('Error reading machine:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve machine(s)',
    });
  }
};

module.exports = readMachine;
