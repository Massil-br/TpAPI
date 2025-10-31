
const {AppError} = require('../utils/error')
const Game = require('../models/gameModel');
const res = require('express/lib/response');
const mongoose = require('mongoose');

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


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getGames = async (req, res) =>{
    const games = await Game.find();
    if (!games){
        throw new AppError("cannot process games", 500);
    }
    return res.status(200).json({
        message:"list of games ",
        games:games,
    });
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getGameById = async(req, res)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        throw new AppError("Invalid object format", 400);
    }   

    const game = await Game.findById(req.params.id);
    if (!game){
        throw new AppError("cannot find game", 400);
    }

    return res.status(200).json({
        message:"game found",
        game: game,
    });

    
}


module.exports = {
    addGame,
    getGames,
    getGameById
}