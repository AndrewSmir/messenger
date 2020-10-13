import React from "react";
import styles from "./Auth.module.css"

const Auth = ({name}) => {
    return (
        <div className={styles.auth}>
            <div>Hello, {name}</div>
            <div>This is chat-messenger</div>
        </div>
    )
}

export default Auth