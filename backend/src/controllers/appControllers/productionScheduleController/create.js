const mongoose = require('mongoose');

const Model = mongoose.model('ProductionSchedule');
// const Invoice = mongoose.model('Invoice');

const { calculate } = require('@/helpers');
const { increaseBySettingKey } = require('@/middlewares/settings');
const schema = require('./schemaValidate');
const Item = require('@/models/appModels/Item');
const BillOfMaterial = require('@/models/appModels/BillOfMaterial');
const Batch = require('@/models/appModels/Batch');

const create = async (req, res) => {
  let body = req.body;

  // const { error, value } = schema.validate(body);
  // if (error) {
  //   const { details } = error;
  //   return res.status(400).json({
  //     success: false,
  //     result: null,
  //     message: details[0]?.message,
  //   });
  // }

  // const { items = [], taxRate = 0, discount = 0 } = value;

  // // default
  // let subTotal = 0;
  // let taxTotal = 0;
  // let total = 0;

  // //Calculate the items array with subTotal, total, taxTotal
  // items.map((item) => {
  //   let total = calculate.multiply(item['quantity'], item['price']);
  //   //sub total
  //   subTotal = calculate.add(subTotal, total);
  //   //item total
  //   item['total'] = total;
  // });
  // taxTotal = calculate.multiply(subTotal, taxRate / 100);
  // total = calculate.add(subTotal, taxTotal);

  // body['subTotal'] = subTotal;
  // body['taxTotal'] = taxTotal;
  // body['total'] = total;
  // body['items'] = items;

  // let paymentStatus = calculate.sub(total, discount) === 0 ? 'paid' : 'unpaid';

  // body['paymentStatus'] = paymentStatus;
  // body['createdBy'] = req.admin._id;

  // findOne({
  //   _id: req.body.invoice,
  //   removed: false,
  // });
  // const body = {
  //   bom: '680e229552b4935757de2e03',
  //   machine: '680e22356a596f802cee62a4',
  //   qty: 20, // quantity of finished product to produce
  //   status: 'draft',
  //   requestedDate: '2026-04-29T12:06:08.864Z',
  // };

  // // 1. Get BOM data
  // const bom = await BillOfMaterial.findById(body.bom).lean();
  // const itemIds = bom.items.map((i) => i.item);

  // // 2. Get available inventory for each item from Batch
  // // const batchData = await Batch.aggregate([
  // //   { $match: { item: { $in: ['680e1a1c3a690ed85d9ebf90'] } } },
  // //   // {
  // //   //   $group: {
  // //   //     _id: '$item',
  // //   //     totalQty: { $sum: '$qty' },
  // //   //   },
  // //   // },
  // // ]);
  // const batchData = await Batch.aggregate([
  //   {
  //     $match: {
  //       item: { $in: ['680e1a1c3a690ed85d9ebf90'] },
  //       removed: false,
  //       enabled: true,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: '$item',
  //       totalQty: { $sum: '$quantity' }, // use 'quantity' as defined in schema
  //     },
  //   },
  // ]);
  // // const results = await Batch.({
  // //   item: '680e1a1c3a690ed85d9ebf90',
  // // });
  // const batches = await Batch.find().lean();
  // console.log(batches);

  // console.log(results);

  // console.log(batchData);

  // const itemQtyMap = Object.fromEntries(batchData.map((b) => [b._id.toString(), b.totalQty]));

  // // 3. Enrich BOM items with requiredQty, availableQty, and isSufficient
  // const enrichedItems = bom.items.map((i) => {
  //   const itemIdStr = i.item.toString();

  //   const requiredQty = i.qty * body.qty; // total needed based on production qty
  //   const availableQty = itemQtyMap[itemIdStr] || 0;

  //   return {
  //     item: itemQtyMap,
  //     perUnitQty: i.qty,
  //     requiredQty,
  //     availableQty,
  //     isSufficient: availableQty >= requiredQty,
  //   };
  // });

  // console.log(enrichedItems);

  // const currentInvoice = await Item.find({ removed: false });
  // // Creating a new document in the collection
  const bom = await BillOfMaterial.findById('680e229552b4935757de2e09');
  if (!bom) throw new Error('BOM not found');

  const results = [];

  for (const bomItem of bom.items) {
    const itemId = bomItem.item._id;
    const requiredQty = bomItem.quantity;

    const batches = await Batch.find({
      item: itemId,
      removed: false,
      enabled: true,
      quantity: { $gt: 0 },
    }).sort({ expired: 1 }); // FEFO: earliest expiry first

    let remainingQty = requiredQty;
    const usedBatches = [];

    for (const batch of batches) {
      if (remainingQty <= 0) break;

      const usedQty = Math.min(batch.quantity, remainingQty);
      usedBatches.push({
        batchId: batch._id,
        usedQty,
        expired: batch.expired,
      });

      remainingQty -= usedQty;
    }

    results.push({
      itemId,
      itemName: bomItem.item.name,
      requiredQty,
      isEnough: remainingQty <= 0,
      usedBatches,
      shortage: remainingQty > 0 ? remainingQty : 0,
    });
  }

  //  return results;

  // const result = await new Model(body).save();
  // // const fileId = 'invoice-' + result._id + '.pdf';
  // const updateResult = await Model.findOneAndUpdate(
  //   { _id: result._id },
  //   { pdf: fileId },
  //   {
  //     new: true,
  //   }
  // ).exec();
  // // Returning successfull response

  // increaseBySettingKey({
  //   settingKey: 'last_invoice_number',
  // });

  // Returning successfull response
  return res.status(200).json({
    success: true,
    // res: enrichedItems,
    result: results,
    message: 'ProductionSchedule created successfully',
  });
};

module.exports = create;
