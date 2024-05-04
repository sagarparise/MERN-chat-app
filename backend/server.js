const express = require('express');

const dotenv = require('dotenv');
const router = require('./routes/authRoutes');
const connectToMongoDb = require('./Db/connetion');
const messageRouter = require('./routes/messageRoute');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/userRoute');
const cors = require('cors');
const {app, server} = require('./sockets/socket')
const path = require('path')  
const dirname = path.resolve();

dotenv.config();
const PORT = process.env.PORT || 8000

//middleware 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/auth', router)
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)
app.options("*", cors()); 

app.use(express.static(path.join(dirname, 'frontend/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server listening on ${PORT}`);
});