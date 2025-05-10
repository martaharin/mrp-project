// const mongoose = require('mongoose');
// const Item = mongoose.model('Item');

// const readItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Jika ada ID, cari satu item
//     if (id) {
//       const item = await Item.findOne({ _id: id, removed: false });

//       if (!item) {
//         return res.status(404).json({
//           success: false,
//           message: 'Item not found',
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         result: item,
//         message: 'Item successfully retrieved',
//       });
//     }

//     // Jika tidak ada ID, ambil semua item (kecuali yang dihapus)
//     const items = await Item.find({ removed: false });

//     return res.status(200).json({
//       success: true,
//       result: items,
//       message: 'Items successfully retrieved',
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: 'An error occurred while retrieving items.',
//     });
//   }
// };

// module.exports = readItem;

const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Batch = mongoose.model('Batch'); // Assuming Batch is also registered

const readItem = async (req, res) => {
  try {
    const { id } = req.params;

    // If ID is provided, find one item with total stock from Batch
    if (id) {
      const item = await Item.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id), removed: false } },
        {
          $lookup: {
            from: 'batches',
            localField: '_id',
            foreignField: 'item',
            as: 'batches',
          },
        },
        {
          $addFields: {
            stock: { $sum: '$batches.quantity' },
          },
        },
        {
          $project: {
            batches: 0, // Optional: remove raw batch data
          },
        },
      ]);

      if (!item || item.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Item not found',
        });
      }

      return res.status(200).json({
        success: true,
        result: item[0],
        message: 'Item successfully retrieved with total stock',
      });
    }

    // If no ID, get all items with total stock
    const items = await Item.aggregate([
      { $match: { removed: false } },
      {
        $lookup: {
          from: 'batches',
          localField: '_id',
          foreignField: 'item',
          as: 'batches',
        },
      },
      {
        $addFields: {
          stock: { $sum: '$batches.quantity' },
        },
      },
      {
        $project: {
          batches: 0, // Optional
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      result: items,
      message: 'Items successfully retrieved with total stock',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving items.',
    });
  }
};

module.exports = readItem;
