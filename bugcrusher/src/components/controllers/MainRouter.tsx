import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPanel from '../authentication/LoginPanel'
import Dashboard from '../pages/Dashboard'
import Feed from '../views/Feed'
import Settings from '../views/Settings'
import Projects from '../views/Projects'
import Social from '../views/Social'
function MainRouter() {

  return (

    <Router> 
      <Routes>
        <Route path = "/" element = {<LoginPanel/>}/>
        <Route element = {<ProtectedRoute/>}>
          <Route path = "/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route element = {<ProtectedRoute/>}> 
          <Route path = "/dashboard/feed" element={<Feed/>}/>
        </Route>
        <Route element = {<ProtectedRoute/>}>
          <Route path = "/dashboard/settings" element={<Settings/>}/>
        </Route>
        <Route element = {<ProtectedRoute/>}>
          <Route path = "/dashboard/projects" element={<Projects/>}/>
        </Route>
        <Route element = {<ProtectedRoute/>}>
          <Route path = "/dashboard/social" element={<Social/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default MainRouter