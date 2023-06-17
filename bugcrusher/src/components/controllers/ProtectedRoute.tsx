import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute =  () => {
    const token = localStorage.getItem('x-auth-token');
    const isAuthenticated = token ? true : false;
    return( 
        isAuthenticated ? <Outlet/> : <Navigate to = "/login"/>

    )
}
export default ProtectedRoute;

// This definitely needs to be fixed

