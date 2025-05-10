// const mongoose = require('mongoose');

// const Model = mongoose.model('ProductionSchedule');

// const custom = require('@/controllers/pdfController');

// const { calculate } = require('@/helpers');
// const schema = require('./schemaValidate');

// const update = async (req, res) => {
//   let body = req.body;

//   const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
//     new: true, // return the new result instead of the old one
//   }).exec();

//   // Returning successfull response

//   return res.status(200).json({
//     success: true,
//     result,
//     message: 'we update this document ',
//   });
// };

// module.exports = update;

const Counter = require('@/models/appModels/Counter');
const mongoose = require('mongoose');
const Model = mongoose.model('ProductionSchedule');
const BillOfMaterial = mongoose.model('BillOfMaterial');
const Batch = mongoose.model('Batch');
const MaterialRequirement = mongoose.model('MaterialRequirement');

const update = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { status, ...rest } = req.body;
    const id = req.params.id;

    // Get current schedule
    const existing = await Model.findById(id).session(session);
    if (!existing) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: 'ProductionSchedule not found' });
    }

    // If changing status to 'submitted', run FEFO + MR logic
    if (status === 'submitted' && existing.status !== 'submitted') {
      const bomDoc = await BillOfMaterial.findById(existing.bom).session(session);
      if (!bomDoc) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: 'BOM not found' });
      }

      const quantity = existing.quantity;
      const shortfalls = [];

      // Inventory checking
      for (const detail of bomDoc.items) {
        const totalNeeded = detail.quantity * quantity;
        let available = 0;

        const batches = await Batch.find({
          item: detail.item._id,
          removed: false,
          enabled: true,
          quantity: { $gt: 0 },
          expired: { $gt: new Date() },
        })
          .sort({ expired: 1 })
          .session(session);

        for (const batch of batches) {
          available += batch.quantity;
          if (available >= totalNeeded) break;
        }

        if (available < totalNeeded) {
          shortfalls.push({
            item: detail.item._id,
            quantity: totalNeeded - available,
          });
        }
      }

      if (shortfalls.length > 0) {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); // e.g., "25"
        const month = String(now.getMonth() + 1).padStart(2, '0'); // "05"
        const prefix = `MR${year}/${month}`;

        // Find or create the counter
        const counter = await Counter.findOneAndUpdate(
          { _id: prefix },
          { $inc: { seq: 1 }, $setOnInsert: { created: now } },
          { new: true, upsert: true }
        );

        const paddedSeq = String(counter.seq).padStart(4, '0'); //
        const mrName = `${prefix}/${paddedSeq}`;

        const materialRequirement = new MaterialRequirement({
          requestedDate: now,
          name: mrName,
          items: shortfalls,
          status: 'draft',
        });

        await materialRequirement.save({ session });
        await session.commitTransaction();
        session.endSession();

        return res.status(400).json({
          success: false,
          result: materialRequirement,
          message:
            'Inventory insufficient. Material Requirement ' +
            materialRequirement.name +
            ' created instead.',
        });
      }

      // Deduct from batch (FEFO)
      for (const detail of bomDoc.items) {
        const totalNeeded = detail.quantity * quantity;
        let remaining = totalNeeded;

        const batches = await Batch.find({
          item: detail.item._id,
          removed: false,
          enabled: true,
          quantity: { $gt: 0 },
          expired: { $gt: new Date() },
        })
          .sort({ expired: 1 })
          .session(session);

        for (const batch of batches) {
          if (remaining <= 0) break;

          const deductQty = Math.min(batch.quantity, remaining);
          batch.quantity -= deductQty;
          remaining -= deductQty;
          await batch.save({ session });
        }
      }
    }

    // Update schedule with new values
    const result = await Model.findOneAndUpdate(
      { _id: id, removed: false },
      { ...rest, ...(status ? { status } : {}) },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      result,
      message: 'Production Schedule updated successfully',
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error updating Production Schedule:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update Production Schedule',
    });
  }
};

module.exports = update;
