import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

//our state before login
const INITIAL_STATE = {
    // user: {
    //     "_id": "63eb373db1bd1916312aece6",
    //     "username": "jobin",
    //     "email": "jobin@gmail.com",
    //     "profilePicture": "person/3.jpeg",
    //     "coverPicture": "",
    //     "followers": [],
    //     "following": [
    //         "63ea84b848d745e74cf25e54"
    //     ],
    //     "isAdmin": false,
    //     "createdAt": "2023-02-14T07:24:45.282Z", 
    //     "__v": 0
    // },
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=>{
        if(state.user){
            delete state.user['password']
        }
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])

    return (
        ///we are sharing all these "values" with the App (which is index.js) so that we can access these "values" from anywhere in the app.
        <AuthContext.Provider
            value={{
                user: state.user,                               //this state.user is returning from useReducer()
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {/* this children is basically used to wrap our applicaiton. Here we have wrapped our app in index.js file. */}
            {props.children}
        </AuthContext.Provider>
    )
}