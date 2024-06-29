const Qna = require('../models/qnaModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const getQueries = async (req, res) => {
    const qnas = await Qna.find({ ispublic: true }).sort({ createdAt: -1 })
    res.status(200).json(qnas)
}

// get all qna
const getQnas = async (req, res) => {
    const user_id = req.user._id;
    const qnas = await Qna.find({ user_id, ispublic: false }).sort({ createdAt: -1 })

    res.status(200).json(qnas)
}

// get a single qna
const getAQna = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid object id' })
    }

    const qna = await Qna.findById(id)

    if (!qna) { res.status(404).json({ error: 'No such qna' }) }

    res.status(200).json(qna)
}


// create a qna
const createQna = async (req, res) => {
    const { title, rating, question, answer, ispublic } = req.body

    let emptyFields = []

    if (!title) { emptyFields.push('title') }
    if (!question) { emptyFields.push('question') }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'yo provide all the shit', emptyFields })
    }

    try {
        const user_id = req.user._id
        const useR = await User.findById(user_id)
        const username = useR.username
        const qna = await Qna.create({ title, rating, question, answer, ispublic, username, user_id })
        res.status(200).json(qna)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// deleting a qna
const deleteQna = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid object id' })
    }

    const qna = await Qna.findOneAndDelete({ _id: id })

    if (!qna) { res.status(400).json({ error: 'No such qna exist' }) }

    res.status(200).json(qna)
}

module.exports = {
    getQueries,
    createQna,
    getQnas,
    getAQna,
    deleteQna
}