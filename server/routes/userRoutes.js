const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerUser } = require('../controllers/userControllers');
const validateUser = require('../middlewares/validateUser');






router.post('/register', validateUser, registerUser);

module.exports = router;