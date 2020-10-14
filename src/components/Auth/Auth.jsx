import React from "react";
import s from "./Auth.module.css"
import {Form, Field} from 'react-final-form'
import {CommonTextarea} from "../common/FormControls/FormControl";
import Button from "@material-ui/core/Button";
import {maxLength, minLength, requiredField} from "../../utils/validators/validators";
import {NavLink, Redirect} from "react-router-dom";


const Auth = (props) => {

    const {getUserData, createUser, errorMessage, hideError} = props

    if (props.isAuthorized) {
        return <Redirect to={'/'}/>
    }

    const {register} = props

    let onSubmit = values => {
        console.log('subscribe');
    }

    if (!props.register) {
        onSubmit = values => {
            getUserData(values)
        }
    } else {
        onSubmit = values => {
            createUser(values)
        }
    }


    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <div className={s.auth}>
            <div className={s.welcome}>
                <h1>Please, enter your login data {register && 'for creating new user'}</h1>
            </div>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit} className={s.form}>
                        <div>
                            <Field
                                name="login"
                                component={CommonTextarea}
                                type="text"
                                placeholder="Enter your login"
                                validate={composeValidators(requiredField, minLength(4), maxLength(15))}
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                component={CommonTextarea}
                                type="password"
                                placeholder="Enter your password"
                                validate={composeValidators(requiredField, minLength(4))}
                            />
                        </div>
                        {errorMessage && <div className={s.errorField}>
                            <span>{errorMessage}</span>
                        </div>}
                        <div className={s.buttons}>
                            <Button variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
                                {!register ? 'Login' : 'Register'}
                            </Button>
                            <Button variant="contained" color="secondary" type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}>
                                Reset
                            </Button>
                        </div>
                    </form>
                )}
            />

            {register ? <div className={s.redirect}>
                    <span>Already registered?</span>
                    <NavLink to={'/'}> <span onClick={()=>hideError()} className={s.link}>Go to login Page</span>
                    </NavLink>
                </div> :
                <div className={s.redirect}>
                    <span>Not registered yet?</span>
                    <NavLink to={'/register'}> <span onClick={()=>hideError()} className={s.link}>Go to register page</span></NavLink>
                </div>}

        </div>
    )
}

export default Auth