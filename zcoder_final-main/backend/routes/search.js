const express = require('express')
const { search } = require('../controllers/searchController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

router.get('/:searchTerm', search)

module.exports = router;
