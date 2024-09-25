const userSchema = require("../schema/userSchema");
const { hashPassword, comparePassword } = require("../helpers/authaHelper");
const multer = require("multer");
var { expressjwt: jwt } = require("express-jwt");
const JWT = require("jsonwebtoken");

//middleware
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});


const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if the user already exists
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user with the rating field included
    const user = await userSchema({
      username,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }
  
        // Find the user by email
        const user = await userSchema.findOne({ email });
  
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
  
        // Check if the user is banned
        if (user.banned) {
            return res.status(403).json({
                success: false,
                message: 'User is banned. Cannot login.'
            });
        }
  
        // Match password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
  
        // Generate JWT token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "50d",
        });
  
        // Omit sensitive information from the user object
        user.password = undefined;
  
        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error in login API'
        });
    }
};


  
  



module.exports = { registerController, loginController };
