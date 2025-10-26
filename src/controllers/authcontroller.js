const {generateToken} = require('../middlewares/authMiddleware')
const User = require("../models/UserModel");

const baseRegistredRole = "admin";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const registerController = async(req , res, next) =>{
    const {username,bio,email, password, confirmPassword} = req.body;

    if(!username || !bio ||!email || !password || !confirmPassword){
       return  res.status(401).json({message:"invalid input"});
    }

    if (password !== confirmPassword){
        return res.status(401).json("Invalid password");
    }

    const existingUser = await User.findOne({$or: [{email},{username}]});
    if (existingUser){
        return res.status(409).json({message:"User already existing"});
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