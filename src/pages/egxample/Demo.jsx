import React, { useContext, useEffect, useState } from "react";
import { jwtToken } from "../../jwt/jwt";
import "../home/home.css";
import jwtDecode from "jwt-decode";
// import axios from "axios";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
import CreatePostModal from "../../components/createPostModal/createPostModal";
import ImageContext from "../../context/context";

function Home() {
  const navigate = useNavigate();
  const [postModal, setPostModal] = useState(false);
  const { setUserDetails } = useContext(ImageContext);

  const Token = localStorage.getItem(jwtToken);

  // Function to fetch user details based on userId
  const getUser = async (userId) => {
    try {
      const response = await API.get(
        `http://localhost:5000/user/getUser/${userId}`,
      );
      const userDetails = response.data;
      console.log("response of userId is:", userDetails);
      setUserDetails(userDetails); // SENDING USER DETAILS TO THE CONTEXT
    } catch (error) {
      console.log("error during getUser: ", error);
    }
  };

  // useEffect to check token validity and fetch user details
  useEffect(() => {
    if (Token) {
      try {
        const decodedToken = jwtDecode(Token);
        const userId = decodedToken.userId;
        const timerToken = decodedToken.exp < Date.now() / 1000; // Check if token is expired

        if (!timerToken) {
          getUser(userId);
        } else {
          console.log("Token expired, navigating to login");
          navigate("/login");
        }
      } catch (error) {
        console.log("error during decoding token:", error);
      }
    } else {
      console.log("No one is logged in, navigating to login");
      navigate("/login");
    }
  }, [Token, navigate, setUserDetails]); // Add necessary dependencies

  // Function to open and close the create post modal
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
