// controllers/profileController.js

const User = require('../models/userModel')

const search = async (req, res) => {
    try {
        const { searchTerm } = req.params;
        if (!searchTerm) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const user = await User.find({ username: searchTerm });
        if (user.length===0) {
            return res.status(404).json({ ok: false, error: 'Profile not found' });
        }

        res.status(200).json({ ok: true,user});
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: 'An error occurred while fetching the profile' });
    }
};

module.exports = { search };
