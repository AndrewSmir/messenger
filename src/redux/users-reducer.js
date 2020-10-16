import {usersApi} from "../api/api";

const SET_USERS = '@@users-reducer/SET_USERS'
const SET_FILTERED_USERS = '@@users-reducer/SET_FILTERED_USERS'

const initialState = {
    registeredUsers: [],
    filteredUsers: []
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS:
            return {
                ...state,
                registeredUsers: action.users
            }

        case SET_FILTERED_USERS:
            return {
                ...state,
                filteredUsers: action.users
            }

        default:
            return state
    }
}

// Action Creators
const setUsers = (users) => ({type: SET_USERS, users})
export const setFilteredUsers = (users) => ({type: SET_FILTERED_USERS, users})

// Thunks
export const getUsersTC = () => async dispatch => {
    const users = await usersApi.getRegisteredUsers()
    dispatch(setUsers(users))
}