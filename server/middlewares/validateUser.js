
const validateUser = (req, res, next) => {


    const { name, email, password } = req.body;

    if(!email || !name || !password){

        res.status(400).json({
            success: false,
            message: "All the field are required"
        })
    }

    // Basic email format check (very simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
        });
    }

    // Password length check
    if (password.length < 6) {
        return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
        });
    }

    next();
}

module.exports = validateUser;