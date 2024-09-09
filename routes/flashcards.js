const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync.js');
const flashcards = require('../controllers/flashcards.js')
const { isLoggedIn, isAuthor } = require('../utils/middleware.js');

router.route('/')
.get(isLoggedIn, catchAsync(flashcards.index))
.post(isLoggedIn, catchAsync(flashcards.create))

router.route('/create')
.get(isLoggedIn, flashcards.renderCreate)

router.route('/explore')
.get(flashcards.explore)

router.route('/:id')
.get(isLoggedIn, isAuthor, catchAsync(flashcards.showFlashcard))
.put(isLoggedIn, isAuthor, catchAsync(flashcards.updateFlashcard))
.delete(isLoggedIn, isAuthor, catchAsync(flashcards.deleteFlashcard))

router.get("/:id/edit",isLoggedIn, isAuthor, catchAsync(flashcards.renderEditForm));

module.exports = router;
