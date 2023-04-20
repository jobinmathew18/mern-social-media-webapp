const LoginStart = () => ({
    type: 'LOGIN_START',
})

const LoginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
})

const LoginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error
})

const ChangePicture = (picture)=> ({
    type: 'CHANGE PICTURE',
    payload: picture
})


// console.log(LoginStart())
export { LoginStart, LoginSuccess, LoginFailure, ChangePicture};