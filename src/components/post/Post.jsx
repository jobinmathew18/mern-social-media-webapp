import "./post.css";
import {
  FavoriteBorder,
  FavoriteOutlined,
  MoreVert,
  TextsmsOutlined,
} from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  // console.log(post._id)
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext); //setting {user: currentUser} because "user" already exists in this file.

  useEffect(() => {
    // console.log("useEffect render: ", isLiked)              //for every post it will render and every post will have its isLiked() boolean value.
    setIsLiked(post.likes.includes(currentUser._id)); //if the post is already liked by the current user , then set setLiked to true. And we know is in
    // console.log(post.likes)
  }, [currentUser._id, post.likes]); //likeHandler() the logic is setLike(isLiked ? like - 1 : like + 1);

  // console.log("after useEffect render: ", isLiked)

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      // console.log(res)
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  const likeHandler = async () => {
    // console.log(post._id, currentUser._id)
    try {
      const res = await axios.put(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
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
            {isLiked ? (
              <FavoriteOutlined className="liked" onClick={likeHandler} />
            ) : (
              <FavoriteBorder onClick={likeHandler}/>
            )}
            <TextsmsOutlined />
          </div>
          <div className="postBottomRight">
            <span className="postLikeCounter">{like} likes</span>
            <span className="postCommentText">View all 14 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
