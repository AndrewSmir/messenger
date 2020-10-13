import React, {useEffect} from "react";
import Chats from "./Chats";
import {getChatsTC} from "../../redux/chats-reducer";
import {connect} from "react-redux";

const ChatsContainer = ({getChats, chats}) => {

    useEffect( () => {
        getChats('u-1') //Из props будет приходить нужный ID после выбора пользователя
    }, [])

    return (
        <Chats chats={chats}/>
    )
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatsReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getChats(userId){
            dispatch(getChatsTC(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer)