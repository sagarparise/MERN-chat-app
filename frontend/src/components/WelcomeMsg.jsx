import React from 'react'
import ChatIcon from "@mui/icons-material/Chat";
function WelcomeMsg() {
  return (
    <div className=' w-full bg-inherit p-5 flex items-center justify-center flex-col gap-2' style={{ height: 'calc(100% - 115px)' }}>
      <h1 className='text-2xl font-bold text-black text-center'>Welcome to MERN Chat App 😊</h1>
      <p>Select a chat to start messaging</p>
        <ChatIcon />
    </div>
  ) 
}

export default WelcomeMsg