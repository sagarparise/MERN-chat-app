import React,{ createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import io from 'socket.io-client';

export const socketContext = createContext();

const SocketProvider = ({children})=>{
 const[socket, setSocket] = useState(null);
 const[onlineUser, setOnlineUser] = useState(null);
const{authState} = useContext(authContext)

  useEffect(()=>{
    if(authState){
        const socket = io("http://localhost:5000",{
          query:{
            userId: authState.user._id
          }
        });
        setSocket(socket);
        socket.on('onlineUser', (data)=>{
          setOnlineUser(data);
        })
        return ()=> socket.close();
    }
    else{
          if(socket){
            socket.close();
            setSocket(null);
          }
    }
  },[authState])

  return (
    <socketContext.Provider value={{socket, onlineUser}}>
      {children}
    </socketContext.Provider>
  );
}

export default SocketProvider;