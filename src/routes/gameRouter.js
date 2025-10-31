const express = require('express');
const router = express.Router();
const {addGame,getGames} = require('../controllers/gamecontroller');
const {addGameValidation} = require('../schemas/gameValidation');
const {validate}= require('../models/gameModel');
const {authenticateUser} = require('../middlewares/authMiddleware');


router.post('/',authenticateUser, addGame,  addGameValidation, validate);
router.get('/',getGames);

module.exports = router;