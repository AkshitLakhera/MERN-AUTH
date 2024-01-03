const express = require('express');
const { signup, login, verifytoken, getUser } = require('../controllers/user-controller');
 
const router = express.Router();
// Sign up route

router.post("/signup",signup)
// Login routes
router.post('/login',login)
// ask for info
router.get('/user',verifytoken,getUser)
//  verify token

module.exports = router