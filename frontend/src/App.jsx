import React, { useContext, useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ChatDashboard from "./components/ChatDashboard";
import MessagesBox from "./components/MessagesBox";
import WelcomeMsg from "./components/WelcomeMsg";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "./store/AuthContext";
import ErrorPage from "./components/ErrorPage";
function App() {
  const { authState,chatUser } = useContext(authContext);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authState ? <Navigate to="/chatDashboard" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={authState ? <Navigate to="/chatDashboard" /> : <Login />}
          />
        <Route path="/chatDashboard" element={ <ChatDashboard /> }>
              <Route path="" element={<WelcomeMsg />} />
              <Route path="user/:id" element={<MessagesBox />} />
        </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
