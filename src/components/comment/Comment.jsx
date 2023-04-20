import React, { useState } from "react";
import "./comment.css";
import { useEffect } from "react";
import axios from "axios";

const Comment = ({ comment }) => {
//   console.log(comment)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/user?userId=${comment.userId}`);
      setUser(res.data);
    };
    getUser();
  }, [comment.userId]);

  return (
    <div className="commentBox">
      <img
        src={
          user?.profilePicture
            ? PF + user?.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="commentImg"
      />
      <p className="comment"><span className="commentUsername">{user?.username}</span>  {comment.comment}</p>
    </div>
  );
};

export default Comment;
