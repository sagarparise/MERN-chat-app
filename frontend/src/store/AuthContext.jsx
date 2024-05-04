import React,{ createContext, useState,useEffect } from "react";


export const authContext = createContext();

const Authprovider = ({children})=>{
  const val = JSON.parse(localStorage.getItem('currentUser')) ?? null;
  const[authState, setAuthState] = useState(val)
 const[users, setUsers] = useState([]);
 const [chatUser, setChatUser] = useState(null);
 const [flag, setFlag] = useState(false);

  useEffect(()=>{
  if(authState){
    sidebarUsers();
  }
  }, [authState]);

  const sidebarUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/', {
        method: 'GET',

        headers: {
          "Content-Type": "application/json",
          "authorization": authState.token
        },
    
      });
  
      const data = await res.json();
      setUsers(data.users)
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <authContext.Provider value={{authState, setAuthState,chatUser, setChatUser, users, setFlag, flag}}>
      {children}
    </authContext.Provider>
  )
}

export default Authprovider;