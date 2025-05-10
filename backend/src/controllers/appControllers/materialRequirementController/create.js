// const mongoose = require('mongoose');

// const Model = mongoose.model('MaterialRequirement');

// const { calculate } = require('@/helpers');
// const { increaseBySettingKey } = require('@/middlewares/settings');
// const schema = require('./schemaValidate');

// const create = async (req, res) => {
//   let body = req.body;

//   // const { error, value } = schema.validate(body);
//   // if (error) {
//   //   const { details } = error;
//   //   return res.status(400).json({
//   //     success: false,
//   //     result: null,
//   //     message: details[0]?.message,
//   //   });
//   // }

//   // const { items = [], taxRate = 0, discount = 0 } = value;

//   // // default
//   // let subTotal = 0;
//   // let taxTotal = 0;
//   // let total = 0;

//   // //Calculate the items array with subTotal, total, taxTotal
//   // items.map((item) => {
//   //   let total = calculate.multiply(item['quantity'], item['price']);
//   //   //sub total
//   //   subTotal = calculate.add(subTotal, total);
//   //   //item total
//   //   item['total'] = total;
//   // });
//   // taxTotal = calculate.multiply(subTotal, taxRate / 100);
//   // total = calculate.add(subTotal, taxTotal);

//   // body['subTotal'] = subTotal;
//   // body['taxTotal'] = taxTotal;
//   // body['total'] = total;
//   // body['items'] = items;

//   // let paymentStatus = calculate.sub(total, discount) === 0 ? 'paid' : 'unpaid';

//   // body['paymentStatus'] = paymentStatus;
//   // body['createdBy'] = req.admin._id;
//   // const body = {
//   //   bom: '680e229552b4935757de2e03',
//   //   machine: '680e22356a596f802cee62a4',
//   //   qty: 20,
//   //   status: 'draft',
//   //   requestedDate: '2026-04-29T12:06:08.864Z',
//   // };

//   // Creating a new document in the collection
//   const result = await new Model(body).save();
//   const fileId = 'invoice-' + result._id + '.pdf';
//   const updateResult = await Model.findOneAndUpdate(
//     { _id: result._id },
//     { pdf: fileId },
//     {
//       new: true,
//     }
//   ).exec();
//   // Returning successfull response

//   increaseBySettingKey({
//     settingKey: 'last_invoice_number',
//   });

//   // Returning successfull response
//   return res.status(200).json({
//     success: true,
//     result: updateResult,
//     message: 'Material Requirement created successfully',
//   });
// };

// module.exports = create;

// const mongoose = require('mongoose');
// const BillOfMaterial = mongoose.model('BillOfMaterial');

// const create = async (req, res) => {
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
//       message: 'Material Requirement successfully created',
//     });
//   } catch (error) {
//     console.error('Error creating Material Requirement:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create Material Requirement',
//     });
//   }
// };

// module.exports = create;

const mongoose = require('mongoose');
const BillOfMaterial = mongoose.model('MaterialRequirement');
const Counter = mongoose.model('Counter');

const create = async (req, res) => {
  try {
    const { requestedDate, items } = req.body;

    if (!requestedDate || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Requested Date and items are required',
      });
    }

    // Generate name using Counter logic
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
    const name = `${prefix}/${paddedSeq}`;

    // Create and save the BOM
    const newBOM = new BillOfMaterial({
      name,
      requestedDate,
      items,
    });

    await newBOM.save();

    return res.status(201).json({
      success: true,
      result: newBOM,
      message: 'Material Requirement successfully created',
    });
  } catch (error) {
    console.error('Error creating Material Requirement:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Material Requirement',
    });
  }
};

module.exports = create;
