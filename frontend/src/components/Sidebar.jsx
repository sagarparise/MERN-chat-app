import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Badge } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../store/AuthContext";
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import {Tooltip} from '@mui/material'
import {useNavigate } from "react-router-dom";
import { socketContext } from "../store/SocketContext";

function Sidebar() {
  const { users, setChatUser } = useContext(authContext);
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(null);
  const[searchInput, setSearchInput] = useState('')


  const filteredUsers = users.filter((user)=>(
    user.fullName.toLowerCase().includes(searchInput.toLowerCase())
  ))

  const handleActiveUser = (id, user) => {
    setChatUser(user)
    setActiveUser(id);
    navigate(`user/${id}`);

  };



  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div className=" w-full h-full bg-slate-400">

      <div className=" h-[65px] mb-2 px-4 flex justify-between items-center border-b border-gray-300 shadow-md  text-white">
       <div className=" flex justify-start items-center gap-2">
       <span>
          <ChatIcon />
        </span>
        <h2 className=" text-xl font-semibold font-serif">Chat App</h2>
       </div>
      <Tooltip title="Logout" className=" cursor-pointer">
      <LogoutIcon/>
      </Tooltip>
      </div>
     
     <div className=" p-3">
     <div className=" w-full h-9 flex justify-start items-center px-2 bg-gray-300 rounded-md hover:bg-slate-200 cursor-pointer">
          <SearchIcon className=" text-gray-500 " />
         <input type="text" placeholder="Search " value={searchInput} className="search w-[100%]  p-2 outline-none bg-transparent" onChange={(e)=> setSearchInput(e.target.value)} />
        </div>
      

      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "transparent",
          overflow: "auto",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {filteredUsers &&
          filteredUsers.map((user) => (
            <ListItemButton
              key={user._id}
              sx={{
                mb: 1,
                borderBottom: '1px solid #dbd4d4',
                bgcolor: user._id === activeUser ? "rgb(255,255,255,0.5)" : "",
                borderRadius: user._id === activeUser ? 2 : 0,
                "&:hover": {
                  backgroundColor: "rgb(255,255,255,0.5)",
                  borderRadius: 2,
                },
              }}
              onClick={() => handleActiveUser(user._id, user)}
            >
              <ListItemIcon>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  variant="dot"
                >
                  <Avatar alt="photo" src={`${user.profilePic}`} />
                </StyledBadge>
              </ListItemIcon>
              <ListItemText primary={`${user.fullName}`}/>
            </ListItemButton>
          ))}
      </List>
     </div>
       
    </div>
  );
}

export default Sidebar;
