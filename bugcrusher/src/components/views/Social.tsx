import React from 'react'
import DashboardMenu from '../navigation/DashboardMenu'
import SocialManager from './util/SocialManager'
function Social() {
  return (
    <div className = "Dashboard">
        <DashboardMenu/>
        <SocialManager/>
        
    </div>
  )
}

export default Social