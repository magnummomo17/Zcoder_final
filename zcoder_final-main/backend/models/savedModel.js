const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savedSchema = new Schema({
    qna_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Qna',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Saved', savedSchema)