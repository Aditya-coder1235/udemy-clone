const Course=require('../models/courseSchema');


exports.createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);


        if (!title || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const course = await Course.create({
            title,
            description,
            price,
            image: req.file.path, 
            owner: req.user.id,  
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        console.error("Create course error:", error);
        res.status(500).json({ message: "Server Error" });
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
