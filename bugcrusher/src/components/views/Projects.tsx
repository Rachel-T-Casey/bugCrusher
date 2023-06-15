import React from 'react'
import DashboardMenu from '../navigation/DashboardMenu'
import ProjectManager from './util/ProjectManager'
function Projects() {
  return (
    <div className = "Dashboard">
        <DashboardMenu/>
        <ProjectManager/>        
    </div>
  )
}

export default Projects