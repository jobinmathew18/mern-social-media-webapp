const router = require('express').Router()
const Comment = require('../models/Comment')

//add a comment
router.post('/', async (req,res)=>{
    try {
        const comment = new Comment(req.body)
        const newComment = await comment.save()
        res.status(200).json(newComment)
    } catch (error) {
        res.status(500).json(error) 
    }
})

//delete a comment
router.delete('/:commentId', async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        // console.log(comment)
        if(comment.userId === req.body.userId){
            await Comment.findByIdAndDelete(req.params.commentId)
            res.status(200).json("comment deleted!")
        }else{
            res.status(403).json("You can delete only your comment!")
        }
    } catch (error) {
        res.status(500).json(error) 
    }
})

//get comments
router.get('/:postId', async(req,res)=>{
    try {
        const comments = await Comment.find({postId: req.params.postId})
        res.status(200).json(comments.sort(function (a, b) { return b.createdAt - a.createdAt }))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router