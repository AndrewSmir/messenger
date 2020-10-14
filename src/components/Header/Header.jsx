import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

const Header = (props) => {

    const {logout, isAuth, user} = props
    console.log(user);
    return (
        <div className={s.header}>
                <div>
                    <img src="" alt="logo"/>
                </div>
            {isAuth && <><b>{user.login}</b> <NavLink to={'/'}><span onClick={()=>logout()}>Exit</span></NavLink></>}
        </div>
    )
}

export default Header