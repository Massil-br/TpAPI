const {generateToken} = require('../middlewares/authMiddleware')
const User = require("../models/UserModel");
const { AppError } = require('../utils/error');

const baseRegistredRole = "user";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const registerController = async(req , res, next) =>{
    const {username,bio,email, password, confirmPassword} = req.body;

    if(!username  ||!email || !password || !confirmPassword){
        throw new AppError("Invalid Input", 400);
    }

    if (password !== confirmPassword){
        throw new AppError("Invalid input", 400);
    }

    const existingUser = await User.findOne({$or: [{email},{username}]});
    if (existingUser){
        throw new AppError("User already existing", 409)
    }

    const role = baseRegistredRole;

    const user = new User({
        username,
        bio,
        email,
        password,
        role,
    });
    await user.save();
    const jwtToken = generateToken(user.id)
    res.status(201).json({
        message:"User saved successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            bio:user.bio,
            createdAt: user.createdAt,
        },
        token: jwtToken,
    });
};

module.exports = {registerController};