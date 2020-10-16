import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import s from "./Chats.module.css"
import {Field, Form} from "react-final-form";
import {CommonTextarea} from "../common/FormControls/FormControl";
import {maxLength, minLength, requiredField} from "../../utils/validators/validators";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        top: '40%',
        left: '40%',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[0],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

const CreateInvMsg = (props) => {

    const {inviteUser, invitationMsg, clearInvitationMsg} = props

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
        clearInvitationMsg()
    };

    let onSubmit = values => {
        inviteUser(values)
    }

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title" style={{alignSelf:'flex-start'}}>Please, enter contact data</h2>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form
                        onSubmit={async event => {
                            await handleSubmit(event)
                            form.reset()
                        }}
                    >
                        <div>
                            <Field
                                name="userName"
                                component={CommonTextarea}
                                type="text"
                                placeholder="Please, enter the username"
                                validate={composeValidators(requiredField, minLength(4), maxLength(15))}
                            />
                        </div>
                        {invitationMsg && <div><span>{invitationMsg}</span></div>}
                        <div>
                            <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
                                Invite
                            </Button>
                            <Button variant="contained" color="secondary" type="button"
                                    onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </form>
                )}
            />
        </div>
    );

    return (
        <div className={s.modal}>
            <Button style={{width: "80%", marginBottom: "5px"}} variant="outlined" color="primary" onClick={handleOpen}>
                Send invitation
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

export default CreateInvMsg
