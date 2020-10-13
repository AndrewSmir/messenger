import {chatsAPI} from "../api/api";

const SET_CHATS = '@@chats-reducer/SET_CHATS'

const initialState = []

const chatsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CHATS:
            return [...action.chats]

        default:
            return state
    }
}

export default chatsReducer

//ActionCreators
const setChats = (chats) => ({type: SET_CHATS, chats})

//Thunks

export const getChatsTC = (userId) => async (dispatch) => {
    const chatsData = await chatsAPI.getChats(userId)
    dispatch(setChats(chatsData))
}