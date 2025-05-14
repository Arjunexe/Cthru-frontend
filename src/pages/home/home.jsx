import React, {useEffect} from "react";
// import { jwtToken } from "../../jwt/jwt";
import "../home/home.css";

// import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
// import CreatePostModal from "../../components/createPostModal/createPostModal";
import Suggestion from "../../components/suggestion/Suggestion";
// import { useEffect } from "react";
// import MainContext from "../../context/context";

function Home() {

  return (
    <div className=" *{sm:mr-11*} md:h-screen md:flex flex-row md:w-full justify-between overflow-auto {*bg-lime-700*} bg-slate-800 ">
      <div className="g:ml-44 xl:ml-64 3xl:ml-auto 3xl:mr-80">
        <Timeline />
      </div>

      <div className="hidden xl:block bg-slate-800">
        <Suggestion />  
      </div>
    </div>
  );
}

export default Home;
