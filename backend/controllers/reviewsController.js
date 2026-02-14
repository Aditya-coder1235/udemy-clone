const Review=require('../models/reviewSchema');
const Course=require('../models/courseSchema')
exports.createReviews = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating" });
        }

        const review = await Review.create({
            comment,
            rating,
            course: id,
            user: req.user.id
        });

        course.reviews.push(review._id);
        await course.save();

        res.status(201).json({
            message: "Review created successfully",
            review
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.deleteReview=async(req,res)=>{
    let {id}=req.params
    try{
       await Review.findByIdAndDelete(id)

        res.status(200).json({message:"Review Deleted"})

    }catch(err){
        res.status(400).json({message:"Error during fetching reviews"});
    }
}