import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({})
  const params = useParams()
  // console.log(params)       //on consoling, we get {username: name of user} because in app.js we gave given route for <Profile/> as "/profile/:username"

  useEffect(()=>{
    const fetchUsers = async()=>{
      const res = await axios.get(`/user?username=${params.username}`)
      // console.log(res)
      setUser(res.data)
      window.scrollTo(0, 0)
    }
    fetchUsers()
  }, [])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + user.coverPicture || PF + "person/noCover.png"}
                alt=""
              />
              <img className="profileUserImg" src={ PF + user.profilePicture || PF + "person/noAvatar.png" }  alt="" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed user username={params.username}/>
            <Rightbar user = {user}/>
          </div>
        </div>
      </div>
    </>
  );
}
