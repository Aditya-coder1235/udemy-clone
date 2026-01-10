const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    createdCouses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    buyCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

})

const User=mongoose.model('User',userSchema)

module.exports=User