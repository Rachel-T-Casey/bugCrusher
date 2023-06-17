
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
    Name_To_UID
}