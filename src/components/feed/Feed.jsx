import './feed.css'
import Share from '../share/Share'
import Post  from '../post/Post'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({username}) {
  // console.log(username)
  const [posts, setPosts] = useState([]); 
  const {user} = useContext(AuthContext)

  useEffect(()=>{ 
    const fetchPosts = async ()=>{
      const res = username
      ? await axios.get('/posts/profile/' + username)
      : await axios.get('/posts/timeline/' + user._id) 
      setPosts(res.data)
    }
    fetchPosts()
  }, [username, user._id,])            //whenever the username change , re render the useEffect().
  

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {username ? username === user.username && <Share/> : <Share/>}
        {posts.map((ele)=>{
          return <Post key={ele._id} post={ele} />
        })}
       
      </div>
    </div>  
  ) 
}
