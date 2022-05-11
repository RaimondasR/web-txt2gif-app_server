const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  textId: {
    type: String,
    required: true    
  },
  textAuthor: {
    type: String,
    required: true  
  },
  textEntered: {
    type: String,
    required: true  
  },
  textProcessed: {
    type: String,
    required: true  
  },
  textGIF: {
    type: String,
    required: true  
  },
  textCreationDate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("WebAppTextModel", textSchema);