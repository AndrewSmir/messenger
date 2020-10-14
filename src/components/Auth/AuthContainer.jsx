import React from "react";
import Auth from "./Auth";
import {connect} from "react-redux";
import {createUserTC, getUserDataTC, hideError} from "../../redux/auth-reducer";

const AuthContainer = (props) => {
    const {isAuthorized, getUserData, errorMessage, createUser, hideError} = props

    return (
        <Auth register={props.register} isAuthorized={isAuthorized} getUserData={getUserData} errorMessage={errorMessage} createUser={createUser} hideError={hideError}/>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.authReducer.isAuthorized,
        errorMessage: state.authReducer.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData(userData){
            dispatch(getUserDataTC(userData))
        },
        createUser(userData){
            dispatch(createUserTC(userData))
        },
        hideError(){
            dispatch(hideError())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)