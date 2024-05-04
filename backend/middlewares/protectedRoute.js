
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protectedRoute = async(req, res, next) => {

  try {
  
  const token =req.headers["authorization"] 

//console.log(req.headers)
   // console.log('token from protected route',token)
   if(!token)
   {
     return res.status(401).json({error: 'Token not found'});
   }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
console.log(decoded);
    if(!decoded){
      return res.status(401).json({error: 'Invalid Token'});
    }
    const user = await User.findById(decoded.id)

    if(!user){
      return res.status(401).json({error: 'User not found'});
    }
   req.user = user;
    next()
  } 
  catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }

}

module.exports = protectedRoute;