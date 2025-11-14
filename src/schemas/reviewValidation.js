const {body, param}  = require('express-validator');

const modifyReviewValidation = [
    body('rating')
    .toInt()
    .isInt({min:1,max:5}).withMessage("rating must be an integer and between 1 and 5"),

    body('comment')
    .trim()
    .isLength({max:300}).withMessage("your comment can't exceed 300 chars"),
];

module.exports = {
    modifyReviewValidation,
}