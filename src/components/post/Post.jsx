import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from "react-router-dom";

export default function Post({post}) {
  // console.log(post)
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.like)
  const [isliked, setIsliked] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const res = await axios.get(`/user?userId=${post.userId}`)
      // console.log(res)
      setUser(res.data)
    }
    fetchUsers()
  }, [post.userId])

  const likeHandler = ()=>{
    setLike(isliked ? like-1 : like+1)
    setIsliked(!isliked)
  }

 
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}><img className="postProfileImg" src={PF + user.profilePicture || PF + "person/noAvatar.png"} alt="" /></Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
            <span className="postText">{post?.desc}</span> 
            <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                <span className="postLikeCounter">{post.likes.length} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span> 
            </div>
        </div>
      </div>
    </div>
  );
}
