import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import axios from 'axios'

import LoginPanel from '../authentication/LoginPanel'
import Dashboard from '../pages/Dashboard'

function MainRouter() {
  return (
    <Router> 
      <Routes>
        <Route path = "/login" element = {<LoginPanel/>}/>
        <Route element = {<ProtectedRoute/>}>
          <Route path = "/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default MainRouter