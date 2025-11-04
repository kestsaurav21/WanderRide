const jwt = require("jsonwebtoken");
require("dotenv").config(); // ✅ CRITICAL FIX: call the config function

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check for missing or invalid header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Use return to stop execution immediately
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or invalid format",
      });
    }

    // 2️⃣ Extract the actual token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify the token
    // Throws an error if invalid/expired, caught in the catch block
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach the user data to the request object
    req.user = decoded;

    // 5️⃣ Move to next middleware or controller
    next();
  } catch (error) {
    // Log the specific error message for debugging
    console.error("Auth error:", error.name, error.message);

    // 6️⃣ Handle specific JWT errors gracefully
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // Default error for any other unexpected issue
    return res.status(500).json({
      success: false,
      message: "Authentication failed due to a server error.",
    });
  }
};

module.exports = isAuthenticated;
