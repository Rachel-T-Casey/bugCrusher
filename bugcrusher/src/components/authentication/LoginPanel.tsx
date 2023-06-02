import React from 'react';
import Login from './Login';
import RegisterForm from './RegisterForm';
import '../../styles/LoginPanel.scss';
import {useState} from 'react';

const LoginPanel = () => {

    const [isLogin, setIsLogin] = useState(true);
    
    return (
        <div className = "LoginPanel">
            {isLogin ? <Login/> : <RegisterForm/>}
            <button className = "LoginToggle" onClick = {() => setIsLogin(!isLogin)}>{isLogin ? "Need an account?" : "Already signed up?"}</button>
        </div>
    )
}

export default LoginPanel