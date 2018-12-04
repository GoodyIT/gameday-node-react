const express = require('express');
const { getTableData } = require('../controllers/filter');

const router = express.Router();

router.post('/table', getTableData);

module.exports = router;
