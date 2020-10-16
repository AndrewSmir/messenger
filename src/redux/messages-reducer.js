import {messagesApi} from "../api/api";

const SET_MESSAGES = "@@messages-reducer/SET_MESSAGES"
const ADD_NEW_MESSAGE = "@@messages-reducer/ADD_NEW_MESSAGE"
const TOGGLE_LOADING = '@@message-reducer/TOGGLE_LOADING'

const initialState = {
    messages: [],
    isLoading: false
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }

        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }

        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading
            }

        default:
            return state

    }
}

export default messagesReducer

//Action Creators
const setMessages = messages => ({type: SET_MESSAGES, messages})
const addNewMessage = message => ({type: ADD_NEW_MESSAGE, message})
const toggleLoading = () => ({type: TOGGLE_LOADING})

//Thunks

export const getMessagesTC = (chatId) => async dispatch => {
    dispatch(toggleLoading())
    const messages = await messagesApi.getMessages(chatId)
    dispatch(setMessages(messages))
    dispatch(toggleLoading())
}

export const sendMessageTC = (sender, text, chatId) => async dispatch => {
    const newMessage = await messagesApi.sendMessage(sender, text, chatId)
    dispatch(addNewMessage(newMessage))
}

export const deleteMessageTC = (chatId, id) => async dispatch => {
    dispatch(toggleLoading())
    await messagesApi.deleteMessage(chatId, id)
    dispatch(getMessagesTC(chatId))
    dispatch(toggleLoading())
}