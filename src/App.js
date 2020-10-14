import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/store";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ChatsContainer from "./components/Chats/ChatsContainer";
import AuthContainer from "./components/Auth/AuthContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

function App({isAuth}) {
    return (
                <div className='wrapper'>
                    <div className='content'>
                        <HeaderContainer/>
                        {!isAuth ?
                            <>
                                <Route exact path='/' render={() => <AuthContainer register={false}/>}/>
                                <Route exact path='/register' render={() => <AuthContainer register={true}/>}/>
                            </> :
                            <div className='content__main'>
                                <ChatsContainer/>
                                <Route path='/chats/:chatId?' render={() => <MessagesContainer/>}/>
                            </div>}
                    </div>
                </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuthorized
    }
}

const mapDispatchToProps= dispatch => {
    return {

    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ConnectedApp/>
            </Provider>
        </BrowserRouter>)
}



