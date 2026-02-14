const Course=require('../models/courseSchema');

exports.createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!req.files || !req.files.image || !req.files.video) {
            return res.status(400).json({ message: "Image and video required" });
        }

        const imageFile = req.files.image[0];
        const videoFile = req.files.video[0];

        const imageUrl = `/uploads/image/${imageFile.filename}`;
        const videoUrl = `/uploads/video/${videoFile.filename}`;

        const course = new Course({
            title,
            description,
            price,
            image: imageUrl,
            video: videoUrl,
            owner: req.user.id
        });

        await course.save();

        res.status(201).json({ message: "Course created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getCourseUsingInput=async(req,res)=>{
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const courses = await Course.find({
            title: { $regex: q, $options: "i" } 
        });

        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.getAllCourse=async(req,res)=>{
    const courses=await Course.find({})
    res.json(courses)
}

exports.getCourseById=async(req,res)=>{
    let {id}=req.params
    const course=await Course.findById(id).populate('reviews')
    res.json(course)
}

exports.deleteCoursebyId=async(req,res)=>{
    let {id} =req.params;
    await Course.findByIdAndDelete(id)
    res.json({message:"Course deleted"});
}
exports.updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        let updateData = { title, description, price };

        if (req.file) {
            updateData.image = `/uploads/image/${req.file.filename}`;
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            message: "Course updated successfully",
            updatedCourse
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
