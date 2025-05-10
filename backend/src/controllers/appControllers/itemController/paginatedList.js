const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Batch = mongoose.model('Batch');

const paginatedItemList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = (page - 1) * limit;

    const { sortBy = 'name', sortValue = 1, filter, equal } = req.query;

    const fieldsArray = req.query.fields ? req.query.fields.split(',') : [];
    const searchQuery = req.query.q || '';

    let searchFilter = {};

    if (fieldsArray.length > 0 && searchQuery) {
      searchFilter.$or = fieldsArray.map((field) => ({
        [field]: { $regex: new RegExp(searchQuery, 'i') },
      }));
    }

    const matchStage = {
      removed: false,
      ...(filter ? { [filter]: equal } : {}),
      ...searchFilter,
    };

    const aggregatePipeline = [
      { $match: matchStage },
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
          batches: 0,
        },
      },
      { $sort: { [sortBy]: parseInt(sortValue) } },
      { $skip: skip },
      { $limit: limit },
    ];

    const countPipeline = [{ $match: matchStage }, { $count: 'count' }];

    const [items, countResult] = await Promise.all([
      Item.aggregate(aggregatePipeline),
      Item.aggregate(countPipeline),
    ]);

    const count = countResult.length > 0 ? countResult[0].count : 0;
    const pages = Math.ceil(count / limit);

    const pagination = { page, pages, count };

    if (count > 0) {
      return res.status(200).json({
        success: true,
        result: items,
        pagination,
        message: 'Items successfully retrieved with total stock',
      });
    } else {
      return res.status(203).json({
        success: true,
        result: [],
        pagination,
        message: 'Collection is empty',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving items.',
    });
  }
};

module.exports = paginatedItemList;
