const express = require('express');
const { getUserForSidebar } = require('../controllers/userControllers');
const protectedRoute = require('../middlewares/protectedRoute');

const userRouter = express.Router();

userRouter.get('/',protectedRoute,getUserForSidebar)

module.exports = {
  userRouter
}
