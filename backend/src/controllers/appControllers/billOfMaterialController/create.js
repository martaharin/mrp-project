// const mongoose = require('mongoose');
// const BillOfMaterial = mongoose.model('BillOfMaterial');

// const createBillOfMaterial = async (req, res) => {
//   try {
//     const { name, items, createdBy } = req.body;

//     if (!name || !items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         result: null,
//         message: 'Name and items are required',
//       });
//     }

//     // Create a new BOM entry
//     const newBOM = new BillOfMaterial({
//       name,
//       items,
//       createdBy,
//     });

//     // Save the new BOM entry
//     await newBOM.save();

//     return res.status(201).json({
//       success: true,
//       result: newBOM,
//       message: 'Bill of Material successfully created',
//     });
//   } catch (error) {
//     console.error('Error creating Bill of Material:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create Bill of Material',
//     });
//   }
// };

// module.exports = createBillOfMaterial;

const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('BillOfMaterial');
const Counter = mongoose.model('Counter');

const createBillOfMaterial = async (req, res) => {
  try {
    const { item, items } = req.body;

    if (!item || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Item and items are required',
      });
    }

    // Generate name using Counter logic
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // e.g., "25"
    const month = String(now.getMonth() + 1).padStart(2, '0'); // "05"
    const prefix = `BOM${year}/${month}`;

    // Find or create the counter
    const counter = await Counter.findOneAndUpdate(
      { _id: prefix },
      { $inc: { seq: 1 }, $setOnInsert: { created: now } },
      { new: true, upsert: true }
    );

    const paddedSeq = String(counter.seq).padStart(4, '0'); // "0001"
    const name = `${prefix}/${paddedSeq}`; // e.g., BOM-25050001

    // Create and save the BOM
    const newBOM = new BillOfMaterial({
      name,
      item,
      items,
    });

    await newBOM.save();

    return res.status(201).json({
      success: true,
      result: newBOM,
      message: 'Bill of Material successfully created',
    });
  } catch (error) {
    console.error('Error creating Bill of Material:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Bill of Material',
    });
  }
};

module.exports = createBillOfMaterial;
