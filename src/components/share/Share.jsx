import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e)=>{
    e.preventDefault()
    const newPost = {
        userId: user._id,
        desc: desc.current.value
    }

    console.log("before: " +file)
    //upload post
    if(file){           
      console.log("after: "+file)                                
      const data = new FormData();
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.img = fileName                          //send post/image path in req.body
      console.log("data: " + data)
      console.log("fileName: " + fileName)
      try {
        await axios.post('/upload', data)             //upload post/image to api's public folder  
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }

    try {
        const res = await axios.post('/posts', newPost)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username}?`} 
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={()=> setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcons" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{display:"none"}}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcons" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcons" />
              <span className="shareOptionText">Locations</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcons" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          {/* whenever the below submit button is clicked then the onSubmit={submitHandler} will gets triggered.*/}
          <button className="shareButton" type="submit">Share</button>          
        </form>
      </div>
    </div>
  );
}
