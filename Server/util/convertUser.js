const makeConnection = require('./makeConnection');
const dotenv = require('dotenv');
dotenv.config();

const AUID_To_Name = async (UID) => {
    try {
        const db = await makeConnection();
        if (db === null)
        { return null; }
        const sqlQuery = 'SELECT Username FROM Users WHERE UID = ?';
        const [rows] = await db.execute(sqlQuery, [UID]);
        db.close();
        if (rows.length === 0)
        { return null; }
        return rows[0].Username;
    } catch (error) { 
        console.error('Error converting UID to username:', error); 
        return null; 
    }
}
const AName_To_UID = async (Username) => {
    try {
        const db = await makeConnection();
        if (db === null) 
        { return null; }
        const sqlQuery = 'SELECT UID FROM Users WHERE Username = ?';
        const [rows] = await db.execute(sqlQuery, [Username]);
        db.close();
        if (rows.length === 0) 
        { return null; }
        return rows[0].UID;
    } catch (error) 
    { console.error('Error converting username to UID:', error); }  
};

const UID_To_Name = (db, UID, callback) => {
    const sqlQuery = 'Select Username FROM Users WHERE UID = ?';
    db.query(sqlQuery, [UID], (err, result) => {
        if(err) {
            console.error(err);
            callback(null);
        } else {
            callback(result[0].Username);
        }
    });
}
const Name_To_UID = (db, Username, callback) => {
    const sqlQuery = 'Select UID FROM Users WHERE Username = ?';
    db.query(sqlQuery, [Username], (err, result) => {
        if(err) {
            console.error(err);
            callback(null);
        } else {
           callback(result[0].UID);
        }
    });
}

module.exports = { 
    UID_To_Name,
    AName_To_UID,
    AUID_To_Name,
    Name_To_UID
}