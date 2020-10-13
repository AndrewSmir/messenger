import React, {useState} from "react";
import s from "./Messages.module.css"
import TextField from "@material-ui/core/TextField";
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from "@material-ui/core/Paper";
import Preloader from "../common/preloader/Preloader";

const Messages = ({messages, chatId, sendMessage, deleteMessage, isLoading}) => {

    console.log(messages);

    const [messageText, setMessageText] = useState('')

    const onHandleChange = (evt) => {
        if (evt.keyCode !== 13) {
            setMessageText(evt.target.value)
        } else {
            sendMessage('u1', messageText, chatId);
            setMessageText('')
        }
    }

    const messageItem = messages.map(message => {
       return <Paper elevation={3}  className={s.messagesItem} key={message.id} style={{alignSelf: message.sender === 'bot' ? 'flex-start' : 'flex-end', backgroundColor:'lightskyblue'}}>
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
                <TextField style={{margin: '10px', width:'80%'}} id="outlined-basic" label="Message"
                           variant="outlined" value={messageText} onChange={onHandleChange} onKeyDown={onHandleChange}/>
                <SendOutlinedIcon onClick={()=>{
                    sendMessage('u1', messageText, chatId)
                    setMessageText('')
                }}/>
            </div>
        </div>
    )
}

export default Messages