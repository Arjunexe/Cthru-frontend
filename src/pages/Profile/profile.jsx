import React, { useContext, useEffect, useState } from "react";
import "../Profile/profile.css";
import Siidebar from "../../components/sidebar/Sidebar";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../hooks/context";
// import { jwtToken } from "../../jwt/jwt";
// import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const navigate = useNavigate()
  const [profilePic, setProfilePic ] = useState("")
  const { userDetails } = useContext(MainContext);
  const userName = userDetails?.userData?.Username || "Guest";
  const DP = userDetails?.userData?.ProfilePic || "Guest";

  console.log("here is you username : ", userName);
  
  useEffect(() => {
    setProfilePic(DP)
  },[DP])

  function handleClick() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
  }

  return (
    <>
      <div className="flex h-screen w-screen ">
        <Siidebar />
        <div>
          <div>
            {userName}
            <div>
              <button className="cursor-pointer" onClick={handleClick}>Logout</button>
            </div>
            <ProfileField profilePic={profilePic} />
          </div>
        </div>
      </div>
    </>
  );
}
