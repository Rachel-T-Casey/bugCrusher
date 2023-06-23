// Desc: Router for /users/friends
// Path: Server/routes/users/friends.js

// Note: All routes in this file require a valid JWT token,
// the router is already setup to use the ValidateUser middleware
// to check for a valid token, s

// Start imports
const express = require('express');
const cors = require('cors');

const AUID_To_Name = require('../../util/convertUser').AUID_To_Name;
const AName_To_UID = require('../../util/convertUser').AName_To_UID;
const isFriend = require('../../util/isFriend');
const isFriendRequest = require('../../util/isFriendRequest');
const makeConnection = require('../../util/makeConnection');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// End imports
// Start setup
dotenv.config();
const friendsRouter = express.Router();
friendsRouter.use(express.json());
friendsRouter.use(express.urlencoded({ extended: true }));
friendsRouter.use(cors());
// End setup
// Start routes
friendsRouter.get('/',(req, res) => {});
friendsRouter.post('/new', async (req, res) => {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const friendName = req.body.friendName;
    const friendUID = await AName_To_UID(friendName);
    const db = await makeConnection();
    const isFriendAlready = await isFriend(userID, friendUID);
    if(isFriendAlready) {
        db.close();
        return res.status(400).send('Friend already added');
    }
    const requestedAlready = await isFriendRequest(userID, friendUID);
    if(requestedAlready) {
        db.close();
        return res.status(400).send('Friend request already sent');
    }
    const sqlQuery = `INSERT INTO FriendRequests (outgoingID, incomingID) VALUES (?, ?)`;
    await db.execute(sqlQuery, [userID, friendUID]);
    db.close();
    return res.status(200).send('Friend request sent');
});
friendsRouter.get('/requests', async (req, res) => {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const db = await makeConnection();
    const sqlQuery = `SELECT * FROM FriendRequests WHERE incomingID = ?`;
    const [rows] = await db.execute(sqlQuery, [userID]);
    db.close();
    const requests = [];
    for(let i = 0; i < rows.length; i++) {
        const friendName = await AUID_To_Name(rows[i].outgoingID);
        requests.push(friendName);
    }
    return res.status(200).send(requests);
})
friendsRouter.post('/delete', async (req, res) => {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const friendName = req.body.friendName;
    const friendUID = await AName_To_UID(friendName);
    const isFriendAlready = await isFriend(userID, friendUID);
    if(!isFriendAlready) {
        return res.status(400).send('Friend not found');
    }
    const db = await makeConnection();
    const sqlQueryIsIncoming = `SELECT * FROM Friends WHERE incomingID = ? AND outgoingID = ?`;
    const [isIncoming] = await db.execute(sqlQueryIsIncoming, [userID, friendUID]);
    if(isIncoming.length !== 0) {
        const sqlQueryDelete = `DELETE FROM Friends WHERE incomingID = ? AND outgoingID = ?`;
        await db.execute(sqlQueryDelete, [userID, friendUID]);
        db.close();
        return res.status(200).send('Friend deleted');
    }
    const sqlQueryIsOutgoing = `SELECT * FROM Friends WHERE incomingID = ? AND outgoingID = ?`;
    const [isOutgoing] = await db.execute(sqlQueryIsOutgoing, [friendUID, userID]);
    if(isOutgoing.length !== 0) {
        const sqlQueryDelete = `DELETE FROM Friends WHERE incomingID = ? AND outgoingID = ?`;
        await db.execute(sqlQueryDelete, [friendUID, userID]);
        db.close();
        return res.status(200).send('Friend deleted');
    }
    db.close();
    return res.status(400).send('Friend not found');
    
})
friendsRouter.post('/accept', async (req, res) => {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const friendName = req.body.friendName;
    const friendUID = await AName_To_UID(friendName);
    
    if(friendUID === null) 
    { res.status(400).send('Friend not found'); }
    
    const db = await makeConnection();
    const sqlQuery = `SELECT * FROM Friends WHERE incomingID = ? AND outgoingID = ?`;
    const [isFriends] = await db.execute(sqlQuery, [userID, friendUID]);
    if(isFriends.length !== 0) { 
        db.close();
        return res.status(400).send('Friend already added'); 
    }

    const sqlQuery2 = `INSERT INTO Friends (incomingID, outgoingID) VALUES (?, ?)`;
    await db.execute(sqlQuery2, [userID, friendUID]);

    const sqlQuery3 = `DELETE FROM FriendRequests WHERE incomingID = ? AND outgoingID = ?`;
    await db.execute(sqlQuery3, [userID, friendUID]);
    
    db.close();
    return res.status(200).send('Friend added');
    

});
friendsRouter.post('/decline', async (req, res) => {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const friendName = req.body.friendName;
    const friendUID = await AName_To_UID(friendName);
    const db = await makeConnection();
    const sqlQuery = `DELETE FROM FriendRequests WHERE incomingID = ? AND outgoingID = ?`;
    await db.execute(sqlQuery, [userID, friendUID]);
    db.close();
    return res.status(200).send('Friend request declined');
})
// End routes
module.exports = friendsRouter;