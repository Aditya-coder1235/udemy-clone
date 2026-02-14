const User = require('../models/userSchema')

exports.enrolledCourses = async (req, res) => {
    try {
        let { userId } = req.params;

        let user = await User.findById(userId).populate('buyCourses')

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        res.status(200).json({ message: "User fetched successfully", user })

    } catch (error) {
        res.status(400).json({ message: "server error" });
    }
}