import React, {  useEffect, useState } from "react";
// import MainContext from "../../hooks/context";
// import defaultLogo from "../../assests/IconAsests/defaultProfilePicture.png"

export default function ProfileField({profilePicUrl, DP}) {
  const [Dp, setDp] = useState("");


  useEffect(() => {
    if(DP){
      setDp(DP)
    } 
    if (profilePicUrl){
      setDp(profilePicUrl)
    }

   // profilePic


    // setDp(profilePicUrl)
    // console.log("profileUrl :",profilePicUrl);
    
  }, [profilePicUrl,DP]);



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
