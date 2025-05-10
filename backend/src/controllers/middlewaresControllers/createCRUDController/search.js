// const search = async (Model, req, res) => {
//   // console.log(req.query.fields)
//   // if (req.query.q === undefined || req.query.q.trim() === '') {
//   //   return res
//   //     .status(202)
//   //     .json({
//   //       success: false,
//   //       result: [],
//   //       message: 'No document found by this request',
//   //     })
//   //     .end();
//   // }
//   const fieldsArray = req.query.fields ? req.query.fields.split(',') : ['name'];

//   const fields = { $or: [] };

//   for (const field of fieldsArray) {
//     fields.$or.push({ [field]: { $regex: new RegExp(req.query.q, 'i') } });
//   }
//   // console.log(fields)

//   let results = await Model.find({
//     ...fields,
//   })

//     .where('removed', false)
//     .limit(20)
//     .exec();

//   if (results.length >= 1) {
//     return res.status(200).json({
//       success: true,
//       result: results,
//       message: 'Successfully found all documents',
//     });
//   } else {
//     return res
//       .status(202)
//       .json({
//         success: false,
//         result: [],
//         message: 'No document found by this request',
//       })
//       .end();
//   }
// };

// module.exports = search;

const search = async (Model, req, res) => {
  try {
    const fieldsArray = req.query.fields ? req.query.fields.split(',') : ['name'];
    const keyword = req.query.q || '';

    const fields = { $or: [] };
    for (const field of fieldsArray) {
      fields.$or.push({ [field]: { $regex: new RegExp(keyword, 'i') } });
    }

    // Parse filter from query, if available
    let filter = {};
    if (req.query.filter) {
      try {
        // Try to parse if it's a JSON string
        if (typeof req.query.filter === 'string') {
          filter = JSON.parse(req.query.filter);
        } else {
          filter = req.query.filter; // already an object (e.g., from frontend)
        }
      } catch (e) {
        return res.status(400).json({
          success: false,
          result: [],
          message: 'Invalid filter format. Ensure it is valid JSON.',
        });
      }
    }

    // Combine search and filter
    const results = await Model.find({
      ...fields,
      ...filter,
      removed: false,
    })
      .limit(20)
      .exec();

    if (results.length >= 1) {
      return res.status(200).json({
        success: true,
        result: results,
        message: 'Successfully found all documents',
      });
    } else {
      return res.status(202).json({
        success: false,
        result: [],
        message: 'No document found by this request',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      result: [],
      message: 'Server error during search',
    });
  }
};

module.exports = search;
