import  {useContext} from 'react'
import { authContext } from '../store/AuthContext';
import { toast } from 'react-toastify';

export const useLogout = ()=>{
 const{ setAuthState } = useContext(authContext);

 const logout = async()=>{
  try {
    const res = await fetch('http://localhost:5000/api/auth/logout',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json();
    if(data.status >= 400){
      throw new Error (data.message)
    }
    localStorage.removeItem('currentUser');
    toast.success(`${data.message}`,{
      position: 'top-right',
    })
    setAuthState(null);
    
  } 
  catch (error) {
    console.log(error)
    toast.error(`${error}`,{
      position: 'top-right',
    })
  }
 }

 return {logout}
  
}