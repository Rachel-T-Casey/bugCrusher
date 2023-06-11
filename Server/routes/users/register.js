const express = require('express');
const cors = require('cors');
const registerRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mysql2');

registerRouter.use(cors());
registerRouter.use(express.json());
registerRouter.use(express.urlencoded({ extended: true }));

const validateInputs = (req, res, next) => {
    const { Username, Email, Password } = req.body;
    if (!(Username && Email && Password)) {
        res.status(400).send('All inputs are required');
        return;
    }
    if (Username.length < 4) {
        res.status(400).send('Username must be at least 4 characters long');
        return;
    }
    if (Password.length < 8) {
        res.status(400).send('Password must be at least 8 characters long');
        return;
    }
    if (!Email.includes('@')) {
        res.status(400).send('Email must be valid');
        return;
    }
    if (Password !== req.body.ConfirmPassword) {
        res.status(400).send('Passwords must match');
        return;
    }
    if (Username.length > 20) {
        res.status(400).send('Username must be less than 20 characters long');
        return;
    }
    if (Password.length > 100) {
        res.status(400).send('Password must be less than 100 characters long');
        return;
    }
    if (Email.length > 100) {
        res.status(400).send('Email must be less than 100 characters long');
        return;
    }
    if (Username.includes(' ')) {
        res.status(400).send('Username must not contain spaces');
        return;
    }
    if (Email.includes(' ')) {  
        res.status(400).send('Email must not contain spaces');
        return;
    }
    const db = req.app.locals.db;
    db.query('SELECT * FROM Users WHERE Username = ?', [Username], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.status(400).send('Username already exists');
                return;
            } else {
                db.query('SELECT * FROM Users WHERE Email = ?', [Email], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result.length > 0) {
                            res.status(400).send('Email already exists');
                            return;
                        } else {
                            next();
                        }
                    }
                });
            }
        }
    });
}


registerRouter.post('/', validateInputs, (req, res) => {
    const { Username, Email, Password } = req.body;
    const db = req.app.locals.db;
    const saltRounds = 10;
    console.log("Registering");
    console.log(Username, Email, Password);
    bcrypt.hash(Password, saltRounds, (err, Hash) => {
        if (err) {
            console.log(err);
        } else {
            db.query('INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)', [Username, Email, Hash], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).send({ auth: true, token: token });
                }
            })
        }
    });
});

module.exports = registerRouter;