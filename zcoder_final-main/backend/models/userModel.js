const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function (username, email, password) {

    // validation
    if (!username || !email || !password) {
        throw Error('yo all fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('yo email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('yo this password is quite EASY')
    }
    if (!validator.matches(username, '^[a-zA-Z0-9_.-]*$')) 
        throw Error('yo type a valid username')


    const exists = await this.findOne({ email })
    const exists2 = await this.findOne({ username })

    if (exists) {
        throw Error('yo this email is already in use')
    }
    if (exists2) {
        throw Error('yo this username is already in use')
    }

    // hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash })

    return user;
}


// static login method
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('yo all fields must be filled')
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('yo incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('yo incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)