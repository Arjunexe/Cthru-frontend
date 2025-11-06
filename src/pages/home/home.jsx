import React from "react";

import Timeline from "../../components/timeline/Timeline";

function Home() {
  return (
    <div className=" md:h-screen md:flex justify-center flex-row md:w-full overflow-auto ">
      <div className=" md:pr-60">
        <Timeline />
      </div>
    </div>
  );
}

export default Home;
