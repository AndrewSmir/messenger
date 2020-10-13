import React from "react";
import s from "./Header.module.css"

const Header = (props) => {
    return (
        <div className={s.header}>
                <div>
                    <img src="" alt="logo"/>
                </div>
                <div>
                    <span>login</span>
                </div>
        </div>
    )
}

export default Header