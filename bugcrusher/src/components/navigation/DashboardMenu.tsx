import React from 'react'
import Feed from '../views/Feed'
import Settings from '../views/Settings'
import {Navigate, useLocation} from 'react-router-dom'
import {useState} from 'react'
function DashboardMenu() {
  
  const  [view, setView] = useState("Dashboard");
  const location = useLocation();

  const handleFeedClick = () => {
    if(location.pathname === "/dashboard/feed") {
      return;
    }
    setView("Feed");
  }
  const handleProjectsClick = () => {
    if(location.pathname === "/dashboard/projects") {
      return;
    }
    setView("Projects");
  }
  const handleSocialClick = () => {
    if(location.pathname === "/dashboard/social") {
      return;
    }
    setView("Social");
  }
  const handleSettingsClick = () => {
    if(location.pathname === "/dashboard/settings") {
      return;
    }
    setView("Settings");
  }
  if(view === "Feed") {
    return (
      // Q: How can I check to see if I am currently on the feed page?

      <Navigate to = "/dashboard/feed"/>
    )
  }
  if(view === "Projects") {
    return (
      <Navigate to = "/dashboard/projects"/>
    )
  }
  if(view === "Social") {
    return (
      <Navigate to = "/dashboard/social"/>
    )
  }
  if(view === "Settings") {
    return (
      <Navigate to = "/dashboard/settings"/>
    )
  }
  return (
    <div className="DashboardMenu">
      <ul className = "DashboardMenu__list"> 
        <li className = "DashboardMenu__list__item"> 
          <button
            className = "DashboardMenu__button"
            onClick = {handleFeedClick}  
          >Feed</button>
        </li>
        <li className = "DashboardMenu__list__item">
          <button 
            className = "DashboardMenu__button"
            onClick = {handleProjectsClick}
          >Projects</button>
        </li>
        <li className = "DashboardMenu__list__item">
          <button 
            className = "DashboardMenu__button"
            onClick = {handleSocialClick}
          >Social</button>
        </li>
        <li className = "DashboardMenu__list__item">
          <button 
            className = "DashboardMenu__button"
            onClick = {handleSettingsClick}
          >Settings</button>
        </li>
      </ul>
    </div>
  )
}

export default DashboardMenu