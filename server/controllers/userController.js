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


module.exports = { profile };
