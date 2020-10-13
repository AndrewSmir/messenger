import React from 'react';
import './App.css';

import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ChatsContainer from "./components/Chats/ChatsContainer";

function App({isAuth}) {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className='wrapper'>
                    <div className='content'>
                        <Header/>
                        {!isAuth ? <Auth name={'Andrey'}/> :
                            <div className='content__main'>
                                <ChatsContainer/>
                                <Route path='/chats/:chatId?' render={() => <MessagesContainer/>}/>
                            </div>}
                    </div>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
