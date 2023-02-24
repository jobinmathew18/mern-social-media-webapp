const router = require('express').Router();
const Conversation = require('../models/Conversation')

//new conversation
router.post('/', async (req,res)=>{
    const newConversation = new Conversation({
        member: [req.body.senderId, req.body.recieverId]
    })
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(err)
    }
})

//get conversation of a user
router.get('/:userId', async(req,res)=>{
    try {
        const conversation = await Conversation.find({member: {$in: [req.params.userId]}})      //will find all the conversations that contain req.params.userId
        res.status(200).json(conversation) 
    } catch (error) {
        res.status(500).json(error) 
    }
})


//get conversation includes two userId
router.get('/find/:firstUserId/:secondUserId', async(req,res)=>{
    try {
        const conversation = await Conversation.findOne({member: { $all: [req.params.firstUserId, req.params.secondUserId]}});
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error) 
    }
})
module.exports = router