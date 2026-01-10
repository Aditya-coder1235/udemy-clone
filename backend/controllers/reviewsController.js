const Review=require('../models/reviewSchema');
const Course=require('../models/courseSchema')

exports.createReviews=async(req,res)=>{
    let {comment,rating} =req.body
    let {id}=req.params
    try{

        const review = await Review.create({
            comment,
            rating,
            course: id,
        });

        await Course.findByIdAndUpdate(
            id,
            { $push: { reviews: review._id } }
        );

        res.status(200).json({
            message:"Review created successfully"
        })

    }catch(err){
        res.status(400).json({message:"Error during creating review"});
    }
}

// exports.getReviewById=async(req,res)=>{
//     let {id}=req.params
//     try{
//        const course=await Course.findById(id).populate('reviews')

//         res.status(200).json(course)

//     }catch(err){
//         res.status(400).json({message:"Error during fetching reviews"});
//     }
// }