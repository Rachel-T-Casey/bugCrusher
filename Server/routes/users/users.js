// Start of imports 
const express = require('express');
const cors = require('cors');
const ValidateUser = require('../../util/validateUser');
// End imports
// Start setup
const userRouter = express.Router();
userRouter.use(cors());
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));
// End setup
// Start routers
const loginRouter = require('./login');
const registerRouter = require('./register');
const tokenRouter = require('./token');
const friendsRouter = require('./friends');
// End routers
// Start middleware
friendsRouter.use(ValidateUser);
// End middleware
// Start routes
userRouter.use('/login', loginRouter);
userRouter.use('/register', registerRouter);
userRouter.use('/token', tokenRouter);
userRouter.use('/friends', friendsRouter);
// End routes
module.exports = userRouter;