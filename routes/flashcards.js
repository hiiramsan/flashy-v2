const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync.js');
const flashcards = require('../controllers/flashcards.js');
const { isLoggedIn, isAuthor,storeReturnTo, saveLastURL } = require('../utils/middleware.js');

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

router.get("/:id/edit",isLoggedIn, isAuthor, flashcards.renderEditForm);
router.get("/:id/study", saveLastURL, isLoggedIn, flashcards.renderStudy);
router.get("/:id/writing", saveLastURL, isLoggedIn,flashcards.renderWriting); 
router.post("/:id/config", storeReturnTo, isLoggedIn, isAuthor, catchAsync(flashcards.updateConfig));
router.get("/:id/test", saveLastURL, isLoggedIn, flashcards.renderTest);

module.exports = router;
