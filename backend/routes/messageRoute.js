const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageControllers');
const protectedRoute = require('../middlewares/protectedRoute');
const messageRouter = express.Router();

messageRouter.get('/:id',protectedRoute, getMessage)
messageRouter.post('/send/:id',protectedRoute,sendMessage)

module.exports = messageRouter;

