const express = require('express');
const router = express.Router();
// const Details = require('../modals/details');
const insertData = require('../controller/insertData');
router.post('/', insertData);

module.exports = router;