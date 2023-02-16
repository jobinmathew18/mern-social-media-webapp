import './register.css'

export default function Register() {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social logo</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Social
                </span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input placeholder="Username" className='loginInput'/>
                    <input placeholder="Email" className='loginInput'/>
                    <input placeholder="Password" className='loginInput'/>
                    <input placeholder="Password again" className='loginInput'/>
                    <button className="loginButton">Sign Up</button>
                    <span className="registerForgot">Already a user?</span>
                    <button className="loginRegisterButton">Log into account </button>
                </div>
            </div>
        </div>
    </div>
  )
}
