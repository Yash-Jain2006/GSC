const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(409).json({
                message: 'User already exists',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserModel = new UserModel({ username, email, password: hashedPassword });
        await newUserModel.save();
        const user = await UserModel.findOne({ email });
        res.status(201).json({
            message: "Registration Successful",
            success: true,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'Email or Password is wrong',
                success: false
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Email or Password is Wrong",
                success: false
            });
        }
        const jwtToken = jwt.sign({
            username: user.username,
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

module.exports = {
    Signup,
    Login
}