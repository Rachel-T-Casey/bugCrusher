import React from 'react'
import Logout from '../authentication/Logout'
import DashboardMenu from '../navigation/DashboardMenu'
function Settings() {
  return (
    <div className = "Dashboard">
        <DashboardMenu/>
        <Logout/>
    </div>
  )
}

export default Settings