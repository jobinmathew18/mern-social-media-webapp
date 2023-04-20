import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Cancel, MoreVert } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { ChangePicture } from "../../context/AuthActions";

export default function Profile() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();
  const [editToggle, seteditToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState("");
  // console.log(params); //on consoling, we get {username: name of user} because in app.js we gave given route for <Profile/> as "/profile/:username"

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/user?username=${params.username}`);
      // console.log(res)
      setUser(res.data);
      window.scrollTo(0, 0);
    };
    fetchUsers();
  }, [params.username]);

  const handleChange = (type) => {
    setPicture(type);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
    };

    console.log("before: " + file);
    //upload post
    if (file) {
      console.log("after: " + file);
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      picture === "Profile Picture"
        ? (newPost.profilePicture = fileName)
        : (newPost.coverPicture = fileName); //send post/image path in req.body
      console.log("data: " + data);
      console.log("fileName: " + fileName);
      try {
        await axios.post("/upload", data); //upload post/image to api's public folder
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.put(`/user/${currentUser._id}`, newPost);
      const { userId, ...other } = newPost;
      dispatch(ChangePicture({ ...currentUser, ...other }));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="">
            {params.username === currentUser.username && 
              <div className="edit">
                <div className="editButton">
                  <MoreVert onClick={() => seteditToggle(!editToggle)} />
                </div>
              </div>
            }
            {editToggle && (
              <div className="editContainer">
                <ul className="editLists">
                  <label htmlFor="file">
                    <li
                      className="item"
                      onClick={() => handleChange("Profile Picture")}
                    >
                      Change Profile Photo
                    </li>
                    <li
                      className="item"
                      onClick={() => handleChange("Cover Picture")}
                    >
                      Change Cover Photo
                    </li>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </ul>
              </div>
            )}
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          {file && (
            <div className="container">
              <h3>Update {picture}</h3>
              <div className="shareImgContainer">
                <img
                  className="shareImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <Cancel
                  className="shareCancelImg"
                  onClick={() => setFile(null)}
                />
              </div>
              <button className="shareButton" onClick={submitHandler}>
                Set this image as {picture}
              </button>
            </div>
          )}
          <div className="profileRightBottom">
            <Feed user username={params.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
