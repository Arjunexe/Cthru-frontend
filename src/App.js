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
// import CommentModal from "./components/modals/commentModal/CommentModal";
import CreatePostModal from "./components/modals/createPostModal/createPostModal";
import SessionContext from "./context/SessionContext";
import { getPostData } from "./api/prfileUploadAPI";
// import UserSessionContext from "./context/sessionProvider";

function App() {
  const [postModal, setPostModal] = useState(false);
  // const [commentModal, setCommentModal] = useState(false);
  // const [commentId, setCommentId] = useState(null)
  const { logout } = useContext(SessionContext);
  const { setUserDetails } = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const Token = localStorage.getItem(jwtToken);
  const noSidebar = ["/login", "/signup", "/ProfileUpload", "/error"];
  const endsWith = location.pathname.endsWith("/edit") //eg: path.endsWith("/edit") || path.endsWith("/notification");
  const renderSidebar = !noSidebar.includes(location.pathname) && ! endsWith


  useEffect(() => {
    // SENDING THE userId TO THE BACKEND THROUGHT PARAMS TO GET LOGGED IN userDetail TO UPDATE THE CONTEXT
    async function getUser(userId) {
      try {
        const response = await getPostData(userId);

        // const response = await axios.get(
        //   `http://localhost:5000/user/getUser/${userId}`
        // );

        const stuff = response.data.userFollowData;
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
          logout();
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

  // TOGGLE CREATE MODAL
  function toggleCreateModal() {
    setPostModal((prev) => !prev);
  }

  // TOGGLE COMMENT MODAL
  // function toggleCommentModal(data) {
  //   setCommentModal((prev) => !prev);
  //   setCommentId(data)

  // }

  return (
    <>
      <div className="flex">
        {renderSidebar && (
          <div className="hidden sm:block bg-neutral-700">
            <Siidebar openCreateModal={toggleCreateModal} />
            {postModal && <CreatePostModal PostModalProp={toggleCreateModal} />}
          </div>
        )}

        {/* {commentModal && (
          <div>
            <CommentModal closeCommentModal={toggleCommentModal} commentId={commentId} />
          </div>
        )} */}

        {/* <Outlet context={{ toggleCommentModal }} /> */}
        <Outlet />
      </div>
    </>
  );
}

export default App;
