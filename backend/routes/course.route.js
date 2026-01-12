const express = require('express')
const { createCourse, getAllCourse, getCourseById, deleteCoursebyId, updateCourseById } = require('../controllers/courseController')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
const authorizeRoles = require('../middleware/roleMiddleware')

router.post(
    '/createCourse',
    authMiddleware,
    authorizeRoles("admin"),
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]),
    createCourse
);

router.get('/getAllCourses', getAllCourse)
router.get('/getCourse/:id', getCourseById);
router.delete('/deleteCourse/:id', authMiddleware, authorizeRoles("admin"), deleteCoursebyId)
router.put(
    '/update/:id',
    authMiddleware,
    authorizeRoles("admin"),
    upload.single("image"),
    updateCourseById
)



module.exports = router