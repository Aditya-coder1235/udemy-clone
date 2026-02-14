const express=require('express')
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const cors=require('cors')
const cookieParser=require('cookie-parser');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Razorpay=require('razorpay')


let port=process.env.PORT
let url=process.env.URI

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser())

app.use("/uploads", express.static("uploads"))


async function main(){
    await mongoose.connect(url);
}
main().then(()=>console.log("Connect to mongodb!!"));




const authRoutes = require("./routes/auth.route.js")
const courseRoute=require('./routes/course.route.js')
const reviewRoute=require('./routes/reviews.route.js');
const paymentRoutes =require('./routes/payment.Routes.js')
const userRouter=require('./routes/user.route.js');
const User = require('./models/userSchema.js');

app.get('/',async (req, res) => {
    console.log(res.user)
    // let admin={
    //     name:'aditya',
    //     email: 'adityagirawale@gmail.com',
    //     password:'Aditya@123',
    //     role:'admin'
    // }

    // let hashPass=await bcrypt.hash(admin.password,13)

    // const newUser=new User({
    //     name:admin.name,
    //     email:admin.email,
    //     password:hashPass,
    //     role:admin.role
    // })

    // await newUser.save()

    res.send("Hi i am Root!");
})

app.use('/api/auth',authRoutes);
app.use('/api/course',courseRoute)
app.use('/api/reviews',reviewRoute)
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRouter);





app.listen(port,()=>{
    console.log("server start at 8080 port!!")
})