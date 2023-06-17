import { Navigate } from 'react-router-dom';
import {useState} from 'react';
function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const handleLogout =  () => {
        const token = localStorage.getItem('x-auth-token');
        if(!token) {
            console.log("No token");
            return;
        }
        setIsLoggedOut(true);
        localStorage.removeItem('x-auth-token');
    }   
    if(isLoggedOut) {
        return <Navigate to = "/login"/>
    } else 
    return ( 
        <button onClick = {handleLogout}> Logout </button>
  )
}
export default Logout