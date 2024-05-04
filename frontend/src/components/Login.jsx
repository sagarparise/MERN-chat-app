import React, { useContext, useState } from "react";
import { TextField, Container, Grid, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButtton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../store/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const{ setAuthState} = useContext(authContext)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
     
      const data = await res.json();
      console.log(data)

      if(data.status >= 400){
        toast.error(`${data.message}`, {
          position: 'top-right',
        });
       }
       else{
        localStorage.setItem('currentUser', JSON.stringify(data));
       
        setAuthState(data)
        toast.success(`${data.message}`, {
          position: 'top-right',
        });
         setFormData({
          username: "",
          email: "",
          password: "",
        })
       navigate('/chatDashboard')

       }
      setLoading(false)

    } 
    catch (error) {
      setLoading(false)
       toast.error(`Something wrong`, {
          position: 'top-right',
        });
    }



  };

  const styleThemes = createTheme({
    palette: {
      btnColor: {
        main: "#0288d1",
        light: "#03a9f4",
        dark: "#01579b",
        contrastText: "#242105",
      },
    },
  });

  return (
    <ThemeProvider theme={styleThemes}>
      <div className=" w-full h-screen flex justify-center items-center px-3">
        <Container
          maxWidth="xs"
          className=" bg-white py-10 shadow-md border rounded-md"
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  <ChatIcon color="info" fontSize="large" />
                  <span className=" px-2">Chat Application</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Login
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Username"
                  type="text"
                  name="username"
                  size="small"
                  value={formData.username}
                  onChange={handleChangeInput}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email"
                  size="small"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChangeInput}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButtton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="btnColor"
                  style={{ color: "#fff" }}
                  loading={loading}
                  loadingPosition="start"
                >
                  login
                </LoadingButtton>
              </Grid>
            </Grid>
          </form>
          <Typography align="center" className="pt-2">
            Don't have an account{" "}
            <span className=" text-cyan-600 underline pl-1 cursor-pointer" onClick={()=> navigate('/')}>
              signUp
            </span>
          </Typography>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;
