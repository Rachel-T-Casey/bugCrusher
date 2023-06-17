const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Name_To_UID = require('../../util/convertUser').Name_To_UID;

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
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


friendsRouter.post('/delete', (req, res) => {
 
})
friendsRouter.post('/accept', (req, res) => {
   
});

module.exports = friendsRouter;