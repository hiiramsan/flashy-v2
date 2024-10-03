const express = require("express");
const router = express.Router();
const flashcards = require('../controllers/flashcards.js');
const catchAsync = require('../utils/catchAsync.js');

router.route('/cards/:id/toggle-star')
.post(catchAsync(flashcards.toggleStar))

module.exports = router;