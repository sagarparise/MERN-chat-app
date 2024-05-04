import React, { useContext } from "react";
import { Grid } from "@mui/material";
import ChatSection from "./ChatSection";
import Sidebar from "./Sidebar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { authContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
function ChatDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const{authState} = useContext(authContext);
const navigate = useNavigate()
  if(!authState){
    navigate('/')
  }
  

  return (
    <div className=" w-[100%] h-[100vh]  ">
      <Grid container sx={{height: '100%'}}>
      
       {!isMobile && ( <Grid item xs={12} sm={4} md={3} sx={{height:'100%'}} >
         <Sidebar />
        </Grid>)}
        <Grid item xs={12} sm={8} md={9} sx={{height:'100%'}}>
         <ChatSection />
        </Grid>

      </Grid>
    </div>
  );
}

export default ChatDashboard;
