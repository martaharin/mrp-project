const mongoose = require('mongoose');
const Machine = mongoose.model('Machine');

const removeMachine = async (req, res) => {
  try {
    const { id } = req.params;

    const machine = await Machine.findOne({ _id: id, removed: false });

    if (!machine) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Machine not found or already removed',
      });
    }

    machine.removed = true;
    machine.updated = Date.now();
    await machine.save();

    return res.status(200).json({
      success: true,
      result: machine,
      message: 'Machine successfully removed',
    });
  } catch (error) {
    console.error('Error removing machine:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove machine',
    });
  }
};

module.exports = removeMachine;
