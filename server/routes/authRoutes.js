const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const validateRegisterUser = require("../middlewares/validateRegister");



router.post("/register", validateRegisterUser, register);
router.post("/login", login);




module.exports = router;