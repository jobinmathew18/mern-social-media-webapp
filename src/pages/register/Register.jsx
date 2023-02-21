import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate();
    
    const handleClick = async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("Password don't match.")
        }else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            }
            try {
                const res = await axios.post('/auth/register', user)
                console.log(res.data)
                navigate('/login')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleLogin = (e)=>{
        e.preventDefault()
        navigate('/login')
    }
    
  return ( 
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social
                </span>
            </div>
            <div className="loginRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="Username" required className='loginInput' ref={username}/>
                    <input type='email' placeholder="Email" required className='loginInput'ref={email}/>
                    <input type='password' placeholder="Password" required className='loginInput' ref={password}/>
                    <input type="password" placeholder="Password again" required className='loginInput' ref={passwordAgain}/>
                    <button className="registerButton" type='submit'>Sign Up</button>
                    <span className="registerForgot">Already a user?</span>
                     <button className="loginRegisterButton" onClick={handleLogin}>Log into account </button>
                </form>
            </div>
        </div>
    </div>
  )
}
