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
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  // {console.log(user)}
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login/>}></Route>
          <Route exact path="/profile/:username" element={<Profile />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={user ? <Home/> : <Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
