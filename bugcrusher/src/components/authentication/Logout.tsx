import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import {useState} from 'react';


function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
 
    const handleLogout =  () => {
        const token = localStorage.getItem('x-auth-token');
        axios.post('http://localhost:5000/users/logout', token)
        .then(res => {
            console.log("User logged out");
            localStorage.removeItem('x-auth-token');
            setIsLoggedOut(true);
        });
       
    }   
    if(isLoggedOut) {
        return <Navigate to = "/login"/>
    } else 
    return (
     
        <button onClick = {handleLogout}> Logout </button>
  )
}

export default Logout