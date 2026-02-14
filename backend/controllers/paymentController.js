const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const User = require("../models/userSchema");
const Course = require("../models/courseSchema");

exports.createOrder = async (req, res) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const order = await razorpay.orders.create({
        amount: course.price * 100, 
        currency: "INR",
        receipt: `course_${courseId}`,
    });

    res.status(200).json({
        order,
        course,
        key: process.env.RAZORPAY_KEY_ID,
    });
};


exports.verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed" });
    }

    await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { buyCourses: courseId },
    });

    res.status(200).json({ message: "Payment successful, course enrolled" });
};
