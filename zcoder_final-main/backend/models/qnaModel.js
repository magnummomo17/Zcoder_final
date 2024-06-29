const mongoose = require('mongoose')

const Schema = mongoose.Schema

const qnaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String
    },
    ispublic: {
        type: Boolean,
        default: false
    },
    username: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports =  mongoose.model('Qna', qnaSchema)