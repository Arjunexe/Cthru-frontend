import React, { useEffect, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
// import MainContextProvider from "./context/provider";
import { jwtDecode } from "jwt-decode";
// import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MainContext from "..//src/context/context";
import { jwtToken, userData } from ".././src/jwt/jwt";
// import CommentModal from "./components/modals/commentModal/CommentModal";
import CreatePostModal from "./components/modals/createPostModal/createPostModal";
import SessionContext from "./context/SessionContext";
import { flagChangeApi, getPostData } from "./api/prfileUploadAPI";
import { connectSocket, getSocket } from "./utils/socket";
import MainSidebarAnimation from "./components/sidebar/MainSidebarAnimation";
// import UserSessionContext from "./context/sessionProvider";

function App() {
  const [postModal, setPostModal] = useState(false);
  const [redDot, setRedDot] = useState(false);
  const [userID, setUserId] = useState(null);
  const [trueFlag, setTrueFlag] = useState(false);
  const { logout } = useContext(SessionContext);
  const { setUserDetails, userDetails } = useContext(MainContext);
  const redFlag = userDetails?.userData?.notificatoinFlag || "";
  const location = useLocation();
  const navigate = useNavigate();
  const Token = localStorage.getItem(jwtToken);
  const noSidebar = ["/login", "/signup", "/ProfileUpload", "/error", "/a"];
  const noSidebarEndWith = ["/saved", "/liked", "/logout"];
  const endsWith = noSidebarEndWith.some((ending) =>
    location.pathname.endsWith(ending),
  );
  // const endsWith = location.pathname.endsWith("/edit") || location.pathname.endsWith("/saved") //eg: path.endsWith("/edit") || path.endsWith("/notification");
  const renderSidebar = !noSidebar.includes(location.pathname); // && !endsWith;

  // Emitiing userId to BACKEND using Socket.io
  useEffect(() => {
    try {
      if (Token) {
        const decodedToken = jwtDecode(Token);
        const userId = decodedToken.userId;
        if (userId) {
          const socket = connectSocket();
          socket.emit("joinUserRoom", userId);
          setUserId(userId);
        }
      }
    } catch (error) {
      console.log("error during socket in app.js: ", error);
    }
  }, [Token]);

  // Receive socket from backend
  useEffect(() => {
    const socketInstance = getSocket();

    try {
      socketInstance.on("notification:new", async (data) => {
        console.log("Notification came: ", data);

        // if (!userID) return;
        // if (redFlag) {
        //   return;
        // }

        console.log("insdie");
        const flagRedNotification = await flagChangeApi(userID, true);
        if (flagRedNotification === true) {
          setRedDot(true);
        }
      });
    } catch (error) {
      console.log("error during socket receive in app.js: ", error);
    }
  }, [userID, redFlag]);

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

        console.log("userDetails in app.js :", userData);
        const { userPost, ...filteredUserData } = userData;

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

  return (
    <div className="flex bg-slate-950  z-10  text-white ">
      {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 z-0 pointer-events-none"></div> */}
      {renderSidebar && (
        <div className="hidden sm:block ">
          <MainSidebarAnimation
            openCreateModal={toggleCreateModal}
            redDot={redDot}
            setRedDot={setRedDot}
          />
          {postModal && <CreatePostModal PostModalProp={toggleCreateModal} />}
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default App;
