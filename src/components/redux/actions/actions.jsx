export const SIGN_IN_USER = "SIGN_IN_USER";


export const signInUser = (user) => {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}