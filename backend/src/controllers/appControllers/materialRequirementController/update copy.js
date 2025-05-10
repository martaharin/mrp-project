// const mongoose = require('mongoose');

// const Model = mongoose.model('MaterialRequirement');

// const custom = require('@/controllers/pdfController');

// const { calculate } = require('@/helpers');
// const schema = require('./schemaValidate');

// const update = async (req, res) => {
//   let body = req.body;

//   const { error, value } = schema.validate(body);
//   if (error) {
//     const { details } = error;
//     return res.status(400).json({
//       success: false,
//       result: null,
//       message: details[0]?.message,
//     });
//   }

//   const { items = [] } = req.body;

//   if (items.length === 0) {
//     return res.status(400).json({
//       success: false,
//       result: null,
//       message: 'Items cannot be empty',
//     });
//   }

//   // Find document by id and updates with the required fields

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

const mongoose = require('mongoose');
const Model = mongoose.model('MaterialRequirement');
const Batch = mongoose.model('Batch');

const custom = require('@/controllers/pdfController');
const { calculate } = require('@/helpers');
const schema = require('./schemaValidate');
const { generate: uniqueId } = require('shortid');

const update = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let body = req.body;
    const { error, value } = schema.validate(body);

    if (error) {
      const { details } = error;
      return res.status(400).json({
        success: false,
        result: null,
        message: details[0]?.message,
      });
    }

    const { items = [], status } = req.body;

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Items cannot be empty',
      });
    }

    // Fetch the existing MR
    // const existing = await Model.findById(req.params.id).session(session);
    // if (!existing) {
    //   await session.abortTransaction();
    //   return res.status(404).json({ success: false, message: 'MaterialRequirement not found' });
    // }

    // // If status is being updated to "completed"
    // if (status === 'completed' && existing.status !== 'completed') {
    //   for (const detail of items) {
    //     const { item, quantity } = detail;

    //     // Create a new batch for each item
    //     const batchName = uniqueId();
    //     const expiredDate = new Date();
    //     expiredDate.setMonth(expiredDate.getMonth() + 6); // Default expiry: 6 months

    //     const newBatch = new Batch({
    //       name: batchName,
    //       item,
    //       quantity,
    //       expired: expiredDate,
    //     });

    //     await newBatch.save({ session });
    //   }
    // }

    // Perform the update
    const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
      new: true,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      result,
      message: 'Material Requirement updated successfully',
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error updating MaterialRequirement:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update Material Requirement',
    });
  }
};

module.exports = update;
