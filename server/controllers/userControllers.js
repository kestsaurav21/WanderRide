const User = require('../models/user');


exports.registerUser = async (req, res) => {


    const {email, password, name} = req.body;

    try {
        
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                message: 'User already exists with this email'
            })
        }

        const newUser = new User({
            name, email, password
        })

        await newUser.save();

        res.status(200).json({
            message: 'User register Successfully!!',
            user: newUser
        })



    } catch (error) {

        console.error('❌ Error registering the user: ', error);
        res.status(500).json({
            message: '🔴 Server Error: Not able to register user!!'
        })
        
    }
}

