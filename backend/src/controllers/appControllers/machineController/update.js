const mongoose = require('mongoose');
const Machine = mongoose.model('Machine');

const updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, item, enabled, removed } = req.body;

    const updatedFields = {
      updated: new Date(),
    };

    if (name !== undefined) updatedFields.name = name;
    if (capacity !== undefined) updatedFields.capacity = capacity;
    if (item !== undefined) updatedFields.item = item;
    if (enabled !== undefined) updatedFields.enabled = enabled;
    if (removed !== undefined) updatedFields.removed = removed;

    const updatedMachine = await Machine.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true }
    ).populate('item');

    if (!updatedMachine) {
      return res.status(404).json({
        success: false,
        message: 'Machine not found',
      });
    }

    return res.status(200).json({
      success: true,
      result: updatedMachine,
      message: 'Machine updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update machine',
    });
  }
};

module.exports = updateMachine;
