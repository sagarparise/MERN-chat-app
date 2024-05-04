import React from 'react'
import Header from './Header';
import MessagesBox from './MessagesBox';
import SendMessageBox from './SendMessageBox';
import { Outlet } from 'react-router-dom';
function ChatSection() {
  return (
    <div className='h-full bg-slate-100 relative'>
     <Header/>
      <Outlet/>
    <SendMessageBox/>
    </div>
  )
}

export default ChatSection