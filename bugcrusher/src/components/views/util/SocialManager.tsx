import React from 'react'
import AddFriend from './AddFriend'
import FriendRequests from './FriendRequests'
function SocialManager() { 

  return (
    <div className = "SocialManager"> 
      <AddFriend/>
      <FriendRequests/>
    </div>
  )

}

export default SocialManager