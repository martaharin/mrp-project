// const mongoose = require('mongoose');
// const moment = require('moment');

const ProductionSchedule = require('@/models/appModels/ProductionSchedule');
const { default: mongoose } = require('mongoose');

// const Model = mongoose.model('Invoice');

// const { loadSettings } = require('@/middlewares/settings');

// const summary = async (req, res) => {
//   let defaultType = 'month';

//   const { type } = req.query;

//   const settings = await loadSettings();

//   if (type) {
//     if (['week', 'month', 'year'].includes(type)) {
//       defaultType = type;
//     } else {
//       return res.status(400).json({
//         success: false,
//         result: null,
//         message: 'Invalid type',
//       });
//     }
//   }

//   const currentDate = moment();
//   let startDate = currentDate.clone().startOf(defaultType);
//   let endDate = currentDate.clone().endOf(defaultType);

//   const statuses = ['draft', 'pending', 'overdue', 'paid', 'unpaid', 'partially'];

//   const response = await Model.aggregate([
//     {
//       $match: {
//         removed: false,
//         // date: {
//         //   $gte: startDate.toDate(),
//         //   $lte: endDate.toDate(),
//         // },
//       },
//     },
//     {
//       $facet: {
//         totalInvoice: [
//           {
//             $group: {
//               _id: null,
//               total: {
//                 $sum: '$total',
//               },
//               count: {
//                 $sum: 1,
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               total: '$total',
//               count: '$count',
//             },
//           },
//         ],
//         statusCounts: [
//           {
//             $group: {
//               _id: '$status',
//               count: {
//                 $sum: 1,
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               status: '$_id',
//               count: '$count',
//             },
//           },
//         ],
//         paymentStatusCounts: [
//           {
//             $group: {
//               _id: '$paymentStatus',
//               count: {
//                 $sum: 1,
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               status: '$_id',
//               count: '$count',
//             },
//           },
//         ],
//         overdueCounts: [
//           {
//             $match: {
//               expiredDate: {
//                 $lt: new Date(),
//               },
//             },
//           },
//           {
//             $group: {
//               _id: '$status',
//               count: {
//                 $sum: 1,
//               },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               status: '$_id',
//               count: '$count',
//             },
//           },
//         ],
//       },
//     },
//   ]);

//   let result = [];

//   const totalInvoices = response[0].totalInvoice ? response[0].totalInvoice[0] : 0;
//   const statusResult = response[0].statusCounts || [];
//   const paymentStatusResult = response[0].paymentStatusCounts || [];
//   const overdueResult = response[0].overdueCounts || [];

//   const statusResultMap = statusResult.map((item) => {
//     return {
//       ...item,
//       percentage: Math.round((item.count / totalInvoices.count) * 100),
//     };
//   });

//   const paymentStatusResultMap = paymentStatusResult.map((item) => {
//     return {
//       ...item,
//       percentage: Math.round((item.count / totalInvoices.count) * 100),
//     };
//   });

//   const overdueResultMap = overdueResult.map((item) => {
//     return {
//       ...item,
//       status: 'overdue',
//       percentage: Math.round((item.count / totalInvoices.count) * 100),
//     };
//   });

//   statuses.forEach((status) => {
//     const found = [...paymentStatusResultMap, ...statusResultMap, ...overdueResultMap].find(
//       (item) => item.status === status
//     );
//     if (found) {
//       result.push(found);
//     }
//   });

//   const unpaid = await Model.aggregate([
//     {
//       $match: {
//         removed: false,

//         // date: {
//         //   $gte: startDate.toDate(),
//         //   $lte: endDate.toDate(),
//         // },
//         paymentStatus: {
//           $in: ['unpaid', 'partially'],
//         },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         total_amount: {
//           $sum: {
//             $subtract: ['$total', '$credit'],
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         total_amount: '$total_amount',
//       },
//     },
//   ]);

//   const finalResult = {
//     total: totalInvoices?.total,
//     total_undue: unpaid.length > 0 ? unpaid[0].total_amount : 0,
//     type,
//     performance: result,
//   };

//   return res.status(200).json({
//     success: true,
//     result: finalResult,
//     message: `Successfully found all invoices for the last ${defaultType}`,
//   });
// };

// module.exports = summary;

// const ProductionSchedule = require('../models/ProductionSchedule');

const summary = async (req, res) => {
  try {
    const { item } = req.query;

    if (!item) {
      return res.status(400).json({ error: 'item is required' });
    }

    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    const result = await ProductionSchedule.aggregate([
      // Join to get BOM and its item
      {
        $lookup: {
          from: 'billofmaterials',
          localField: 'bom',
          foreignField: '_id',
          as: 'bom',
        },
      },
      { $unwind: '$bom' },

      // Filter by bom.item
      {
        $match: {
          'bom.item': new mongoose.Types.ObjectId(item),
          removed: false,
          // status: { $ne: 'cancelled' },
          status: 'completed',
          startDate: { $gte: new Date(lastYear) },
        },
      },

      // Group by year-month and sum quantity
      {
        $group: {
          _id: {
            year: { $year: '$startDate' },
            month: { $month: '$startDate' },
          },
          total: { $sum: '$quantity' },
        },
      },

      // Sort by year-month ascending
      { $sort: { '_id.year': 1, '_id.month': 1 } },

      // Format the result
      {
        $project: {
          _id: 0,
          month: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month',
                  day: 1,
                },
              },
            },
          },
          total: 1,
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      result,
      message: 'Production Schedule created as draft',
    });
  } catch (error) {
    console.error('Error getting Production Schedule:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get Production Schedule',
    });
  }
};

module.exports = summary;
