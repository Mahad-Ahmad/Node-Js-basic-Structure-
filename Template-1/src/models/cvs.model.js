const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup schema
var csvSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    isHeader: {
        type: Boolean,
        default: false
    }
  
}, {
        timestamps: true,
    });


module.exports = mongoose.model('Csv', csvSchema);