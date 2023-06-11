const express = require('express');
const cors = require('cors');

const userRouter = express.Router();
userRouter.use(cors());
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');
const tokenRouter = require('./token');
userRouter.use('/login', loginRouter);
userRouter.use('/register', registerRouter);
userRouter.use('/logout', logoutRouter);
userRouter.use('/token', tokenRouter);

module.exports = userRouter;