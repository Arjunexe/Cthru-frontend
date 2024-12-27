// import './App.css';
import React, { useEffect, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
// import MainContextProvider from "./context/provider";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MainContext from "..//src/context/context";
import { jwtToken, userData } from ".././src/jwt/jwt";
import Siidebar from "./components/sidebar/Sidebar";
import CreatePostModal from "./components/modals/createPostModal";
import SessionContext from "./context/SessionContext";
import { getPostData } from "./api/prfileUploadAPI";
// import UserSessionContext from "./context/sessionProvider";

function App() {
  const location = useLocation()
  const navigate = useNavigate();
  const [postModal, setPostModal] = useState(false);
  const { logout } = useContext(SessionContext)
  const { setUserDetails } = useContext(MainContext);

  const Token = localStorage.getItem(jwtToken);
  const noSidebar =   [ "/login", "/signup", "/ProfileUpload", "/error" ]
  const renderSidebar = !noSidebar.includes(location.pathname)

  useEffect(() => {
    // SENDING THE useId TO THE BACKEND THROUGHT PARAMS TO GET LOGGED IN userDetail TO UPDATE THE CONTEXT
    async function getUser(userId) {
      try {

        const response = await getPostData(userId)

        // const response = await axios.get(
        //   `http://localhost:5000/user/getUser/${userId}`
        // );

        const stuff = response.data.userFollowData
        const userData = response.data;
        const { userPost, ...filteredUserData } = userData;
        console.log("userDetails in app.js :", filteredUserData);

        // UPDATING THE CONTEXT WITH USER DETAILS
        setUserDetails(filteredUserData);
      } catch (error) {
        console.log("error during getUser: ", error);
      }
    }

    // DECODING USER ID FROM TOKEN AND PASSING IT TO getUser
    // UseEffect HELP FROM NOT LOOPING
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
          localStorage.removeItem(userData);
          logout()
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
  }, [Token, navigate, setUserDetails, logout]);
// Open and Close Modal
  function openCreateModal() {
    setPostModal(true);
  }

  function closeCreateModal() {
    setPostModal(false);
  }

  return (
    <>
      <div className="flex">
        {renderSidebar && (
        <div className="hidden sm:block bg-neutral-700">
          <Siidebar openCreateModal={openCreateModal} />
          {postModal && <CreatePostModal PostModalProp={closeCreateModal} />}
        </div> )}
        {/* <UserSessionContext> */}
           <Outlet />
        {/* </UserSessionContext> */} 
       
      </div>
    </>
  );
}

export default App;
