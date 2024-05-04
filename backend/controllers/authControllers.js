const { generateToken } = require("../Utils/jwtToken");
const { userDataValidation } = require("../Utils/userValidation");
const Token = require("../models/tokenModel");
const User = require("../models/user");
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
  const { fullName, username, email, password, gender } = req.body;

  console.log(req.body);

  //userDataValidation

  try {
    await userDataValidation({ fullName, username, email, password, gender });
  }
   catch (error) {
    console.log(error)
    
    return res.send({
      status: 400,
      message: error,
    });
  }

  try {
    //user existence
    const user = await User.findOne({ username });

    if (user) {
      return res.send({
        status: 400,
        message: "user already exists",
      });
    }

    //password hashing algorithm
  const hashPassword = await bcrypt.hash(password, Number(process.env.SALT))
    // user Data store in MongoDB

   const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`
   const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`

   
   const newUser = new User({
    fullName,
    username,
    email,
    password :hashPassword,
    gender,
    profilePic: gender === 'male' ? boyPic :girlPic, 
   })

   console.log(newUser)
   // generate jwt token
   const tkn = generateToken({id: newUser.id, username: newUser.username});
   console.log(tkn)
  
  res.cookie('jwt', tkn, {
    httpOnly: true,
  })

  console.log('token in signIn auth : ',tkn);


  await newUser.save();
  
   res.status(201).json({ user:{
    fullName: newUser.fullName,
    username: newUser.username,
    email: newUser.email,
    gender: newUser.gender,
    profilePic: newUser.profilePic,
    id: newUser.id
   
   },
   token: tkn,
    message: 'User Created Successfully'})

  } catch (error) {
    return res.send({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

const login = async(req, res) => {
  const{username, email, password} = req.body;
  console.log(username, email, password);

 if(!username || !email || !password){
   return res.send({
     status: 400,
     message: 'All fields are required'
   })
 }

 try {
   const user = await User.findOne({username})
   console.log(user)
    const isPasswordMatch = await bcrypt.compare(password, user?.password || "");
   console.log(isPasswordMatch)

    if(!user || !isPasswordMatch){
      return res.send({
        status: 400,
        message: 'Invalid username or password'
      })
    }
 
   const tkn = generateToken({id: user.id, username: user.username});
 

 console.log('token in login auth : ',tkn);
     
 res.cookie('jwt', tkn, {
  httpOnly: true,
  sameSite: 'strict'
})
     


    res.status(200).json({
      user:{
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic,
        id: user.id
      },
      status: 200,
      token: tkn,
      message: 'User Logged In Successfully',
      
    })

 } 
 catch (error) {
  return res.send({
    status: 500,
    message: 'Internal Server Error',
  });
 }

};

const logout = async(req, res)=>{
    try {
    //  res.cookie("jwt", "",{maxAge: 0})
    res.clearCookie('jwt');
      res.send({
        status: 200,
        message: 'User Logged Out Successfully'
      })
    } 
    catch (error) {
      res.send({
        status: 500,
        message: 'Internal Server Error',
      })
    }
}

module.exports = { signUp, login, logout };
