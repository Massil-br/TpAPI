const {body, param} = require('express-validator');

const createUserValidation = [
    body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({min:3,max:30}).withMessage('Username must have between 3 & 30 chars ')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Username must contain only letters'),

    body('email')
    .trim()
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Email must ne valid')
    .normalizeEmail()
    .isLength({max:100}).withMessage('Email must not have higher than 100 chars'),

    body('bio')
    .trim()
    .isLength({max:200}).withMessage("bio must not be higher than 200 chars"),

    body('password')
    .notEmpty().withMessage("password  required")
    .isLength({min:6}).withMessage('password must have at least 6 chars'),
    body('confirmPassword')
    .notEmpty().withMessage("confirmPassword  required")
    .isLength({min:6}).withMessage('confirmPassword must have at least 6 chars')
];

const loginValidation =[
    body('username')
    .trim()
    .notEmpty().withMessage("Username or email required")
    .isLength({min:3}).withMessage("Username or email must have at least 3 characters"),

    body('password')
    .notEmpty().withMessage("password required")
    .isLength({min:6}).withMessage("password must have at least 6 chars")
] 

module.exports = {
    createUserValidation,
    loginValidation,
}