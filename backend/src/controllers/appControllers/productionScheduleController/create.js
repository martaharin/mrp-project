const mongoose = require('mongoose');
const ProductionSchedule = mongoose.model('ProductionSchedule');
const Counter = mongoose.model('Counter');

const create = async (req, res) => {
  try {
    const { startDate, endDate, bom, machine, quantity } = req.body;

    if (!startDate || !endDate || !bom || !machine) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'startDate, endDate, bom, and machine are required',
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Quantity must be at least 1',
      });
    }

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // e.g., "25"
    const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., "05"
    const prefix = `MPS${year}/${month}`;

    // Find or create the counter
    const counter = await Counter.findOneAndUpdate(
      { _id: prefix },
      { $inc: { seq: 1 }, $setOnInsert: { created: now } },
      { new: true, upsert: true }
    );

    const paddedSeq = String(counter.seq).padStart(4, '0'); // e.g., "0001"
    const name = `${prefix}/${paddedSeq}`; // Final schedule name

    // Create schedule with default 'draft' status
    const newSchedule = await new ProductionSchedule({
      name,
      startDate,
      endDate,
      bom,
      machine,
      quantity,
      status: 'draft',
    }).save();

    return res.status(201).json({
      success: true,
      result: newSchedule,
      message: 'Production Schedule created as draft',
    });
  } catch (error) {
    console.error('Error creating Production Schedule:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Production Schedule',
    });
  }
};

module.exports = create;
