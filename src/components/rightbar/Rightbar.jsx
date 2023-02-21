import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  // console.log(user);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser} = useContext(AuthContext)   
  const [followed, setFollowed] = useState(false)

  useEffect(()=>{
    const test = async ()=>{
      const updatedUser = await axios.get('/user?username=' + currentUser.username)
      setFollowed(updatedUser.data.following.includes(user && user._id))           //if current user follows then set setFollowed as true.
      // console.log("following: " + updatedUser.data.following)  
    }
    test()
  }, [currentUser, user])   
  
  
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


  const handleClick = async ()=>{
    try {
      if(followed){
        const res = await axios.put(`/user/${user._id}/unfollow`, {userId: currentUser._id})
        console.log(res.data)
      }else{
        const res = await axios.put(`/user/${user._id}/follow`, {userId: currentUser._id})    
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed)
  }


  //inner components
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Jeswin Mathew</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((ele) => (
            <Online key={ele.id} user={ele} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const { city, from, relationship } = user;
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
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
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((ele) => { 
            return (
              <Link to={`/profile/${ele.username}`} style={{textDecoration:"none"} }>
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
      </>
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
