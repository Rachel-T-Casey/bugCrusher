import React from 'react'

function SocialManager() {
  return (
    <div className = "SocialManager">
        <h2> Social </h2>
        <button className = "SocialManager__Friends"> Manage Friends </button>
        <button className = "SocialManager__Requests"> Manage Requests </button>
        <button className = "SocialManager__Message"> Open Chat </button>
        
    </div>
  )
}

export default SocialManager