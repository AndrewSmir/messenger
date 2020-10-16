import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import s from "./Chats.module.css"
import AddIcon from '@material-ui/icons/Add';
import CreateInvMsg from "./CreateInvMsg";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        top: '40%',
        left: '40%',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
    },
}));

const AddChat = (props) => {

    const {filtUsers, addNewChat, currentUser, ...restProps} = props

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const usersList = filtUsers.map(user => <li key={user} className={s.userItem} onClick={()=>addNewChat(currentUser, user)}>
        <span>- {user}</span>
        <AddIcon fontSize='small'/>
    </li>)

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Please, select contact</h2>
            <ul>
                {usersList}
            </ul>
            <CreateInvMsg {...restProps}/>
        </div>
    );

    return (
        <div className={s.modal}>
            <Button style={{width: "80%", marginBottom: "5px"}} variant="outlined" color="primary" onClick={handleOpen}>
                Add Chat
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default AddChat

