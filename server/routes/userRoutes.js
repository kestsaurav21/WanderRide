const express = require('express');
const isAuthenticated = require('../middlewares/authMiddleware');
const { profile} = require('../controllers/userController');

const router = express.Router();

router.get('/profile', isAuthenticated, profile);



module.exports = router;