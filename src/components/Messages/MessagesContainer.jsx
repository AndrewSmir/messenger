import React, {useEffect, useState} from "react"
import Messages from "./Messages";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteMessageTC, getMessagesTC, sendMessageTC} from "../../redux/messages-reducer";

const MessagesContainer = ({match, messages, getMessages, sendMessage, deleteMessage, isLoading}) => {

    useEffect(()=>{
        getMessages(match.params.chatId)
    },[match.params.chatId])

    return (
        <Messages chatId={match.params.chatId} messages={messages} sendMessage={sendMessage} deleteMessage={deleteMessage} isLoading={isLoading}/>
    )
}

const mapStateToProps = (state) => {
    return {
        messages: state.messagesReducer.messages,
        isLoading: state.messagesReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessages(chatId){
            dispatch(getMessagesTC(chatId))
        },
        sendMessage(sender, text, chatId){
            dispatch(sendMessageTC(sender, text, chatId))
        },
        deleteMessage(chatId, id){
            dispatch(deleteMessageTC(chatId, id))
        }
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MessagesContainer)