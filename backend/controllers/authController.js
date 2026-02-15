const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()
const cookieParser = require('cookie-parser')

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "user already register!!" });
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const user1 = new User({ name, email, password: hashPassword })
    let demo = await user1.save()

    res.status(200).json({ message: "User register successfully:-", demo });
}





exports.login = async (req, res) => {


    try {
        let { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        let token = jwt.sign(
            { id: user.id,  role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,         
            sameSite: "None",     
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({
            message: "Login successful",
            user: { id: user._id, email: user.email, name: user.name,role:user.role }
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }


}


exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};
