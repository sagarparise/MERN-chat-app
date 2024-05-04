
const express = require('express');
const router = express.Router();

const {signUp, login, logout} = require('../controllers/authControllers.js');

router.get('/', function (req, res) {
  const cookie = req.cookies;
  console.log(cookie)
  res.send('Hello World!')
})

router.post('/signup', signUp)

router.post('/login', login)


router.post('/logout', logout)



module.exports = router;