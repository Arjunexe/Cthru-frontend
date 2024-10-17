import React, { useContext, useEffect, useState } from "react";
import "../Profile/profile.css";
import Siidebar from "../../components/sidebar/Sidebar";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../hooks/context";
import { handleUploadClickAPI } from "../../api/prfileUploadAPI";
// import { jwtToken } from "../../jwt/jwt";
// import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const navigate = useNavigate()
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

  //
  useEffect(() => {
    if (profilePic) {
      async function uploadProfileImage() {
        const uploadedImg = await handleUploadClickAPI(profilePic,setUserDetails);

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
  } //profilePic

  return (
    <>
      <div className="flex h-screen w-screen ">
        <Siidebar />
        <div>
          <div>
            {userName}
            <div>
              <button className="cursor-pointer" onClick={handleClick}>
                Logout
              </button>
            </div>
            <ProfileField profilePicUrl={profilePicUrl} />
          </div>
          <div>
            <input
              className="inputType"
              name="image"
              type="file"
              onChange={handleChangeClick}
            />
            {/* <button onClick={handleChangeClick}>Upload</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
