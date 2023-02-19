import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//our state before login
const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = (props)=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider 
        value={{                                    //we are sharing all these "values" with the App (which is index.js) so that we can access these "values" from anywhere in the app.
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