const mongoose = require('mongoose')

const Qna = require('../models/qnaModel')
const Comments = require('../models/commentsModel')
const User = require('../models/userModel')

const addAComment = async (req, res) => {
    const user_id = req.user._id
    const quesId = req.params.id
    const { comment } = req.body

    if (!mongoose.Types.ObjectId.isValid(quesId)) {
        return res.status(404).json({ error: 'Not a valid object id' })
    }
    const qna = await Qna.findById({ _id: quesId })
    if (!qna) { res.status(404).json({ error: 'No such qna' }) }

    try {
        const useR = await User.findById(user_id)
        const username = useR.username
        const newComment = await Comments.create({ quesId, comment, username })
        res.status(200).json(newComment)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getComments = async (req, res) => {
    const quesId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(quesId)) {
        return res.status(404).json({ error: 'Not a valid object id' })
    }
    const qna = await Qna.findById({ _id: quesId })
    if (!qna) { res.status(404).json({ error: 'No such qna' }) }
    const comments = await Comments.find({quesId})
    res.status(200).json(comments)
}


module.exports = {
    addAComment,
    getComments
}