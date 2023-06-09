// Start of imports
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sql = require('mysql2');
// End imports 

// Start of setup
const loginRouter = express.Router();
loginRouter.use(cors());
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));

// End of setup

loginRouter.post('/', (req, res) => {
    const { Username, Password } = req.body;
    const db = req.app.locals.db;
    const sqlQuery = `SELECT * FROM Users WHERE Username = ?`;
    db.query(sqlQuery, [Username], (err, result) => {
        if (err) 
        { res.status(500).send('Internal Server Error'); } 
        else {
            if(result.length > 0) {
                const user = result[0];
                const passwordIsValid = bcrypt.compareSync(Password, user.Password);
                if(!passwordIsValid) { res.status(401).send('Invalid Password'); } 
                else {
                    const payload = { id: user.UID, username: user.Username };  
                    const token = jwt.sign(payload, process.env.JWT_SECRET, 
                        { expiresIn: 86400 }); // expires in 24 hours
                    res.status(200).send({ auth: true, token: token });
                }
            } else { res.status(401).send('Invalid Username'); }
        }
    });
});

module.exports = loginRouter;