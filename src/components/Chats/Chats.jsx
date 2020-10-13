import React from "react";
import s from "./Chats.module.css"
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

const Chats = () => {
    return (
        <div className={s.chats}>
            <div className={s.chatItems}>
                <div className={s.chatItem}>
                    <div>Chat1</div>
                    <div><DeleteIcon/></div>
                </div>
                <div className={s.chatItem}>
                    <div>Chat2</div>
                    <div><DeleteIcon/></div>
                </div>
                <div className={s.chatItem}>
                    <div>Chat3</div>
                    <div><DeleteIcon/></div>
                </div>
                <div className={s.chatItem}>
                    <div>Chat4</div>
                    <div><DeleteIcon/></div>
                </div>
            </div>
            <Button  style={{width:"80%", marginBottom: "5px"}} variant="outlined" color="primary">
                Add Chat
            </Button>
        </div>
    )
}

export default Chats