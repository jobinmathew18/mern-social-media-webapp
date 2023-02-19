const AuthReducer = (state, action) => {
    // console.log("reducer: " + action.type, action.payload)
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default AuthReducer;