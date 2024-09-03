const Flashcard = require('../models/flashcard');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must be signed in first!")
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const flashcard = await Flashcard.findById(id);
      if(!flashcard.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that');
        return res.redirect(`/flashcards/${id}`)
      }
      next();
  }