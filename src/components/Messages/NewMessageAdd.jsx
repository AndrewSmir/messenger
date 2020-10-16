import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const NewMessageAdd = (props) => {
    const {sendMessage, chatId, currentUser} = props
    const [messageText, setMessageText] = useState('')

    const onHandleChange = (evt) => {
        if (evt.keyCode !== 13) {
            setMessageText(evt.target.value)
        } else {
            sendMessage(currentUser, messageText, chatId);
            setMessageText('')
        }
    }

    return (
        <>
            <TextField style={{margin: '10px', width:'80%'}} id="outlined-basic" label="Message"
                       variant="outlined" value={messageText} onChange={onHandleChange} onKeyDown={onHandleChange}/>
            <SendOutlinedIcon onClick={()=>{
                sendMessage(currentUser, messageText, chatId)
                setMessageText('')
            }}/>
        </>
    )
}

export default NewMessageAdd