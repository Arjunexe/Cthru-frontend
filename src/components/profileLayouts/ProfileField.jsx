import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../hooks/context";
// import defaultLogo from "../../assests/IconAsests/defaultProfilePicture.png"

export default function ProfileField() {
  const [Dp, setDp] = useState("");
  const { userDetails, setUserDetails } = useContext(MainContext);
  console.log("there's your userDetails : ", userDetails);

  useEffect(() => {
    setDp(userDetails.userData.ProfilePic);
  }, [userDetails]);

  function handleProfileUpload(){
    const newProfile = "https://res.cloudinary.com/da05006gl/image/upload/v1728845334/yuyg3oob30i8jzsu1vvy.png"
    setDp(newProfile)
    setUserDetails({...userDetails,userData: {...userDetails.userData,ProfilePic: newProfile}})
  }

  return (
    <>
      <div className="">
        <img className="w-52 h-52 rounded-full object-cover " src={Dp} alt="" />
        <div className="">
          <button onClick={handleProfileUpload}>Upload</button>
        </div>
      </div>
    </>
  );
}
