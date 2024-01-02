const express = require('express');
const { signup, login } = require('../controllers/user-controller');
 
const router = express.Router();
// Sign up route

router.post("/signup",signup)
// Login routes
router.post('/login',login)
module.exports = router