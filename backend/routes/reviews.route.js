const express=require('express');
const { createReviews, getReviewById } = require('../controllers/reviewsController');
const router=express.Router();

router.post('/create/:id',createReviews);
// router.get('/getById/:id',getReviewById);


module.exports=router;