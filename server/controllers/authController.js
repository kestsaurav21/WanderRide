const User = require('../models/user');
const generateToken = require('../utils/generateToken');


const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //check if user already exist
    if(existingUser){
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    //create a new user

    const newUser = new User({
      name, email, password
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
        role: newUser.role
      },
    })

    
    
  } catch (error) {

    console.error("❌ Error registering the user: ", error);
    res.status(500).json({
      message: "🔴 Server Error: Not able to register user!!",
    });
    
  }



}


module.exports = { register}
