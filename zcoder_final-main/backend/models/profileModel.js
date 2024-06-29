const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    bio: {
        type: String,
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    username: {
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:null
    }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)