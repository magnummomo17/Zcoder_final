const express = require('express');
const router = express.Router();
const { getContests } = require('../controllers/contestController');

// Route to get contests
router.get('/', getContests);

module.exports = router;
