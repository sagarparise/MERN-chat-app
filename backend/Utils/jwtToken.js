const jwt = require('jsonwebtoken');
require("dotenv").config();


const generateToken = (userData) => {
    const token = jwt.sign(userData, process.env.SECRET_KEY);
    console.log('from generate Token :',token)
  
    return token;
}


module.exports = { generateToken};