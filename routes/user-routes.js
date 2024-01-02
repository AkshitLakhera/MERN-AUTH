const express = require('express');
const { signup } = require('../controllers/user-controller');
 
const router = express.Router();
// Sign up route

router.post("/signup",signup)
module.exports = router