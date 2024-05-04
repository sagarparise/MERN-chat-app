const User = require("../models/user");

const getUserForSidebar = async(req,res)=>{
  try {
    console.log('side bar route')

    const loggedInUser = req.user.id;
    console.log(loggedInUser);
    const allUsers = await User.find({
      _id:{$ne:loggedInUser}
    }).select("-password")
    res.status(200).json({
      status: 200,
      users:allUsers
    });
  }
  catch (error) {
    res.status(500).json({status: 500,
      message: error.message});
  }

}
module.exports = {
  getUserForSidebar
}