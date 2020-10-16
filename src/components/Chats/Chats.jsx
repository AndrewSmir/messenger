import React from "react";
import s from "./Chats.module.css"
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from "react-router-dom";
import AddChat from "./AddChat";

const Chats = (props) => {

    const {chats, deleteChat, currentUser, ...restProps} = props


    const chatItem = chats.map(chat => {
        return <div>
            <div className={s.chatItem}>
                <NavLink key={chat.id} to={`/chats/${chat.id}`}>
                    <div>{chat.name}</div>
                </NavLink>
                <div onClick={() => deleteChat(chat.id, currentUser, chat.name)}><DeleteIcon/></div>
            </div>
        </div>

    })

    return (
        <div className={s.chats}>

            <div className={s.chatItems}>
                {chatItem}
            </div>
            <AddChat {...restProps} currentUser={currentUser}/>
        </div>
    )
}

export default Chats