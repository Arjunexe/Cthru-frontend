import React, { useContext, useEffect, useState } from "react";
import { jwtToken } from "../../jwt/jwt";
import "../home/home.css";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
import CreatePostModal from "../../components/createPostModal/createPostModal";
import MainContext from "../../hooks/context";

function Home() {
  const navigate = useNavigate();
  const [postModal, setPostModal] = useState(false);
  const { setUserDetails } = useContext(MainContext);

  const Token = localStorage.getItem(jwtToken);

  // useEffect(()=> {
  //   if(Token) {
  //     navigate("/login")
  //   }
  // });


  // Sending the userId to the backend and getting the userDetail
  async function getUser(userId) {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/getUser/${userId}`
      );
      const userDetails = response.data;

      // SENDING USER DETAILS TO THE CONTEXT
      setUserDetails(userDetails);
    } catch (error) {
      console.log("error during getUser: ", error);
    }
  }

  // Decoding UserDetails from token and passing it to the function 'getUser',
  // UseEffect helps from not looping
  useEffect(() => {
    if (Token) {
      try {
        const decodedToken = jwtDecode(Token);
        const userId = decodedToken.userId;

        // const timerToken = decodedToken.exp < Date.now() / 1000;
        const timerToken =  decodedToken.exp * 1000 < Date.now()   //Ai 
        
        if (!timerToken) {
          getUser(userId);
        } else {
          localStorage.removeItem(jwtToken)
          console.log("Token expired, navigating to login");
          navigate("/login");
          return () => navigate(null);
        }
      } catch (error) {
        console.log("Error during decoding token: ", error);
      }
    } else {
      console.log("no one is logged");
      navigate("/login");
    }
  }, [Token, navigate]);

  try {
  } catch (error) {
    console.log("error during decodToken :", error);
  }

  //Function to open and close the createPostModal
  function openCreateModal() {
    setPostModal(true);
  }

  function closeCreateModal() {
    setPostModal(false);
  }

  return (
    <div className="home h-screen">
      <div className="homepage_sidebar">
        <Sidebar openCreateModal={openCreateModal} />
      </div>
      <div className="homepage_timeline">
        <Timeline />
      </div>
      {/* Modal */}
      {postModal && <CreatePostModal PostModalProp={closeCreateModal} />}
    </div>
  );
}

export default Home;
