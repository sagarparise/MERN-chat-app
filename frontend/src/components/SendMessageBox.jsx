import React, { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { authContext } from "../store/AuthContext";
import {toast} from 'react-toastify'

function SendMessageBox() {
  const [inputVal, setInputVal] = useState('');
  const{chatUser, authState, setFlag} = useContext(authContext)



  const handleMessage = async() => {
  
    if(chatUser) {
     try {
       const res = await fetch(`http://localhost:5000/api/messages/send/${chatUser._id}`,{
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "authorization": authState.token,
         },
         body: JSON.stringify({
           message: inputVal,
         })
       })
       const data = await res.json()
       console.log(data)
       setInputVal('')
       setFlag(pre => !pre)
       if(data.error){
        throw new Error(data.error)
       }
       else{
        toast.success('Message sent successfully',{
          position: "top-right",      
        })
       }
      
     } catch (error) {
      console.log(error)
     }

    }
    else {
      console.log('no chatUser')
      toast.warning('Please select chatUser',{
        position: "top-right",      
      })
      
    }

  }

  return (
    <div className=" w-[100%] h-[50px] pr-5 flex justify-between gap-2 items-center border-t-2   z-10 bg-slate-100">
      <input
        type="text"
        placeholder="Write your message here..."
        className="h-full flex-1  px-10 border-none outline-none bg-inherit"
        value={inputVal}
        onChange={(e)=> setInputVal(e.target.value)}
      />
      <IconButton aria-label="sent" size="medium" onClick={handleMessage}>
        <SendIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}

export default SendMessageBox;
