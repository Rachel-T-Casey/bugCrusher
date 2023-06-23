const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const validateUser = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if(!token) {
        return res.status(403).send('No token provided');
    } else {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch(error) 
        { return res.status(403).send('Invalid Token'); }
    }
}

module.exports = validateUser;