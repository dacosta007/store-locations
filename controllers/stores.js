// @desc: Get all the stores
// @route: GET route (/api/v1/stores)
// @access: Public access (without authentication)

const Store = require('../models/Store');

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// @desc: Create a store
// @route: POST route (/api/v1/stores)
// @access: Public access (without authentication)
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);

    return res.status(200).json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error(err);
    // handles error message on 'storeId' duplicate
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'This store already exit'
      });
    }
    res.status(500).json({
      error: 'Server error'
    });
  }
};