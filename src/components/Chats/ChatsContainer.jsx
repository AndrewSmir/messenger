import React, {useEffect, useState} from "react";
import Chats from "./Chats";
import {
    addNewChatTC,
    createInvitationMsgTC,
    deleteChatTC,
    getChatsTC,
    setInvitationMsg
} from "../../redux/chats-reducer";
import {connect} from "react-redux";
import {getUsersTC} from "../../redux/users-reducer";

const ChatsContainer = (props) => {

    const {getChats, getUsers, currentUser, users, chats, ...restProps} = props
    const [localChats, setLocalChats] = useState(chats)

    const filtUsers = users.filter(user => !localChats.map(chat => chat.name === user).includes(true))

    useEffect( () => {
        getChats(currentUser) //Из props будет приходить нужный ID после выбора пользователя
        getUsers()
    }, [currentUser])

    useEffect(()=>{
        setLocalChats(chats)
    },[chats])

    return (
        <Chats currentUser={currentUser} filtUsers={filtUsers} users={users} chats={localChats} {...restProps}/>
    )
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatsReducer.chats,
        currentUser: state.authReducer.currentUser,
        invitationMsg: state.chatsReducer.invitationMsg,
        users: state.usersReducer.registeredUsers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getChats(userId){
            dispatch(getChatsTC(userId))
        },
        getUsers(){
          dispatch(getUsersTC())
        },
        inviteUser(user){
            dispatch(createInvitationMsgTC(user))
        },
        clearInvitationMsg(){
            dispatch(setInvitationMsg(''))
        },
        addNewChat(userId, companion){
            dispatch(addNewChatTC(userId, companion))
        },
        deleteChat(chatId, userId, companion){
            dispatch(deleteChatTC(chatId, userId, companion))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer)