const Flashcard = require("../models/flashcard.js");
const Card = require("../models/card.js");
const { flashcardSchema } = require("../validateSchemas.js"); 
const ExpressError = require("../utils/ExpressError.js");


module.exports.index = async (req, res) => {
  const flashcards = await Flashcard.find({ author: req.user._id })
    .populate("author")
  /*   .populate("cards"); */
  if (flashcards.length === 0) {
    req.flash('info', "Create your first set!");
  } else {
    req.flash('info', "Create your second set!");
  }
  res.render("flashcards/home", { flashcards });
};

module.exports.create = async (req, res, next) => {
  try {
    const { error } = flashcardSchema.validate(req.body);
    if(error) {
      const msg = error.details.map(el => el.message).join(',');
      throw new ExpressError(msg, 400);
    }

    let isVisible = false;
    console.log(req.body.visibility);
    if(req.body.visibility === "true") {
      isVisible = true;
    }

    const flashcard = new Flashcard({
      name: req.body.name,
      description: req.body.description,
      isVisible: isVisible,
      background: req.body.background,
      author: req.user._id
    });

    // cards
    const cardData = req.body.cards;
    const cards = await Card.insertMany(cardData);
    flashcard.cards = cards.map(card => card._id);
    await flashcard.save();

    req.flash('success', "Flashcard deck created successfully!")
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

module.exports.explore = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ isVisible: true })
      .populate("author");
  
    if (flashcards.length === 0) {
      req.flash('info', 'No visible flashcards found');
      return res.redirect('/flashcards');
    }

    res.render('flashcards/explore', { flashcards });

  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
    res.redirect("/flashcards");
    console.log("Error in explore");
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const flashcard = await Flashcard.findById(id)
  .populate('cards');
  if(!flashcard) {
    req.flash('error', 'Flashcard not found');
    return res.redirect('/flashcards');
  } 

  res.render('flashcards/edit', { flashcard });
}

module.exports.updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the incoming data
    const { error } = flashcardSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new ExpressError(msg, 400);
    }

    // Find the existing flashcard set
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      req.flash('error', 'Flashcard not found');
      return res.redirect('/flashcards');
    }

    // Update flashcard metadata
    flashcard.name = req.body.name;
    flashcard.description = req.body.description;
    flashcard.background = req.body.background;
    flashcard.isVisible = req.body.visibility === 'true';

    // Delete old cards
    await Card.deleteMany({ _id: { $in: flashcard.cards } });

    // Add new cards
    const cardData = req.body.cards;
    const cards = await Card.insertMany(cardData);
    flashcard.cards = cards.map((card) => card._id);

    // Save updated flashcard set
    await flashcard.save();

    req.flash('success', 'Flashcard updated successfully');
    res.redirect(`/flashcards/${flashcard._id}`);
  } catch (error) {
    console.error(error);
    req.flash('error', 'An error occurred while updating the flashcard');
    res.redirect(`/flashcards/${req.params.id}/edit`);
  }
};

module.exports.renderStudy = async (req, res) => {
  const { id } = req.params;
  const flashcard = await Flashcard.findById(id)
  .populate('cards');
  if(!flashcard) {
    req.flash('error', 'Flashcard Not Found');
    return res.redirect('/flashcards')
  }

  res.render('flashcards/study', {flashcard});
}

module.exports.toggleStar = async(req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if(!card) {
      req.flash('error', 'Card Not Found');
    }

    card.star = !card.star;
    await card.save();
    return res.status(200).json({ star: card.star });

  } catch(err) {
    console.log('Error toggling star');
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
}