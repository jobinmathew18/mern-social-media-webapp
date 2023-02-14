const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')


//update a user
router.put('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){                  //if user tries to update password then generate a new secured password
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(err)
            }
        }
        
        //updating the updated data in database
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json("Account has been updated.")
        } catch (error) {
            return res.status(500).json(err)   
        }

    }else{
        return res.status(403).json({description:"You can update only your account"})
    }  
})
 
//delete a user
router.delete('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json({description:"You can delete only your account"})
    }
})

//get a user
router.get('/:id', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        // console.log(user._doc)                               //user._doc is basically our whole object
        const {password, updatedAt, ...other} = user._doc               
        res.status(200).json(other)                             //not GETTING password and updatedAt
    } catch (error) {
        return res.status(500).json(error)
    }
})

//unfollow a user
router.put('/:id/unfollow', async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}})
                await currentUser.updateOne({$pull:{following: req.params.id}})
                res.status(200).json({status:true, description:"unfollowed a user"})
            }else{
                res.status(403).json({description:"you dont follow this user"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json({description:"You cannot follow yourself"})
    }
})

//follow a user
router.put('/:id/follow', async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers: req.body.userId}})
                await currentUser.updateOne({$push:{following: req.params.id}})
                res.status(200).json({status:true, description:"Following a user"})
            }else{
                res.status(403).json({description:"you already follow this user"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json({description:"You cannot follow yourself"})
    }
})



module.exports = router