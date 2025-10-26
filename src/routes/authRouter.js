const express =require('express');
const router = express.Router();
const {registerController}  = require('../controllers/authcontroller');
const { createUserValidation } = require('../schemas/authValidation');
const { validate } = require('../models/UserModel');

router.post('/register', registerController  , createUserValidation, validate );

module.exports = router;

