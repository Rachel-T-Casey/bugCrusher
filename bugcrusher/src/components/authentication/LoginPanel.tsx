import React from 'react';
import Login from './Login';
import RegisterForm from './RegisterForm';
import '../../styles/LoginPanel.scss';
import {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import validateAuthentication from './util/validateAuthentication';


function LoginPanel () {
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        validateAuthentication().then(res => {
            setIsAuthenticated(res);
            setIsLoaded(true);
        })
    })
    if(!isLoaded) {
        return <div>Loading...</div>
    }
    if(isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    else {
    return (
        <div className="LoginPanel">
            <div className="login-panel__container">
                <div className="login-panel__container__header">
                    <h2 className="login-panel__container__header__title">BugCrusher</h2>
                </div>
                {isLogin ? <Login /> : <RegisterForm />}
                <div className="login-panel__controls"> 
                    <button className="LoginToggle" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Need an account?" : "Already signed up?"}</button>
                </div>
            </div>
        </div>
    )
  }
}

export default LoginPanel;