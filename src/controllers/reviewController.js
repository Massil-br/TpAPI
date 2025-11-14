const {AppError} = require('../utils/error');
const Review = require('../models/reviewModel');
const mongoose = require('mongoose');



/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const modifyReview = async(req, res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.isValid)){
        throw new AppError("Invalid object format", 400);
    }

    const user = req.user;
    if(!user){
        throw new AppError("User not found", 403);
    }
    try{
        const review = await Review.findById(req.params.id);
        if(!review){
            throw new AppError("cannot find review", 400);
        }
    }catch(error){
        throw new AppError("error while trying to get review from database", 500);
    }
   
    if(user.role != "admin" && review.UserId.toString() != user._id.toString()){
        throw new AppError("This is not your review, you can't modify it", 403);
    }

    const {rating, comment}  = req.body;
    if(!rating && !comment){
        throw new AppError("you have to modify at least one parameter between rating & comment", 400);
    }

    if(rating){
        review.rating = rating;
    }
    if(comment){
        review.comment = comment;
    }
    try{
        await review.save()
    }catch(error){
        throw new AppError("Error while saving review", 500);
    }


    return res.status(200).json({
        message:"Review modified successfully",
        review
    })
};



module.exports = {
    modifyReview,
};