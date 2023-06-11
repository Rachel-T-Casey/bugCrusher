const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const logoutRouter = express.Router();
logoutRouter.use(cors());
logoutRouter.use(express.json());
logoutRouter.use(express.urlencoded({ extended: true }));

logoutRouter.post('/', (req, res) => {
        console.log("Logging out");
        const sessionToken = req.body;
        if(req.session) {
            console.log("Destroying session");
            req.session.destroy();
        }
    if (!sessionToken) {
        res.status(401).send('No token provided');
    } else {
        res.status(200).send('Logged out');
    }
});

module.exports = logoutRouter;