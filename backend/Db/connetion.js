const mongoose = require('mongoose');

const connectToMongoDb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to MongoDB')
    
  } catch (error) {
    console.log('error connecting to MongoDB', error.message)
  }
}

module.exports = connectToMongoDb;