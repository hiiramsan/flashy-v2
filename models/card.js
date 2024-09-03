const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    term: {
        type: String,
        required: false
    }, 
    definition: {
        type: String, 
        required: false
    }
});

module.exports = mongoose.model('Card', CardSchema);