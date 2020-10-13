import React from "react";
import s from "./Messages.module.css"
import TextField from "@material-ui/core/TextField";
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

const Messages = () => {
    return (
        <div className={s.messagesField}>
            <div className={s.messages}>
            </div>
            <div className={s.input}>
                <TextField style={{margin: '10px', width:'80%'}} id="outlined-basic" label="Message"
                           variant="outlined"/>
                <SendOutlinedIcon/>
            </div>
        </div>
    )
}

export default Messages