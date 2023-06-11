import axios from 'axios'

const validateAuthentication = async () : Promise<boolean>  => {
    const token = localStorage.getItem('x-auth-token');
    if(!token) return false;
    await axios.post('http://localhost:5000/users/token/verify', token)
    .then(res => {
        if(res.data === true) {
            return true;
        }
        else {
            return false;
        }
    }
    ).catch(err => {
        console.log(err);
        return false;
    });
    return true;
}
export default validateAuthentication;