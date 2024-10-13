import React, { useContext } from "react";
import "../Profile/profile.css";
import Siidebar from "../../components/sidebar/Sidebar";
import ProfileField from "../../components/profileLayouts/ProfileField";
// import ImageContext from "../../hooks/context";

export default function Profile() {
  // const { userDetails } = useContext(ImageContext)
  // const userName = userDetails?.userData?.Username || "Guest"; 
  // console.log("here is you username : ",userName);

    
  function handleClick() {
    localStorage.removeItem("jwtToken");
  }

  return (
    <>
      <div className="flex h-screen w-screen ">
        <Siidebar />
        <div>
          <div
            className="bg-red-800 cursor-pointer flex "
            onClick={handleClick}
          >
            profile
            <ProfileField />
          </div>
        </div>
      </div>
    </>
  );
}


