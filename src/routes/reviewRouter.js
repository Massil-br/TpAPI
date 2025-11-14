const express = require("express");
const router = express.Router();
const  {authenticateUser} = require('../middlewares/authMiddleware');
const {modifyReview} = require('../controllers/reviewController');
const {validate} = require('../models/reviewModel');
const {modifyReviewValidation} = require('../schemas/reviewValidation');

router.put("/:id", authenticateUser, modifyReview,modifyReviewValidation, validate);




module.exports = router;