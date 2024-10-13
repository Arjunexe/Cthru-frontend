import React, { useContext } from "react";
import MainContext from "../../hooks/context";
import defaultLogo from "../../assests/IconAsests/defaultProfilePicture.png"

export default function ProfileField() {
    const { userDetails } = useContext(MainContext);
    console.log("there you go you filty animal : ",userDetails);
     

  return (
    <>
    <div className="">

      <img
        className="w-52 h-52 rounded-full object-cover "
        src={defaultLogo}
        alt=""
        
      />
       </div>
    </>
  );
}
