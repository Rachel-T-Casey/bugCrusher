import React from 'react'

function DashboardMenu() {
  return (
    <div className="DashboardMenu">
      <ul className = "DashboardMenu__list"> 
        <li className = "DashboardMenu__list__item"> 
          <button className = "DashboardMenu__button"> 
            Feed
          </button>
        </li>
        <li className = "DashboardMenu__list__item">
          <button className = "DashboardMenu__button"> 
            Projects
          </button>
        </li>
        <li className = "DashboardMenu__list__item">
          <button className = "DashboardMenu__button">
            Social
          </button>
        </li>
        <li className = "DashboardMenu__list__item">
          <button className = "DashboardMenu__button">
            Settings
          </button>
        </li>
      </ul>
    </div>
  )
}

export default DashboardMenu