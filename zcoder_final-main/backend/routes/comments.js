const express = require('express')
const {
    addAComment,
    getComments
} = require('../controllers/commentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/:id', getComments)

router.use(requireAuth)

router.post('/:id', addAComment)


module.exports = router