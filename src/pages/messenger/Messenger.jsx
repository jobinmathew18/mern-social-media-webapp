import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([])
  const scrollRef = useRef()
  const socket = useRef()

  // currentChat && console.log(currentChat.member);
  // console.log(messages)
  // console.log(socket.current)

  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
    socket.current.on('getMessage', data=>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()  
      })  
    })
  }, []) 
 
  useEffect(()=>{
    arrivalMessage && 
    currentChat?.member.includes(arrivalMessage.sender) &&      //if currentChat has the sender id then only display the real time messages.
    setMessages((prev)=> [...prev, arrivalMessage])       //we could also write setMessages([...messages, arrivalMessage]) but then we have to add "messages" dependancy also.
  }, [arrivalMessage, currentChat])

  useEffect(()=>{ 
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', users=>{
      // console.log(users)    
      setOnlineUsers(users.map(ele=> ele.userId))       
    })      
  }, [user])  
  
  useEffect(() => {
    const getConversations = async () => { 
      try {
        const res = await axios.get("/conversations/" + user._id); //get all conversations of current user
        // console.log(res.data)
        setConversations(res.data);
      } catch (error) {
        console.log(error);    
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({           //scroll to end of a <div>
      behavior: "smooth"
    })
  }, [messages])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const message = {
      sender: user._id,
      text : newMessage,
      conversationId : currentChat._id
    }

    const recieverId = currentChat.member.find(member => member !== user._id)

    socket.current.emit('sendMessage', {
      senderId: user._id,
      recieverId,
      text: newMessage
    })

    try {
      const res = await axios.post('/messages', message)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Topbar /> 
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for Friends" 
              className="chatMenuInput"
            />
            {conversations.map((ele) => (
              <div onClick={() => setCurrentChat(ele)}>         {/*now each <Conversation> will have its own currentChat on every onClick */}
                {/* {console.log(ele)} */}
                <Conversation
                  key={ele._id}
                  conversation={ele}
                  currentUser={user}
                />  
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((ele) => (
                    <div ref={scrollRef}>
                      <Message key={ele._id} message={ele} own={ele.sender === user._id}/>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="Message..."
                    onChange={(e)=> setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button type="submit" className="chatSubmitButton">Send</button>
                </form>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>    {/*note: we are passing setCurrentChat as a prop and not currentChat. And we know setCurrentChat is a useState function */}
          </div>
        </div>
      </div>
    </>
  );
}
