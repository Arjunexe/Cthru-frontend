import React, { useContext, useEffect, useState } from "react";
import "../Profile/profile.css";
// import Siidebar from "../../components/sidebar/Sidebar";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../hooks/context";
import { handleUploadClickAPI } from "../../api/prfileUploadAPI";
import SessionContext from "../../hooks/SessionContext";
import ProfileGrid from "../../components/profileLayouts/profileGrid";

export default function Profile() {
  const { logout } = useContext(SessionContext);
  const [profilePicUrl, setProfilePic] = useState("");
  const [profilePic, setProfilePics] = useState("");
  const { userDetails, setUserDetails } = useContext(MainContext);
  const userName = userDetails?.userData?.Username || "Guest";
  const DP = userDetails?.userData?.ProfilePic || "Guest";

  console.log("here is you username : ", DP);

  useEffect(() => {
    setProfilePic(DP);
    console.log("The Dp is here :", DP);
  }, [DP, userDetails]);

  // Send profilePic to uploadFunction
  useEffect(() => {
    if (profilePic) {
      async function uploadProfileImage() {
        const uploadedImg = await handleUploadClickAPI(
          profilePic,
          setUserDetails
        );

        return uploadedImg;
      }
      uploadProfileImage();
    }
  }, [profilePic, setUserDetails]);

  // Handles the upload Change in Profile Page
  async function handleChangeClick(event) {
    const selectedFile = event.target.files[0];
    setProfilePics(selectedFile);
    // const uploadedImg =  handleUploadClickAPI(profilePic)
    // setUserDetails(uploadedImg)
  }

  function handleClick() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    logout();
  } //profilePic

  return (
    <div className=" h-screen w-screen bg-slate-700">
      <div className="w-96  bg-gray-400 flex ml-10">

        <div className=" relative inline-block bg-red-500">
          <input
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            name="image"
            type="file"
            onChange={handleChangeClick}
          />
          <div >
            <ProfileField width="8" height="8" profilePicUrl={profilePicUrl} />
          </div>
        </div>

        <div className="text-green-500 ml-6 text-2xl md:text-red-500 lg:text-blue-500">
          {userName}
        </div>

        <div>
          <button className="cursor-pointer" onClick={handleClick}>
            Logout
          </button>
        </div>

      </div>

        <div className="h-fit bg-cyan-600">
          <ProfileGrid />
        </div>
    </div>
  );
}

////////
// <div className="flex h-screen w-screen bg-slate-700">
//   <div>
// <div className="w-96 bg-gray-400 flex ml-10">
//   <ProfileField width="8" height="8" profilePicUrl={profilePicUrl} />
//   <div className="text-green-500 ml-6 text-2xl md:text-red-500 lg:text-blue-500">
//     {userName}
//   </div>
// </div>

/* Profile Picture Upload Section */
// <div className="bg-red-500 relative inline-block">
//   {/* Invisible file input */}
//   <input
//     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//     accept="image/jpeg, image/png, image/webp, image/jpg"
//     name="image"
//     type="file"
//     onChange={handleChangeClick}

/* Display profile picture as a button */
/* <div className="flex justify-center items-center rounded-full overflow-hidden border-2 border-gray-200">
            <ProfileField width="8" height="8" profilePicUrl={profilePicUrl} />
          </div>
        </div>

        <div>
          <button className="cursor-pointer" onClick={handleClick}>
            Logout
          </button>
        </div> */
/* </div>
    </div> */
