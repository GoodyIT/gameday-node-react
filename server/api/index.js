const express = require('express');
const stats = require('./stats');

const router = express.Router();

router.use('/stats', stats);

module.exports = router;
