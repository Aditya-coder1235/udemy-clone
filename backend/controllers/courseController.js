const Course=require('../models/courseSchema');

exports.createCourse=async(req,res)=>{
    let { title, description ,price}=req.body;

    const image = req.file

    if (!image) {
        return res.status(400).json({ message: "Image required" })
    }

    const imageUrl = `/uploads/${image.filename}`

    const course = new Course({ title, description, price, image: imageUrl,owner:req.user.id })
    await course.save()

    res.status(200).json({message:"Course created"});
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

exports.updateCourseById=async(req,res)=>{
    try {
        let { title, description, price } = req.body;
        let { id } = req.params

        let updateData ={title,description,price}

       if(req.file){
           updateData.image = `/uploads/${req.file.filename}`
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
        console.error(error)
    }
    
}