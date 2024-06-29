const mongoose = require('mongoose')
const Saved = require('../models/savedModel')
const Qna = require('../models/qnaModel')
const User = require('../models/userModel')


const getSingleSaved = async (req, res) => {
    const userid = req.user._id;
    const { qnaid } = req.params;

    try {
        const saved = await Saved.findOne({ user_id: userid, qna_id: qnaid });

        if (!saved) {
            return res.status(200).json({ saved: false }); // No saved question found
        }

        res.status(200).json({ saved: true }); // Saved question found
    } catch (error) {
        console.error('Error fetching saved question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getSaved = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find saved documents for the user
        const savedDocuments = await Saved.find({ user_id: userId }).sort({ createdAt: -1 });

        if (!savedDocuments || savedDocuments.length === 0) {
            return res.status(404).json({ error: 'No Saved Ques' });
        }

        // Extract qna_id values
        const qnaIds = savedDocuments.map(doc => new mongoose.Types.ObjectId(doc.qna_id));

        // Find Qna documents that match these qna_id values
        const qnaDocuments = await Qna.find({ _id: { $in: qnaIds } });
        res.status(200).json(qnaDocuments);
    } catch (error) {
        console.error('Error fetching saved questions:', error);
        res.status(500).json({ error: 'Failed to fetch saved questions' });
    }
}

const postSaved=async(req,res)=>{
    const userid=req.user._id;
    const {qnaid}=req.body;
    try {


        const saved = await Saved.create({
            qna_id:qnaid,
            user_id:userid
        });

        res.status(200).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteSaved=async(req,res)=>{
    const userid=req.user._id;
    const{qnaid}=req.body;
    const qna=await Saved.findOneAndDelete({user_id:userid,qna_id:qnaid});
    if (!qna) { res.status(400).json({ error: 'No such qna exist' }) }

    res.status(200).json(qna)
}

module.exports={
    getSaved,postSaved,deleteSaved,getSingleSaved
}