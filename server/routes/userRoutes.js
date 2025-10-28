const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');
const validateRegisterUser = require('../middlewares/validateRegister');



router.post('/register', validateRegisterUser, registerUser);
router.post('/login', loginUser);

module.exports = router;