const express = require('express');
const cors = require('cors');

const loginRouter = express.Router();
loginRouter.use(cors());
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));

loginRouter.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

module.exports = loginRouter;