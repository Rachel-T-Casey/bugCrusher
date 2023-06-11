const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users/users');
const limiter = require('./util/limiter');

dotenv.config();
const port = process.env.PORT;

app.use(cors());    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
const db = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


app.listen(port, () => {
    app.locals.db = db;
    app.use('/users',  userRouter);

});
