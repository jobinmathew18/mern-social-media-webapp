import React, { useContext, useEffect, useState } from "react";
import "./comments.css";
import { ArrowBackIosNewOutlined, SendOutlined } from "@mui/icons-material";
import Comment from "../comment/Comment";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Comments = ({ currentPost, setCommentOpen }) => {
  // console.log("current post is: " + currentPost);
  const [comment, setComment] = useState([])
  const [newComment, setnewComment] = useState("")
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/comments/${currentPost}`);
      setComment(res.data)
    };
    getComments()
  }, [currentPost]);

  const handleSubmit = async ()=>{
    const res = await axios.post('/comments/', {userId: user._id, postId: currentPost, comment: newComment})
    setComment([res.data, ...comment])
    setnewComment('')
  }

  const handleComment = () => {
    setCommentOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="commentsContainer">
      <div className="commentsWrapper">
        <div className="commentsInnerWrapper">
          <div className="commentsTop">
            <ArrowBackIosNewOutlined
              style={{ cursor: "pointer" }}
              onClick={handleComment}
            />
            <h3 className="commentsTitle">Comments</h3>
            <span className="commentsCounter">{comment.length}</span>
          </div>
          <div className="commentsMiddle">
              {comment.map((ele)=>(<Comment key={ele._id} comment={ele}/>))}
          </div>
          <div className="commnetsBottom">
            <input type="text" className="typeComment" placeholder="Add a comment..." onChange={(e)=> setnewComment(e.target.value)} value={newComment}/>
            {newComment && <SendOutlined style={{ cursor: "pointer" }} onClick={handleSubmit} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
