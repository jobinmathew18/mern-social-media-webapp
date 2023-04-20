import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./online.css";

export default function Online({userId}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friend, setfriend] = useState([])

  useEffect(()=>{
    const getFriends = async ()=>{
      const res = await axios.get('/user?userId=' + userId);
      setfriend(res.data)
    }
    getFriends()
  },[userId])


  return (
    <>
    <Link to={`/profile/${friend.username}`} style={{textDecoration: "none", color:"black"}}>
      <li className="rightbarFriend" >
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={
              friend.profilePicture
                ? PF + friend.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt="user image"
          />
          {/* <span className="rightbarOnline"></span> */}
        </div>
        <span className="rightbarUserName">{friend.username}</span>
      </li>
    </Link> 
    </>
  );
}
