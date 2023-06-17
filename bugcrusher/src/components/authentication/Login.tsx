import React from 'react'
import  {useForm} from 'react-hook-form';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import {useState} from 'react';
function Login() {
  const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
        axios.post("http://localhost:5000/users/login", data)
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('x-auth-token', token);            
            setIsAuthenticated(true);
            console.log(response);
        }).catch(error => {
            console.error(error);
        })  
    }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if(isAuthenticated) {
    return <Navigate to = "/dashboard"/>
  } 
  return (  
    <div className = "Login"> 
        <h2> Login </h2>
        <form className = "LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className = "LoginInput"> 
              <label>Username</label>
              <input type = "text" {...register("Username", {required: true})}/>
            </div>
            <div className = "LoginInput"> 
              <label>Password</label>
              <input type = "password" {...register("Password", {required: true})}/>
            </div>
            <div className = "LoginInput"> 
              <input type = "submit" value = "Login" />
            </div>
        </form>
    </div>
  )
}

export default Login