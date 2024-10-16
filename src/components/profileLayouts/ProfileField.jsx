import React, {  useEffect, useState } from "react";
// import MainContext from "../../hooks/context";
// import defaultLogo from "../../assests/IconAsests/defaultProfilePicture.png"

export default function ProfileField({profilePic}) {
  const [Dp, setDp] = useState("");


  useEffect(() => {
    if(profilePic){
      setDp(profilePic)
    } 
    
  }, [profilePic]);



  return (
    <>
      <div className="">
        <img className="w-52 h-52 rounded-full object-cover " src={Dp} alt="" />
        <div className="">
          {/* <button onClick={handleProfileUpload}>Upload</button> */}
        </div>
      </div>
    </>
  );
}
