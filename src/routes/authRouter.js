const express =require('express');
const router = express.Router();
const {registerController, loginController}  = require('../controllers/authcontroller');
const { createUserValidation, loginValidation } = require('../schemas/authValidation');
const { validate } = require('../models/UserModel');

router.post('/register', registerController  , createUserValidation, validate );
router.post('/login', loginController, loginValidation, validate);

module.exports = router;

