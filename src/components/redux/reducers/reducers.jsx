import { SIGN_IN_USER } from "../actions/actions"

const initialState = {
    isAuthenticated: !!JSON.parse(localStorage.getItem("user"))?.token,
    id: null,
    firstName: null,
    lastName: null, 
    phoneNumber: null,
    email: null,
    roles: [],
    token: JSON.parse(localStorage.getItem("user"))?.token || null
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN_USER: {
            const { id, firstName, lastName, phoneNumber, email, roles, token } = action.payload;
            return {
                isAuthenticated: true,
                id: id,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                roles: roles,
                token: token
            }
        }
        default:
            return state;
    }

}