const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const tokenRouter = express.Router();
tokenRouter.use(cors());
tokenRouter.use(express.json());
tokenRouter.use(express.urlencoded({ extended: true }));

tokenRouter.post('/verify', (req, res) => {
    const sessionToken = req.headers['x-access-token'];
    if (!sessionToken) {
        res.status(401).send('No token provided');
    } else {
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                res.status(200).send('Valid token');
            }
        });
    } 
}); 

tokenRouter.post('/renew', (req, res) => {
    const sessionToken = req.headers['x-access-token'];
    if (!sessionToken) {
        res.status(401).send('No token provided');
    }
    jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send('Invalid token');
        } else {
            const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }
    });


});
module.exports = tokenRouter;