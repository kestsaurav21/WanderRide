const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userControllers");
const validateRegisterUser = require("../middlewares/validateRegister");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/register", validateRegisterUser, registerUser);
router.post("/login", loginUser);

// 🛡️ Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted to protected route",
    user: req.user, // contains decoded token data
  });
});

// 👑 Admin-only route example
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin! You can access this route.",
    user: req.user,
  });
});

module.exports = router;
