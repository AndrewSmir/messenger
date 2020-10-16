import React from "react";
import s from "./Messages.module.css"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from "@material-ui/core/Paper";
import Preloader from "../common/preloader/Preloader";
import NewMessageAdd from "./NewMessageAdd";

const Messages = ({messages, deleteMessage, isLoading, currentUser, chatId, ...restProps}) => {

    const messageItem = messages.map(message => {
       return <Paper elevation={3}  className={s.messagesItem} key={message.id} style={{alignSelf: message.sender === currentUser ? 'flex-end' : 'flex-start', backgroundColor:'lightskyblue'}}>
           <p><strong>{message.sender}:</strong> {message.text} <DeleteForeverIcon onClick={()=>deleteMessage(chatId, message.id)} fontSize="small"/> </p>
       </Paper>
   })

    return (
        <div className={s.messagesField}>
            <div className={s.messages}>
                {isLoading && <Preloader/>}
                {!isLoading && messageItem}
            </div>
            <div className={s.input}>
                <NewMessageAdd currentUser={currentUser} chatId={chatId} {...restProps}/>
            </div>
        </div>
    )
}

export default Messages