const express = require('express');
const userRouter = express.Router();

const { addUser, logIn, getUserById, isLoggedIn, logOut } = require('../controllers/userContoller');

userRouter
    .post("/addUser", addUser)
    .post("/logIn", logIn)
    .post("/getUserById", getUserById)
    .get("/isLoggedIn", isLoggedIn)
    .get("/logOut", logOut)

module.exports = userRouter;