const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

//REGISTER
router.post('/register', async (req,res)=>{
    try {
        const {username, email, password} = req.body

        //generate secured password
        const salt = await bcrypt.genSalt(10);
        console.log("salt: " + salt)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("hashed password: " + hashedPassword)

        //new user
        const newUser = await new User({
            username, email, password:hashedPassword
        })
     
        //adding new user to database
        const user = await newUser.save();
        res.status(200).json({status:true, description:"signin success"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }    
})


//LOGIN
router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({status:false, description:"invalid credentials"})
        const comparePasswords = await bcrypt.compare(password, user.password)
        if(!comparePasswords) return res.status(404).json({status:false, description:"invalid credentials"})

        res.status(200).json({status:true, description:"login success"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router