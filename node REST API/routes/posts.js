const router = require('express').Router();
const Post = require('../models/Posts')
const User = require('../models/User')


//create a post
router.post('/', async(req,res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json({status:true, savedPost})
    } catch (error) {
        res.status(500).json(error)
    }
})

//update a post
router.put('/:id', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json({status: true, description: "The post has been updated"})
        }else{
            res.status(403).json({description: "You can update only your posts."})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete a post
router.delete('/:id', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json({status: true, description: "The post has been deleted"})
        }else{
            res.status(403).json({description: "You can delete only your posts."})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//like-dislike a post
router.put('/:id/like', async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json({description: "Liked a post"})
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json({description: "disliked a post"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//get a post
router.get('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json({status: true, post})
    }
    catch(error){
        res.status(500).json(error)
    }
})

//get all posts of a user
router.get('/profile/:username', async(req,res)=>{
    try {
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({userId: user._id}).sort({"createdAt": -1})
        res.status(200).json(posts) 
    } catch (error) {
        res.status(500).json(error)
    }
})

//get timeline posts means get posts of users you follow
router.get('/timeline/:userId', async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})            //fetching posts of current user

        //get posts of users you follow
        //note: whenever you use map or any other loop you should use promise.all otherwise it's not going to fetch everything if you write await inside loop.
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId)=>{
                // console.log(friendId)
                return Post.find({userId: friendId}).sort({"createdAt": -1})
            })
        )

        // console.log(friendPosts)
        let test = userPosts.concat(...friendPosts)
        test = test.sort((a,b)=> b.createdAt - a.createdAt)                 //sorting in descending order so that timeline can viewed from latest posts.
        // console.log(test)
        res.status(200).json(test)
        // res.status(200).json(userPosts.concat(...friendPosts))
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router