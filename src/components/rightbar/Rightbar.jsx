import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  // console.log(user);
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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

  const ProfileRightbar = ()=>{
    const {city, from, relationship} = user
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
         {city && <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{city}</span>
          </div>}
          {from && <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{from}</span>
          </div>}
          {relationship && <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{relationship}</span>
          </div>}
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing"> 
            <img src={`${PF}person/1.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jeswin Mathew</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jeswin Mathew</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/3.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jeswin Mathew</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/4.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jeswin Mathew</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/5.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jeswin Mathew</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/8.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Jeswin Mathew</span>
          </div>
        </div>

      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">

        {/* accessing the inner component */}
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
        
      </div>
    </div>
  );
}
