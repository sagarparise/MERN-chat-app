import React, { useContext, useEffect, useState } from 'react'
import {Avatar} from '@mui/material'
import { useParams } from 'react-router-dom';
import { authContext } from '../store/AuthContext';
import exactTime from '../utils/exactTime';
import { socketContext } from '../store/SocketContext';
function MessagesBox() {
 const{authState,flag} = useContext(authContext)
 const {id} = useParams()
 const [message, setMessage] = useState([]);
 const {socket} = useContext(socketContext)
 useEffect(()=>{
  getMessage(id)
 }, [flag, setMessage])

useEffect(()=>{

    socket?.on("newMessage",(newMessage)=>{
      setMessage([...message, newMessage])
    });
    return ()=>{
      socket?.off("newMessage")
    }

 }, [socket, setMessage, message])
 const getMessage = async()=>{
  try {
    const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authState.token,
      }
    })
    const data = await res.json()
    let array = Array.from(data);

   setMessage([...array])
    
  } catch (error) {
    console.log(error)
  }

 }
  return (
    <div  style={{ height: '84%' }} className=' w-full bg-inherit p-5 overflow-y-scroll flex flex-col gap-3'>
     {
     (message.length > 0 && message) ? 
     <>
      { message.map((msg,i)=>(
         <Message key={i} text={msg} />  
      ))}
     </> : <> <div>Send message to start conversion</div> </>
     }  
    </div>
  )
}

export default MessagesBox;

const Message = ({text})=>{
  const{authState, chatUser} = useContext(authContext)

  const fromMe = text.senderId === authState.user.id;
  const formatTime = exactTime(text.createdAt)
  const profileImg = fromMe ? authState.user.profilePic: chatUser?.profilePic;


  const msgStyle = {
   maxWidth: '80%',
    padding: '1px',
    cursor:'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    
  }

  return (
   <>
   {fromMe? <>
    <div style={msgStyle} className={`w-fit flex mb-2 gap-2 msg self-end relative`}>

    <div className={`bg-white text-black py-1 rounded-md ${fromMe? ' bg-blue-600': ' bg-black'}`} >
     <p className='px-3'>
       {text.message}
     </p>
     <p className=' text-end text-[10px] text-gray-400 absolute bottom-[-15px] left-2'>{formatTime}</p>
   </div>
   <Avatar alt="Remy Sharp" src={`${profileImg}`} />
  </div>
   
   </>:<>
   <div style={msgStyle} className={`w-fit flex mb-2 gap-2 msg self-start relative`}>
    
     <Avatar alt="Remy Sharp" src={`${profileImg}`} />

     <div className={`bg-white text-black py-1 rounded-md ${fromMe? ' bg-blue-600': ' bg-black'}`} >
      <p className=' px-3'>
        {text.message}
      </p>
      <p className=' text-end text-[10px] text-gray-400 absolute bottom-[-15px] right-2'>{formatTime}</p>
    </div>
   </div>
   </>}
   </>
  )
}