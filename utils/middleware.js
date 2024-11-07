const Flashcard = require('../models/flashcard');

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        console.log("SESSION: ", req.session.returnTo);
        res.locals.returnTo = req.session.returnTo;
        console.log('im saving something');
        console.log(res.locals.returnTo);
    } else {
        console.log("hiya");
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must be signed in first!")
        return res.redirect('/login');
    }
    next();
}

module.exports.saveLastURL = (req, res, next) => {
    req.session.returnTo = req.originalUrl;
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const flashcard = await Flashcard.findById(id);
    //Verify visibility of flashcard
    if (!flashcard.isVisible) {
        //Verify the author of flashcard
        if (!flashcard.author.equals(req.user._id)) {
            req.flash('error', 'You don\'t have permission to access this flashcard');
            return res.redirect('/flashcards');
        }
    }
    next();
};