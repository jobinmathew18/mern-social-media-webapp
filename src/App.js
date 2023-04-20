import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import axios from "axios";
import { LoginSuccess } from "./context/AuthActions";

function App() {
  const {user, dispatch} = useContext(AuthContext)
  // {user && console.log(user.username)}  

  useEffect(()=>{
    const currentUser = localStorage.getItem("userId")
    const getCurrentUser = async ()=>{
      console.log("app.js rendering")
        const res = await axios(`/user?userId=${currentUser}`)
        dispatch(LoginSuccess(res.data)) 
    }
    currentUser && getCurrentUser()
}, [dispatch])

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login/>}></Route>
          <Route exact path="/profile/:username" element={user ?  <Profile /> : <Navigate to="/login" replace={true} />}></Route>
          <Route exact path="/register" element={<Register />}></Route> 
          <Route exact path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login />}></Route>
          <Route exact path="/messenger" element={!user ? <Navigate to="/login" replace={true} /> : <Messenger/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
