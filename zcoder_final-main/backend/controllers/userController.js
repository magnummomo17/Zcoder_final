const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const getUser = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        res.json(user)
    }
    catch (err){
        res.status(500).json({message: err.message})
    } 
}

const getThisUser = async (req, res) => {
    const userId = req.params.id
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        res.json(user)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.login(username, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ username, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.signup(username, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ username, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getUser,
    getThisUser,
    signupUser,
    loginUser
}