const makeConnection = require('./makeConnection');
const isFriend = async ( incomingID, outgoingID) => {
    const db = await makeConnection();
    if (db === null)
    { return null; }
    const sqlQuery = 'SELECT * FROM Friends WHERE incomingID = ? AND outgoingID = ?';
    const [rows] = await db.execute(sqlQuery, [incomingID, outgoingID]);
    if (rows.length !== 0) {
        db.close();
        return true;
    } 
    const sqlQuery2 = 'SELECT * FROM Friends WHERE incomingID = ? AND outgoingID = ?';
    const [rows2] = await db.execute(sqlQuery2, [outgoingID, incomingID]);
    if (rows2.length !== 0) {
        db.close();
        return true;
    }
    db.close();
    return false;
}

module.exports = isFriend;