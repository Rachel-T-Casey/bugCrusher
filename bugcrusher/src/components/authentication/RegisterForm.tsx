import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
const RegisterForm = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
        axios.post('http://localhost:5000/Users/Register', data)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        })
    }
     
  return (
    <div> 
    <h2> Register </h2>
    <form className = "RegisterForm" onSubmit={handleSubmit(onSubmit)}>
        <div className = "RegisterInput"> 
            <label>Username</label>
            <input type = "text" {...register("Username", {required: true})}/>
        </div>
        <div className = "RegisterInput"> 
            <label> Email </label>
            <input type = "email" {...register("Email", {required: true})}/>
        </div> 
        <div className = "RegisterInput"> 
        <label>Password</label>
        <input type = "password" {...register("Password", {required: true})}/>
        </div>
        <div className = "RegisterInput"> 
            <label>Confirm Password</label>
            <input type = "password" {...register("ConfirmPassword", {required: true})}/>
        </div>
        <div className = "RegisterInput"> 
            <input type = "submit" value = "Sign Up"/>
        </div>
    </form>
    </div>
  )
}

export default RegisterForm