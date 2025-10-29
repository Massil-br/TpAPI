
const {AppError} = require('../utils/error')
const Game = require('../models/gameModel');

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

const addGame = async(req, res) =>{
    user = req.user;
    if (!user){
        throw new AppError("user not found", 403);
    }

    const {title, platform, genre} = req.body;
    if (!title || !platform || !genre){
        throw new AppError("Invalid input", 400);
    }

    const game = new Game({
        title,
        platform,
        genre,
        ownerId: user._id,
    })
    await game.save();
    return res.status(201).json({
        message:"Game Successfully created",
        game,
    })
}


module.exports = {
    addGame,
}