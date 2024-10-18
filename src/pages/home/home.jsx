import React, {useEffect} from "react";
// import { jwtToken } from "../../jwt/jwt";
import "../home/home.css";

import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
// import CreatePostModal from "../../components/createPostModal/createPostModal";
import Suggestion from "../../components/suggestion/Suggestion";
// import { useEffect } from "react";
// import MainContext from "../../hooks/context";

function Home() {
  const navigate = useNavigate()
//  const {userDetails} = useContext(MainContext)

  // const Token = localStorage.getItem(jwtToken);

  // useEffect(()=> {
  //   if(!Token || !userDetails) {
  //     navigate("/login")
  //   }
  // },[Token, navigate, userDetails ]);

  //FUNCTION TO OPEN AND CLOSE createPostModal
  // function openCreateModal() {
  //   setPostModal(true);
  // }

  // function closeCreateModal() {
  //   setPostModal(false);
  // }


  
  // const storedToken = localStorage.getItem("jwtToken");
  // useEffect(() => {
  //   if (storedToken) {
  //     navigate("/");
  //   }
  // },[navigate, storedToken]);

  return (
    <div className="h-screen flex flex-row w-full  justify-between overflow-auto ">
      <div className="  ml-48">
        <Timeline />
      </div>

      <div className="">
        <Suggestion />
      </div>
    </div>
  );
}

export default Home;
