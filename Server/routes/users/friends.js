const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Name_To_UID = require('../../util/convertUser').Name_To_UID;
const UID_To_Name = require('../../util/convertUser').UID_To_Name;
const dotenv = require('dotenv');

dotenv.config();

const friendsRouter = express.Router();

friendsRouter.use(express.json());
friendsRouter.use(express.urlencoded({ extended: true }));
friendsRouter.use(cors());


friendsRouter.get('/', (req, res) => {
    
});
friendsRouter.post('/new', async (req, res) => {
    const db = req.app.locals.db;
    const token = req.headers['x-auth-token'];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    } catch(error) {
        console.log(error);
        console.log("This token has expired");
        return res.status(401).send('Invalid Token');
    }
    const userID = decoded.id;
    const friendName = req.body.friendName;
    Name_To_UID(db, friendName, (result) => {
        if(result === null) {
            res.status(400).send('Friend not found');
        } else {
            const sqlQuery = `INSERT INTO FriendRequests (incomingID, outgoingID) VALUES (?, ?)`;
            const friendID = result;
            db.query(sqlQuery, [userID, friendID], (err, result) => {
                if(err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log(result);
                    res.status(200).send('Friend Request Sent');
                }
            });
        }
    });
});

friendsRouter.get('/requests', (req, res) => {
    const db = req.app.locals.db;
    const token = req.headers['x-auth-token'];
    try {
        console.log("Fetching requests");
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userID = decoded.id;
            const sqlQuery = `SELECT * FROM FriendRequests WHERE incomingID = ?`;
            console.log(userID);
            db.query(sqlQuery, [userID], (err, result) => {
                if(err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log(result);
                UID_To_Name(db, result[0].outgoingID, (name) => {
                    console.log(name);
                    return res.status(200).send(name);
                })
            }) 
        } catch(error) {
            console.log("This token has expired");
            return res.status(401).send('Invalid Token');     
        }
    } catch(error) {
        console.error(error);
        return res.status(401).send('Invalid Token');
    }
})

friendsRouter.post('/delete', (req, res) => {
 
})
friendsRouter.post('/accept', (req, res) => {
   return res.status(200).send('Friend Request Accepted');
});

friendsRouter.post('/decline', (req, res) => {
    return res.status(200).send('Friend Request Declined');
})
module.exports = friendsRouter;