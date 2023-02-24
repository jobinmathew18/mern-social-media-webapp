import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
  // console.log(message.sender)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [senderInfo, setSenderInfo] = useState(null)

  useEffect(()=>{
    const sender = async()=>{
      const res = await axios.get('/user?userId='+ message.sender)
      setSenderInfo(res.data)
    }
    sender()
  }, [message.sender])

  // console.log(senderInfo)
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            senderInfo && senderInfo.profilePicture
              ? PF + senderInfo.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
