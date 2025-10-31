const {body, param} = require('express-validator');


const addGameValidation = [
    body('title')
    .trim()
    .notEmpty().withMessage("title required")
    .isLength({min:3,max:100}).withMessage("Title length must be between 3 and 100 chars"),
    
    body('platform')
    .trim()
    .notEmpty().withMessage("platform required")
    .isLength({ min:2,max:50}).withMessage("platform must be between 3 and 50 chars"),

    body('genre')
    .notEmpty().withMessage("genre required")
    .isLength({min:3, max:50}).withMessage("genre's length must be between 3 & 50 chars")
];

const modifyGameValidation = [
    body('title')
    .trim()
    .isLength({min:3,max:100}).withMessage("Title length must be between 3 and 100 chars"),
    
    body('platform')
    .trim()
    .isLength({ min:2,max:50}).withMessage("platform must be between 3 and 50 chars"),

    body('genre')
    .isLength({min:3, max:50})
]


module.exports = {
    addGameValidation,
    modifyGameValidation
}