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
    },
    status: {
        type: String,
        enum: ['in_progress', 'known', 'new'],
        default: 'new'
    },
    star: {
        type: Boolean,
        default: false  
      }
});

module.exports = mongoose.model('Card', CardSchema);