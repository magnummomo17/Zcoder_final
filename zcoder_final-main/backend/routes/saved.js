const express = require('express')
const { getSaved, postSaved, deleteSaved,getSingleSaved} = require('../controllers/savedController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

router.get('/', getSaved)


router.post('/', postSaved)
router.delete('/', deleteSaved)
router.get('/:qnaid',getSingleSaved)

module.exports = router;