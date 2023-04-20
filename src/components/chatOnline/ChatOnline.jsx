import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  // console.log(onlineUser)
  // console.log(setCurrentChat)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/user/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [onlineUsers]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => {
        return onlineUsers.includes(friend._id);
      })
    );
  }, [friends, onlineUsers]);

  // console.log(onlineFriends);

  const handleClick = async (user) => {
    try {
      let res = await axios.get(
        //fetching the conversation
        `/conversations/find/${currentId}/${user._id}`
      );

      if (!res.data) {
        const newConversation = await axios.post("/conversations/", {
          senderId: currentId,
          recieverId: user._id,
        });
        console.log(newConversation.data);
        res = await axios.get(
          //fetching the conversation
          `/conversations/find/${currentId}/${user._id}`
        );
      }
      if (res.data) {
        //changing the state of currentChat
        setCurrentChat(res.data); //since setCurrentChat usestate function is passed so we can also set the state value of currentChat from this file also using setCurrntChat.
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="chatOnline">
        {onlineFriends.map((online) => (
          <div
            className="chatOnlineFriend"
            onClick={() => {
              handleClick(online);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  online.profilePicture
                    ? PF + online.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <div className="chatOnlineName">{online.username}</div>
          </div>
        ))}
      </div>

      <div className="chatoffline">
        <h3 className="offlineFriends">Friends</h3>
        {friends.map((friend) => (
          <div
            className="chatOnlineFriend"
            onClick={() => {
              handleClick(friend);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="offlineFriendName">{friend.username}</div>
          </div>
        ))}
      </div>
    </>
  );
}
