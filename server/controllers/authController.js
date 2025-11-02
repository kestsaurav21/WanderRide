const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //check if user already exist
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    //create a new user

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "User register Successfully!!",
      token: generateToken(newUser._id, newUser.role, newUser.email),
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Error registering the user: ", error);
    res.status(500).json({
      message: "🔴 Server Error: Not able to register user!!",
    });
  }
};


const login = async (req, res) => {
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

    const isMatch = await existingUser.matchPassword(password);

    // const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "🔴 Invalid credentials. Please try again.",
      });
    }

    //If password matches

    res.status(200).json({
      success: true,
      message: "✅ Login successful!",
      token: generateToken( existingUser._id, existingUser.role, existingUser.email),
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


module.exports = { register, login };
