import {chatsAPI} from "../api/api";

const SET_CHATS = '@@chats-reducer/SET_CHATS'
const SET_INVITATION_MSG = '@@chats-reducer/INVITATION_MSG'

const initialState = {
    chats: [],
    invitationMsg: null
}


const chatsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CHATS:
            return {
                ...state,
                chats: [...action.chats]
            }

        case SET_INVITATION_MSG:
            return {
                ...state,
                invitationMsg: action.msg
            }

        default:
            return state
    }
}

export default chatsReducer

//ActionCreators
const setChats = (chats) => ({type: SET_CHATS, chats})
export const setInvitationMsg = (msg) => ({type: SET_INVITATION_MSG, msg})

//Thunks

export const getChatsTC = (userId) => async (dispatch) => {
    const chatsData = await chatsAPI.getChats(userId)
    dispatch(setChats(chatsData))
}

export const addNewChatTC = (userId, companion) => async dispatch => {
    await chatsAPI.addNewChat(userId, companion)
    dispatch(getChatsTC(userId))
}

export const deleteChatTC = (chatId, userId, companion) => async dispatch => {
    await chatsAPI.deleteChat(chatId, userId, companion)
    dispatch(getChatsTC(userId))
}

export const createInvitationMsgTC = (user) => async dispatch => {
    const response = await chatsAPI.inviteToMessenger(user)
    dispatch(setInvitationMsg(response))
}