const User = require("../models/user");

const isAdmin = (req, res, next) => {
  try {
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Access denied! Admins only.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error in role check middleware",
    });
  }
};

module.exports = isAdmin;
