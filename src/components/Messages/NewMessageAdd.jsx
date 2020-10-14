import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const NewMessageAdd = ({sendMessage, chatId}) => {

    const [messageText, setMessageText] = useState('')

    const onHandleChange = (evt) => {
        if (evt.keyCode !== 13) {
            setMessageText(evt.target.value)
        } else {
            sendMessage('u1', messageText, chatId);
            setMessageText('')
        }
    }

    return (
        <>
            <TextField style={{margin: '10px', width:'80%'}} id="outlined-basic" label="Message"
                       variant="outlined" value={messageText} onChange={onHandleChange} onKeyDown={onHandleChange}/>
            <SendOutlinedIcon onClick={()=>{
                sendMessage('u1', messageText, chatId)
                setMessageText('')
            }}/>
        </>
    )
}

export default NewMessageAdd