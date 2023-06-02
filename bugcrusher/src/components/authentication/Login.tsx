import React from 'react';
import  {useForm} from 'react-hook-form';
import axios from 'axios';

function Login() {
  const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        axios.post("http://localhost:5000/Users/Login", data)
        .then(response => {
            console.log(response);
        }
        ).catch(error => {
            console.error(error);
        })  
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