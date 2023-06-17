import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';

function SocialManager() {
  const {register, handleSubmit} = useForm();
  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('x-auth-token');
    if(!token) {
      console.log("No token");
      return;
    } else {
      console.log("Received token: " + token);
      axios.post('http://localhost:5000/users/friends/new', data, {headers: {"x-auth-token": token}})
      .then(res => {
        console.log(res);
      }
      )
      .catch(err => {
        console.log(err);
      })
    }
  }
  return (
    <div className = "SocialManager">
      <form className = "AddFriend" onSubmit={handleSubmit(onSubmit)}>
          <h2> Add Friend </h2>
          <input type = "text" {...register("friendName", {required: true})}/>
          <input type = "submit" value = "Add Friend"/>
      </form>
    </div>
  )

}

export default SocialManager