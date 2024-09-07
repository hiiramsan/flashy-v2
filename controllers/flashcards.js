const Flashcard = require("../models/flashcard.js");
const Card = require("../models/card.js");


module.exports.index = async (req, res) => {
  const flashcards = await Flashcard.find({ author: req.user._id })
    .populate("author")
  /*   .populate("cards"); */
  if (flashcards.length === 0) {
    req.flash('info', "Create your first set!");
  } else {
    req.flash('info', "Create your second set!");
  }

  /* console.log("Info Flash Message:", req.flash('info'));  */

  res.render("flashcards/home", { flashcards });
};

module.exports.create = async (req, res, next) => {
  /* const flashcard = new Flashcard(req.body.flashcard);
  flashcard.author = req.user._id;
  await flashcard.save();
  console.log(flashcard);
  req.flash('sucess', "New set created!");
  res.redirect(`/flashcards/${flashcard._id}`); */
  try {
    const flashcard = new Flashcard({
      name: req.body.name,
      description: req.body.description,
      background: req.body.background,
      author: req.user._id
    });

    // cards
    const cardData = req.body.cards;
    const cards = await Card.insertMany(cardData);
    flashcard.cards = cards.map(card => card._id);
    await flashcard.save();
    res.redirect(`/flashcards/${flashcard._id}`);
  } catch (error) {
    console.error(error);
    res.redirect('/flashcards/create')
  }
};

module.exports.renderCreate = (req, res) => {
  res.render('flashcards/create');
}

module.exports.showFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id)
      .populate('cards');
    if (!flashcard) {
      req.flash("error", "This set does not exist");
      return res.redirect("/flashcards");
    }
    res.render('flashcards/show', { flashcard });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong");
    return res.redirect("/flashcards");
  }

}

module.exports.deleteFlashcard = async (req, res) => {
  const { id } = req.params;
  await Flashcard.findByIdAndDelete(id);
  res.redirect('/flashcards')
}


//Seraches for all the Flashcards(Decks) that have
//the attribute "isVisible" set to true
module.exports.explore = async (req, res) => {
  try {
    console.log('Entrando');
    // Busca las flashcards con el atributo isVisible establecido en true
    const flashcards = await Flashcard.find({ isVisible: true })
      .populate("author");
    console.log('Busca');

    // Si no se encuentran flashcards, muestra un mensaje de información
    if (flashcards.length === 0) {
      req.flash('info', 'No visible flashcards found');
      return res.redirect('/flashcards');
      console.log('No encuentra');
    }
    console.log('Sale');
    // Renderiza la vista con las flashcards encontradas
    res.render('flashcards/explore', { flashcards });

  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/flashcards");
  }
}