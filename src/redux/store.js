import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import messagesReducer from "./messages-reducer";
import thunk from "redux-thunk";
import chatsReducer from "./chats-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const combinedReducers = combineReducers({
    messagesReducer,
    chatsReducer
})

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)))

export default store