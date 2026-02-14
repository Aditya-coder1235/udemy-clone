const express=require('express');
const { createReviews, deleteReview } = require('../controllers/reviewsController');
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware')

router.post('/create/:id',authMiddleware,createReviews);
// router.get('/getById/:id',getReviewById);
router.delete('/delete/:id',deleteReview)


module.exports=router;