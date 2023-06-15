import React from 'react'
import Projects from './Projects'
import "../../../styles/ProjectManager.scss"
function ProjectManager() {
  return (
    <div className="ProjectManager"> 
        <ul className = "ProjectManager__list">
            <li className = "ProjectManager__list__item">
                <Projects 
                  name = "Project 5"
                  description = "This is a project"
                  author = "Rachel Casey"
                />
            </li>
            <li className = "ProjectManager__list__item">
                <Projects 
                  name = "Project 5"
                  description = "This is a project"
                  author = "Rachel Casey"
                />
            </li>
            <li className = "ProjectManager__list__item">
                <Projects 
                  name = "Project 5"
                  description = "This is a project"
                  author = "Rachel Casey"
                />
            </li>
            <li className = "ProjectManager__list__item">
                <Projects 
                  name = "Project 5"
                  description = "This is a project"
                  author = "Rachel Casey"
                />
            </li>
            <li className = "ProjectManager__list__item">
                <Projects 
                  name = "Project 5"
                  description = "This is a project"
                  author = "Rachel Casey"
                />
            </li>
            <li className = "ProjectManager__list__item">
                <Projects 
                  name = "Project 5"
                  description = "This is a project"
                  author = "Rachel Casey"
                />
            </li>
        </ul>
    </div>
  )
}

export default ProjectManager