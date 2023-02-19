import './feed.css'
import Share from '../share/Share'
import Post  from '../post/Post'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Feed({username}) {
  // console.log(username)
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = username
      ? await axios.get('/posts/profile/' + username)
      : await axios.get('posts/timeline/63eb373db1bd1916312aece6')
      // console.log(res.data)
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])            //whenever the username change , re render the useEffect().

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map((ele)=>{
          return <Post key={ele._id} post={ele} />
        })}
      </div>
    </div>
  ) 
}
