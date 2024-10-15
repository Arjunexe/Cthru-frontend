import React, {  useEffect, useState } from "react";
// import MainContext from "../../hooks/context";
// import defaultLogo from "../../assests/IconAsests/defaultProfilePicture.png"

export default function ProfileField({profilePicUrl, profilePic}) {
  const [Dp, setDp] = useState("");


  useEffect(() => {
    if(profilePic){
      setDp(profilePic)
    } 
    if (profilePicUrl){
      setDp(profilePicUrl)
    }




    // setDp(profilePicUrl)
    // console.log("profileUrl :",profilePicUrl);
    
  }, [profilePicUrl,profilePic]);



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
