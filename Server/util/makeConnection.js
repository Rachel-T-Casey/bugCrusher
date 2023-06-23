const dotenv = require('dotenv');
const mysql2Promise = require('mysql2/promise');

dotenv.config();

const makeConnection = async () => {
    try {
        const connection = await mysql2Promise.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        return connection;
    } catch (error) {
        // Handle any error that occurred during the connection creation
        console.error('Error creating database connection:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

module.exports = makeConnection;