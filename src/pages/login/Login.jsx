import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom'


export default function Login() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  // console.log(user, isFetching, error);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(email.current.value)
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );      //passing dispatch and other values to loginCall() ie in apiCalls.js
  }

  console.log(user, isFetching, error)

  const handleRegister = (e)=>{
    e.preventDefault()
    navigate('/register')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social
          </span>
        </div>
        <div className="loginRight" >
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              ref={email}
              className="loginInput"
              // defaultValue="penny@gmail.com"
            />
            <input
              placeholder="Password"
              type="password"
              ref={password}
              className="loginInput"
              // defaultValue="penny"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton" onClick={handleRegister}>
              {isFetching ? (
                <CircularProgress color="inherit" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
