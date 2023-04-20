import axios from "axios";

import {LoginStart, LoginSuccess, LoginFailure} from './context/AuthActions'

export const loginCall = async (userCredentials, dispatch)=>{
    dispatch(LoginStart());
    try {
        const res = await axios.post('/auth/login', userCredentials);
        dispatch(LoginSuccess(res.data))     
        const {_id} = res.data
        localStorage.setItem("userId", _id)
    } catch (error) {
        dispatch(LoginFailure(true))
    }
} 

