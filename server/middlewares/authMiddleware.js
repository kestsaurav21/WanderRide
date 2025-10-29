// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
require('dotenv').config;

const authMiddleware = (req, res, next) => {
  
  try {

    // 1️⃣ Get the token from the header
    const authHeader = req.headers.authorization;    

    if(!authHeader || !authHeader.startsWith("Bearer ")){
      
      res.status(401).json({
        success: false,
        message: "Authorization token missing or invalid format",
      })
    }

    // 2️⃣ Extract the actual token

    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify the token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 4️⃣ Attach the user data to the request object

    req.user = decoded;

    // 5️⃣ Move to next middleware or controller

    next();
    
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
 
  }
};

module.exports = authMiddleware;
