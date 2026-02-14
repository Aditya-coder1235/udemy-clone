const express=require('express')
const { enrolledCourses } = require('../controllers/userController')
const router=express.Router()

router.get('/enrolledCourse/:userId',enrolledCourses)

module.exports=router