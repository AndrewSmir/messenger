import {authApi} from "../api/api";

const SET_USER = '@@auth-reducer/SET_USER';
const SHOW_ERROR = '@@auth-reducer/SHOW_ERROR'
const HIDE_ERROR = '@@auth-reducer/HIDE_ERROR'
const LOGOUT = "@@auth-reducer/LOGOUT"

const initialState = {
    isAuthorized: false,
    currentUser: null,
    errorMessage: null,
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthorized: true,
                currentUser: action.loginData
            }

        case SHOW_ERROR:
            return {
                ...state,
                errorMessage: action.error
            }

        case HIDE_ERROR:
            return {
                ...state,
                errorMessage: null
            }

        case LOGOUT:
            return {
                ...state,
                isAuthorized: false,
                currentUser: null,
                errorMessage: null,
            }

        default:
            return state

    }
}

//Actions
const setUser = (loginData) => ({type: SET_USER, loginData})
const showError = (error) => ({type: SHOW_ERROR, error})
export const hideError = () => ({type: HIDE_ERROR})
export const logout = () => ({type: LOGOUT})

//Thunks
export const getUserDataTC = (loginData) => async dispatch =>{
    const userData = await authApi.login(loginData)
    if (!userData.error) {
        dispatch(setUser(loginData))
        dispatch(hideError())
    } else {
        dispatch(showError(userData.message))
    }
}

export const createUserTC = newUserData => async dispatch => {
    const userData = await authApi.registerUser(newUserData)
    dispatch(showError(userData.message))
}

export default authReducer