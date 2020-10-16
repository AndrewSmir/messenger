import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import messagesReducer from "./messages-reducer";
import thunk from "redux-thunk";
import chatsReducer from "./chats-reducer";
import authReducer from "./auth-reducer";
import {usersReducer} from "./users-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const combinedReducers = combineReducers({
    messagesReducer,
    chatsReducer,
    authReducer,
    usersReducer
})

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)))

export default store