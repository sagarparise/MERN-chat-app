const mongoose = require('mongoose');



const token = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  }
});

const Token = mongoose.model('Token', token);

module.exports = Token;
