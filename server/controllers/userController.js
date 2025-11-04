const User = require("../models/user");

const profile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token payload.",
      });
    }

    //fetch user from database
    const user = await User.findById(userId).select("-password");

    //check is user exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    //send user profile details in the response

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Profile fetch error:", error);

    // Handle unexpected server errors (database connection issues, etc.)
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while fetching the profile.",
    });
  }
};


const updateProfile = async (req, res) => {

  try {
    const allowedUpdates = ["name", "email"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    //update the user profile details

    const updateUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });

    if (!updateUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing from request token.",
      });
    }

    res.status(200).json({
        success: true,
        user: updateUser,
    });

    
  } catch (error) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};


module.exports = { profile, updateProfile };
