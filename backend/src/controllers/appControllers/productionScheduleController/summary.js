const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('ProductionSchedule');

const { loadSettings } = require('@/middlewares/settings');

const summary = async (req, res) => {
  let defaultType = 'month';

  const { type } = req.query;

  const settings = await loadSettings();

  if (type) {
    if (['week', 'month', 'year'].includes(type)) {
      defaultType = type;
    } else {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid type',
      });
    }
  }

  const currentDate = moment();
  let startDate = currentDate.clone().startOf(defaultType);
  let endDate = currentDate.clone().endOf(defaultType);

  const statuses = ['draft', 'scheduled', 'finished', 'cancelled', 'on process'];

  // const response = await Model.aggregate([
  //   {
  //     $match: {
  //       removed: false,
  //       // date: {
  //       //   $gte: startDate.toDate(),
  //       //   $lte: endDate.toDate(),
  //       // },
  //     },
  //   },
  //   {
  //     $facet: {
  //       totalInvoice: [
  //         {
  //           $group: {
  //             _id: null,
  //             total: {
  //               $sum: '$total',
  //             },
  //             count: {
  //               $sum: 1,
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 0,
  //             total: '$total',
  //             count: '$count',
  //           },
  //         },
  //       ],
  //       statusCounts: [
  //         {
  //           $group: {
  //             _id: '$status',
  //             count: {
  //               $sum: 1,
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 0,
  //             status: '$_id',
  //             count: '$count',
  //           },
  //         },
  //       ],
  //       paymentStatusCounts: [
  //         {
  //           $group: {
  //             _id: '$paymentStatus',
  //             count: {
  //               $sum: 1,
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 0,
  //             status: '$_id',
  //             count: '$count',
  //           },
  //         },
  //       ],
  //       tes: [
  //         {
  //           $match: {
  //             status: 'finished',
  //           },
  //         },
  //         {
  //           $group: {
  //             _id: '$bom',
  //             count: {
  //               $sum: 1,
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 0,
  //             bom: '$_id',
  //             count: '$count',
  //           },
  //         },
  //       ],
  //     },
  //   },
  // ]);
  // const response = await Model.aggregate([
  //   // {
  //   //   $match: {
  //   //     removed: false,
  //   //     status: 'finished',
  //   //   },
  //   // },
  //   {
  //     $group: {
  //       _id: '$bom', // Group by the `bom` ObjectId
  //       totalQty: { $sum: '$qty' }, // Sum the `qty` for each BillOfMaterial
  //       count: { $sum: 1 }, // Optional: count how many invoices per BillOfMaterial
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'billofmaterials', // Make sure this matches your collection name (usually lowercase plural)
  //       localField: '_id',
  //       foreignField: '_id',
  //       as: 'bomDetails',
  //     },
  //   },
  //   // {
  //   //   $unwind: '$bomDetails', // Turn the array into a single object
  //   // },
  //   {
  //     $project: {
  //       _id: 0,
  //       bom: '$bomDetails', // Include BillOfMaterial details
  //       totalQty: 1,
  //       count: 1,
  //     },
  //   },
  // ]);
  // const response = await Model.aggregate([
  //   {
  //     $match: {
  //       removed: false,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: '$status',
  //       invoices: { $push: '$$ROOT' }, // Collect full documents into an array
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       status: '$_id',
  //       invoices: 1,
  //     },
  //   },
  // ]);

  // let result = [];

  // const totalInvoices = response[0].totalInvoice ? response[0].totalInvoice[0] : 0;
  // const statusResult = response[0].statusCounts || [];
  // const paymentStatusResult = response[0].paymentStatusCounts || [];
  // const overdueResult = response[0].overdueCounts || [];

  // const statusResultMap = statusResult.map((item) => {
  //   return {
  //     ...item,
  //     percentage: Math.round((item.count / totalInvoices.count) * 100),
  //   };
  // });

  // const paymentStatusResultMap = paymentStatusResult.map((item) => {
  //   return {
  //     ...item,
  //     percentage: Math.round((item.count / totalInvoices.count) * 100),
  //   };
  // });

  // const overdueResultMap = overdueResult.map((item) => {
  //   return {
  //     ...item,
  //     status: 'overdue',
  //     percentage: Math.round((item.count / totalInvoices.count) * 100),
  //   };
  // });

  // statuses.forEach((status) => {
  //   const found = [...paymentStatusResultMap, ...statusResultMap, ...overdueResultMap].find(
  //     (item) => item.status === status
  //   );
  //   if (found) {
  //     result.push(found);
  //   }
  // });

  // const unpaid = await Model.aggregate([
  //   {
  //     $match: {
  //       removed: false,

  //       // date: {
  //       //   $gte: startDate.toDate(),
  //       //   $lte: endDate.toDate(),
  //       // },
  //       paymentStatus: {
  //         $in: ['unpaid', 'partially'],
  //       },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: null,
  //       total_amount: {
  //         $sum: {
  //           $subtract: ['$total', '$credit'],
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       total_amount: '$total_amount',
  //     },
  //   },
  // ]);

  // const finalResult = {
  //   total: totalInvoices?.total,
  //   total_undue: unpaid.length > 0 ? unpaid[0].total_amount : 0,
  //   type,
  //   performance: result,
  // };
  const bomId = new mongoose.Types.ObjectId('680e229552b4935757de2e03');
  const groupedData = await Model.aggregate([
    {
      $match: {
        removed: false,
        status: 'finished',
        bom: bomId,
      },
    },
    {
      $group: {
        _id: {
          bom: '$bom',
          status: '$status',
          month: {
            $dateToString: { format: '%Y-%m', date: '$requestedDate' },
          },
        },
        total: { $sum: '$qty' },
        invoices: { $push: '$$ROOT' },
      },
    },
    {
      $sort: {
        '_id.month': 1, // Descending order
      },
    },
  ]);

  // ✅ Transform to: { bomId: { status: { month: [invoices] } } }
  const result = groupedData;

  for (const group of groupedData) {
    const { bom, status, month } = group._id;

    if (!result[bom]) {
      result[bom] = {};
    }

    if (!result[bom][status]) {
      result[bom][status] = {};
    }

    if (!result[bom][status][month]) {
      result[bom][status][month] = [];
    }

    result[bom][status][month].push(...group.invoices);
  }

  // console.log(result);

  return res.status(200).json({
    success: true,
    result,
    // result: { ...finalResult, ...response },
    message: `Successfully found all invoices for the last ${defaultType}`,
  });
};

module.exports = summary;
