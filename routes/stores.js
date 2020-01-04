const express = require('express');
const {
  getStores,
  addStore
} = require('../controllers/stores');

const router = express.Router();

// use 'getStore' middleware controller function for GET route
router.route('/').get(getStores).post(addStore);

module.exports = router;