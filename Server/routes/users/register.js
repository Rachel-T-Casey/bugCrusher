const express = require('express');
const cors = require('cors');
const registerRouter = express.Router();

registerRouter.use(cors());
registerRouter.use(express.json());
registerRouter.use(express.urlencoded({ extended: true }));

registerRouter.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

module.exports = registerRouter;