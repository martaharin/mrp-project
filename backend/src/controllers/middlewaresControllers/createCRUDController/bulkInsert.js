const bulkInsert = async (Model, req, res) => {
  try {
    // Assuming req.body contains an array of documents to be inserted
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Request body must be an array of documents.',
      });
    }

    // Modify the documents if needed (e.g., setting 'removed' field to false)
    const modifiedDocuments = req.body.map((doc) => ({
      ...doc,
      removed: false,
    }));

    // Perform bulk insert
    const result = await Model.insertMany(modifiedDocuments);

    // Returning successful response
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully bulk inserted documents into Model.',
    });
  } catch (error) {
    // Error handling
    return res.status(500).json({
      success: false,
      message: 'An error occurred during the bulk insert.',
      error: error.message,
    });
  }
};

module.exports = bulkInsert;
