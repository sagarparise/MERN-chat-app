const Conversation = require("../models/conversation");
const Message = require("../models/messageModel");
const { getReceiverSocketId } = require("../sockets/socket");

const sendMessage = async(req, res)=>{
  const {id:receiverId} = req.params;
  const {message} = req.body;
  const senderId = req.user.id;
  //res.send('Message')
  console.log('sent to that user', req.user)

  try {
    let conversation = await Conversation.findOne({
      participants:{$all: [senderId, receiverId]},
    })

    

    if(!conversation){

      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
     }
     const newMessage = await Message({
        senderId,
       receiverId,
       message,
     })

     if(newMessage){
       conversation.messages.push(newMessage.id);
     }

 
   
    await Promise.all([conversation.save(), newMessage.save()])

        // SOCKET.io  functionality will go here

     const receiverSocketId = getReceiverSocketId(receiverId);

     if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage)
     }

     res.status(200).json({message: 'Message sent successfully'});
  } 
  catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }

}


const getMessage = async(req, res) => {
  const {id:userToChatId} = req.params;
  const senderId = req.user.id;

  try {
    const conversation = await Conversation.findOne({
      participants:{$all: [senderId, userToChatId]},
    }).populate('messages')

    console.log(conversation)
    if(!conversation){
     
     return res.status(200).json({messages: []});
    }

    res.status(200).json(conversation.messages);
  } 
  catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }

}

module.exports = {
  sendMessage,
  getMessage,
}