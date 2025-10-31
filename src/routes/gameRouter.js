const express = require('express');
const router = express.Router();
const {addGame,getGames,getGameById, modifyGame} = require('../controllers/gamecontroller');
const {addGameValidation, modifyGameValidation} = require('../schemas/gameValidation');
const {validate}= require('../models/gameModel');
const {authenticateUser} = require('../middlewares/authMiddleware');


router.post('/',authenticateUser, addGame,  addGameValidation, validate);
router.get('/',getGames);
router.get('/:id',getGameById);
router.put('/:id',authenticateUser,modifyGame, modifyGameValidation, validate );

module.exports = router;