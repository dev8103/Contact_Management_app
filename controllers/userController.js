const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userModel = require('../models/userModel');
const { use } = require('../routes/contactRoutes');

// @desc register a user
// @route GET /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    // Extract necessary information from the request body
    const { username, email, password } = req.body;

    // Check if all required fields are present
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory.");
    }

    // Check if a user with the provided email already exists
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists with this email");
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    // Create a new user with the hashed password
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User Created ${user}`);
    if (!user) {
        res.status(400);
        throw new Error("User data is not valid");
    }

    // Send a success response with the user ID and email
    res.status(201);
    res.json({ _id: user._id, email: user.email });
});

// @desc login a user
// @route GET /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory.");
    }

    // Find the user with the provided email
    // this user object will used everywhere to do any request from database ,etc..
    const user = await userModel.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
        // If valid, create an access token using JWT
        const accessToken = jwt.sign(
            { user: { username: user.username, email: user.email, id: user._id } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" },
        );
        // Send the access token in the response
        res.status(200).json({ accessToken });
    } else {
        // If email or password is not valid, send an unauthorized response
        res.status(401);
        throw new Error("Email or password is not valid.");
    }
});

// @desc current user infor
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {4
    res.status(200);
    res.json(req.user);
    // res.json({ message: 'Current user information.' });
});

module.exports = { registerUser, loginUser, currentUser };