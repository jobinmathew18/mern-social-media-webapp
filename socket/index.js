const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []              //when you refresh the app, this page will not get refreshed. That means "users" array will still have the data in it even after 
                            //refershing  the whole app. This page will only refresh when you refresh server port 8900.

const addUser = (userId, socketId)=>{               //if userId exists in users array then dont add in it otherwise add.
    // console.log("SocketId: " + socketId)
    !users.some((user)=> user.userId === userId) && users.push({userId, socketId})
    // console.log(users)
} 

const getUser = (recieverId)=>{
    return users.find(user=> user.userId === recieverId)
}

const removerUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on("connection", (socket)=> {
    // console.log(socket.id)  
    console.log("a user connected.") 

    socket.on('addUser', userId=>{   
        // console.log("userId: " + userId)  
        addUser(userId, socket.id) 
        io.emit("getUsers", users)  
    })    

    //send and get message   
    socket.on('sendMessage', ({senderId, recieverId, text})=>{          //server recieving the message
        const user = getUser(recieverId)                //finding reciever's socket id and then emit to that particular reciever's socket id.
        io.to(user.socketId).emit("getMessage", {         //server sending back the recieved message to a particular socket id.       
            senderId, text
        })  
    }) 


    socket.on('disconnect', ()=>{                   //it is built in event. Whenever user disconnects, this event get triggered.
        console.log("a user disconnected")
        removerUser(socket.id);
        io.emit("getUsers", users)
    })
})   