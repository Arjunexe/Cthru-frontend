import React from "react";
import "../home/home.css";

import Timeline from "../../components/timeline/Timeline";
import Suggestion from "../../components/suggestion/Suggestion";

function Home() {
  return (
    <div className=" *{sm:mr-11*} md:h-screen md:flex flex-row md:w-full justify-center overflow-auto bg-blue-900">
      <div className="">
        <Timeline />
      </div>
    </div>
  );
}

export default Home;
