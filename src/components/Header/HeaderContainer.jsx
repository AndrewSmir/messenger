import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

const HeaderContainer = (props) => {
    const {logout, isAuth, user} = props

    return (
        <Header logout={logout} isAuth={isAuth} user={user}/>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthorized,
        user: state.authReducer.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout(){
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)