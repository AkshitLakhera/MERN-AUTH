const express = require('express');
const { signup, login, verifytoken, getUser, refreshToken, logout } = require('../controllers/user-controller');
 
const router = express.Router();
// Sign up route

router.post("/signup",signup)
// Login routes
router.post('/login',login)
// ask for info
router.get('/user',verifytoken,getUser)
//  verify token
router.get('/refresh',refreshToken,verifytoken,getUser);
router.post('/logout',verifytoken,logout)
module.exports = router