import React from 'react'
import DashboardMenu from '../navigation/DashboardMenu'

function Feed() {
  return (
    <div className = "Dashboard">
    <DashboardMenu/>
        <div className = "Feed"> 
            <ul className = "Feed__list">
                <li className = "Feed__list__item">
                    <div className = "Feed__list__item__header">
                        <h3 className = "Feed__list__item__header__title">
                            Assigned Bugs 
                        </h3>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
  )
}

export default Feed