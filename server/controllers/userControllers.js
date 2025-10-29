const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // generate salt (10 rounds)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "User register Successfully!!",
      user: newUser,
    });
  } catch (error) {
    console.error("❌ Error registering the user: ", error);
    res.status(500).json({
      message: "🔴 Server Error: Not able to register user!!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: "❌ User not found. Please register first.",
      });
    }
    //compare the entered password with hashpassword
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "🔴 Invalid credentials. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    //If password matches

    res.status(200).json({
      success: true,
      message: "✅ Login successful!",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = { registerUser, loginUser };
