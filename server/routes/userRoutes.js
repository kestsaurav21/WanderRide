const express = require('express');
const isAuthenticated = require('../middlewares/authMiddleware');
const { profile, updateProfile} = require('../controllers/userController');

const router = express.Router();

router.get('/profile', isAuthenticated, profile);
router.patch('profile', isAuthenticated, updateProfile);



module.exports = router;