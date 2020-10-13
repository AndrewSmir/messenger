import React from 'react';
import './App.css';

import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";
import Chats from "./components/Chats/Chats";
import Messages from "./components/Messages/Messages";

function App({isAuth}) {
    return (
        <div className='wrapper'>
            <div className='content'>
                <Header/>
                {!isAuth ? <Auth name={'Andrey'}/> :
                <div className='content__main'>
                    <Chats/>
                    <Messages/>
                </div>}
            </div>
        </div>
    );
}

export default App;
