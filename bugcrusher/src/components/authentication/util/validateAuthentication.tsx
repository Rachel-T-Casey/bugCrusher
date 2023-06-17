import axios from 'axios'

const validateAuthentication = async () : Promise<boolean>  => {
    const token = localStorage.getItem('x-auth-token');
    if(!token) return false;
    else {
    try { 
        const response = await axios.post('http://localhost:5000/users/token/verify', token);
        return response.data === true;
    } catch(error) {
        return true;    
    }
    }
}
export default validateAuthentication;