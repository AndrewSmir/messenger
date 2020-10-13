import React from "react";
import s from "./Chats.module.css"
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from "react-router-dom";

const Chats = ({chats}) => {
    const chatItem = chats.map(chat => {
       return <NavLink key={chat.id} to={`/chats/${chat.id}`}>
            <div className={s.chatItem}>
                <div>{chat.name}</div>
                <div><DeleteIcon/></div>
            </div>
        </NavLink>
    })
    return (
        <div className={s.chats}>
            <div className={s.chatItems}>
                {chatItem}
            </div>
            <Button style={{width: "80%", marginBottom: "5px"}} variant="outlined" color="primary">
                Add Chat
            </Button>
        </div>
    )
}

export default Chats