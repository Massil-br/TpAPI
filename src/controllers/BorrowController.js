const {AppError} = require('../utils/error');
const Game = require('../models/gameModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

const borrowGame = async (req, res) =>{
    const user = req.user;
    if (!user){
        throw new AppError("user not found", 403);
    }
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        throw new AppError("Invalid object format", 400);
    } 
    
    const game = await Game.findById(req.params.id);
    if (!game){
        throw new AppError("Can't find game", 400);
    }

    if (game.ownerId.toString() == user._id.toString()){
        throw new AppError("You can't borrow this game because your are the owner.");
    }

    if(game.borrowedBy){
        throw new AppError("Can't borrow game, game already borrowed");
    }
    game.borrowedBy = user._id;
    game.borrowedAt = Date.now();

    try{
        await game.save();
    }catch(error){
        console.log("can't save game" + error);
        throw new AppError("Can't save game", 500);
    }

    return res.status(200).json({
        message:"Game Borrowed successfully",
        game:game,
    });

};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const returnGame = async(req, res) =>{
    const user = req.user;
    if (!user){
        throw new AppError("Can't find user", 400);
    }

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        throw new AppError("Invalid object format", 400);
    } 

    const game = await Game.findById(req.params.id);
    if (!game){
        throw new AppError("Can't find game", 400);
    }

    

    if (game.ownerId.toString() != user._id.toString() && game.borrowedBy.toString() != user._id.toString() ){
        console.log(" user : " + user._id + " game owner Id: " + game.ownerId + "game borrowed by : ", game.borrowedBy);
        throw new AppError("You don't have the permissions to return this game", 403);
    }


    game.borrowedAt = null;
    game.borrowedBy = null;

    try{
        game.save();
    }catch(error){
        console.log("error while saving game" + error);
        throw new AppError("Can't save game", 500);
    }

    return res.status(200).json({
        message:"game return successfully",
        game:game,
    });

};


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getBorrowedGames = async(req,res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        throw new AppError("Invalid object format", 400);
    } 

    const user = User.findById(req.params.id);
    if(!user){
        throw new AppError("Can't find user", 400);
    }

    const games =await  Game.find({borrowedBy:user._id});
    if(games.length <= 0){
        throw new AppError("This user don't have any borrowed game", 400);
    }

    return res.status(200).json({
        message:"list of games",
        games: games,
    })
};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getMyBorrowedGames = async(req,res) =>{
    const user = req.user;
    if(!user){
        throw new AppError("Can't find user", 400);
    }
   
    const  games = await  Game.find({borrowedBy:user._id});
    if (games.length <= 0){
        throw new AppError("This user don't have any borrowed game", 400);

    }
    
    
    

    return res.status(200).json({
        message:"list of games",
        games: games,
    })
}

module.exports ={
    borrowGame, 
    returnGame,
    getBorrowedGames,
    getMyBorrowedGames
}
