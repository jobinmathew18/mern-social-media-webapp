const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')   
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comment')
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')
const multer = require('multer')                    //multer is a nodejs middleware for handling and uploading files.
const path = require('path')

dotenv.config()
require('./dbConn') 

//when you go to '/images' path, you will go to public/images directory.
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewares
app.use(cors())
app.use(express.json())
app.use(helmet()) 
app.use(morgan("common")) 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });     

app.use('/api/user', userRoute)  
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute ) 
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messageRoute)
app.use('/api/comments', commentRoute)

app.listen(8000, ()=>{
    console.log("Backend server running on port 8000")
})