import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {Drawer, Tooltip} from "@mui/material";
import Sidebar from "./Sidebar";
import { useLogout } from "../Hooks/useLogout";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../store/AuthContext";
import Popover from '@mui/material/Popover';
import Popper from '@mui/material/Popper';


function Header() {
 const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const {logout} = useLogout();
  const {authState, chatUser} = React.useContext(authContext);
  const [popover, setPopover] = React.useState(false)

React.useEffect(()=>{
 navigate('/chatDashboard')
}, [])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
const DrawerList = (
  <div className=" h-screen">
    <Sidebar />
  </div>
);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopover(false);
  };

 

  return (
    <>
    <Box sx={{ flexGrow: 1 }} className=' sticky top-0 z-10'>
      <AppBar position="static" sx={{height: '65px'}} color="info">
        <Toolbar className=" flex justify-between">
         <div className=" flex justify-start items-center ">
         {isMobile && (
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) }

        {
          chatUser?(
            <Box className='flex items-center gap-2'>
            <Avatar alt="Remy Sharp" src={`${chatUser.profilePic}`}/>
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              {chatUser.fullName}
             </Typography>
            </Box>
          ): ( <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          Chat App
         </Typography>)
        }
         </div>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
             
            <Tooltip title='Profile'>
            <MoreVertIcon/>
            </Tooltip>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=> setPopover(true)}>
                {" "}
                <Avatar alt="Remy Sharp" src={`${authState?.user.profilePic}`} />
                <Typography component="span" sx={{ ml: 1 }}>
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={()=>{
                logout();
                <Navigate to='/'/>
              }}>
                {" "}
                <LogoutIcon />{" "}
                <Typography component="span" sx={{ ml: 1 }}>
                  Logout
                </Typography>
              </MenuItem>

            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
    <CurrentPro popover={popover} setPopover={setPopover}/>
    </>
  );
}

export default Header;


const CurrentPro = ({popover,setPopover})=>{
  
  const {authState} = React.useContext(authContext);

  

  return (
    <div>
      <Popper           
        open={popover}
        onClose={()=>setPopover(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
       placement='right-end'
       
      >
      <Avatar alt="Remy Sharp" src={`${authState?.user.profilePic}`} />
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popper>
    </div>
  );
}
