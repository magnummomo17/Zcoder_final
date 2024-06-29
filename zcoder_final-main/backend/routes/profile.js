const express = require('express')
const { updateProfile, getProfile, createProfile, getOtherProfile } = require('../controllers/profileController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

router.get('/', getProfile)


router.post('/', createProfile)
router.put('/', updateProfile)
router.get('/:usenam', getOtherProfile)

module.exports = router;