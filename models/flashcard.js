const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('./card');

const opts = { toJSON: { virtuals: true } }

const FlashcardSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    background: { type: String, required: false },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }
    ],

}, opts);

FlashcardSchema.virtual('cardCount').get(function () {
    return this.cards.length;
});

FlashcardSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Card.deleteMany({
            _id: {
                $in: doc.cards
            }
        })
    }
})

module.exports = mongoose.model('Flashcard', FlashcardSchema);