import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

export default function Rightbar({ user }) {
  // console.log(user?.username);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [newFollower, setnewFollower] = useState([])
  const [follower, setFollower] = useState(0)
  const [following, setFollowing] = useState(0)
  const [post, setPost] = useState(0)
    
  const cityType = useRef();
  const fromType = useRef();
  const relationshipType = useRef();
  const descType = useRef();
  
  // console.log(currentUser._id)

  useEffect(() => {
    const test = async () => {
      const updatedUser = await axios.get(
        "/user?username=" + currentUser?.username
      );
      setFollowed(updatedUser.data.following.includes(user && user._id)); //if current user follows then set setFollowed as true.
      // console.log("following: " + updatedUser.data.following)
      setnewFollower(updatedUser.data.following)
    };
    test();
  }, [currentUser, user]);

  useEffect(()=>{
    const currentProfile = async ()=>{
      const res = await axios.get(`/user?username=${user?.username}`)
      setFollower(res.data.followers.length)
      setFollowing(res.data.following.length)
      const posts =  await axios.get('/posts/profile/' + user?.username)
      setPost(posts.data.length)
    }
    user && currentProfile()
  }, [user, currentUser])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/user/friends/${user._id}`);
        // console.log(friendList.data);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    user && getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        const res = await axios.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        console.log(res.data);
        setFollower(prev=> prev-1)
      } else {
        const res = await axios.put(`/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        console.log(res.data);
        setFollower(prev=> prev+1)
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const togggleBtn = () => {
    document.querySelector(".editInfo").classList.toggle("active");
    document.querySelector(".rightbarInfo").classList.toggle("active");
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const updateInfo = {
      userId: currentUser._id, 
      city: cityType.current.value,
      from: fromType.current.value , 
      relationship: relationshipType.current.value , 
      desc: descType.current.value
    };

    try {
      const res = await axios.put(`/user/${currentUser._id}`, (updateInfo));
      console.log(res.data);
    } catch (error) { 
      console.log(error);
    }
  };
   
  //inner components
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Jeswin Mathew</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
          {newFollower.map((ele) => (
            <Online key={ele} userId={ele} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const { city, from, relationship, desc } = user;
    return (
      <div>
        <div className="followsContainer">
          <div className="folowsItem">
            {post} posts
          </div>
          <div className="folowsItem">
            {follower} followers
          </div>
          <div className="folowsItem">
            {following} following
          </div>
        </div>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <div className="userInformation">
          <div className="userInfoTopbar">
            <h4 className="rightbarTitle">About</h4>
            {user._id === currentUser._id && (
              <EditIcon className="editIcon" onClick={togggleBtn} />
            )}
          </div>
          <div className="editInfo ">
            <form onSubmit={handleSubmit}>
            <div className="userInfoItem">
                <label className="itemName">Bio:</label>
                <input ref={descType} className="itemText" type="text" defaultValue={desc}/>
              </div>
              <div className="userInfoItem">
                <label className="itemName">City:</label>
                <input ref={cityType} className="itemText" type="text" defaultValue={city}/>
              </div>
              <div className="userInfoItem">
                <label className="itemName">From:</label>
                <input ref={fromType} className="itemText" type="text" defaultValue={from}/>
              </div>
              <div className="userInfoItem">
                <label className="itemName">Relationship:</label>
                <input
                  ref={relationshipType}
                  className="itemText"
                  type="text"
                  defaultValue={relationship}
                />
              </div>
              <button className="rightbarFollowButton" type="submit">
                Save Edit
              </button>
            </form>
          </div>
          <div className="rightbarInfo">
            {city && (
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{city}</span> 
              </div>
            )}
            {from && (
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{from}</span>
              </div>
            )}
            {relationship && (
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{relationship}</span>
              </div>
            )}
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((ele) => {
            return (
              <Link
                to={`/profile/${ele.username}`}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      ele.profilePicture
                        ? PF + ele.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{ele.username}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* accessing the inner component */}
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
