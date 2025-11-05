const express = require('express');
const router = express.Router();
const {getBorrowedGames, getMyBorrowedGames} = require('../controllers/BorrowController');
const { authenticateUser } = require('../middlewares/authMiddleware');

router.get('/:id/borrowed', getBorrowedGames);
router.get('/borrowed', authenticateUser, getMyBorrowedGames);


module.exports = router;