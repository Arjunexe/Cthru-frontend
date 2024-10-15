// import './App.css';
import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
// import MainContextProvider from "./hooks/provider";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainContext from "..//src/hooks/context";
import { jwtToken,userData } from ".././src/jwt/jwt";

function App() {
  const navigate = useNavigate();

  const { userDetails, setUserDetails } = useContext(MainContext);

  const Token = localStorage.getItem(jwtToken);
  

  

 
  useEffect(() => {

      // Sending the userId to the backend and getting the userDetail

    async function getUser(userId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/getUser/${userId}`
        );
        const userDetails = response.data;
        // console.log("userDetails in app.js :",userDetails);
        
        // SENDING USER DETAILS TO THE CONTEXT
        setUserDetails(userDetails);
      } catch (error) {
        console.log("error during getUser: ", error);
      }
    }


 // Decoding UserDetails from token and passing it to the function 'getUser',
  // UseEffect helps from not looping

    if (Token) {
      try {
        const decodedToken = jwtDecode(Token);
        const userId = decodedToken.userId;

        // const timerToken = decodedToken.exp < Date.now() / 1000;
        const timerToken = decodedToken.exp * 1000 < Date.now(); //Ai

        if (!timerToken) {
          getUser(userId);
        } else {
          localStorage.removeItem(jwtToken);
          localStorage.removeItem(userData)
          console.log("Token expired, navigating to login");
          navigate("/login");
          
        }
      } catch (error) {
        console.log("Error during decoding token: ", error);
      }
    } else {
      console.log("no one is logged");
      navigate("/login");
    }
  }, [Token, navigate, setUserDetails, userDetails ]);

  return <Outlet />;
}

export default App;
