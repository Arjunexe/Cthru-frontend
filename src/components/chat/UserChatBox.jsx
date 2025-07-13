import React, { useEffect, useState } from "react";
import ProfileField from "../profileLayouts/ProfileField";

function UserChatBox({ user }) {
  // console.log("the dataaaaaaaaaaa", user.Username);
  const [userName, setUsername] = useState("");
  const [dp, setDp] = useState("")

  useEffect(() => {
    if (user) {
      console.log("stuffff: ", user);
      
      const username = user.Username;
      const profilePic = user.ProfilePic
      setUsername(username);
      setDp(profilePic)
    } else {
      const username = "Start following to stay connected!";
      setUsername(username);
    }
  });

  return <div className="border bg-amber-400 cursor-pointer ">
   <div>
    <ProfileField width="2" height="2" profilePicUrl={dp} />
    </div> 
    {userName}
    </div>;

}

export default UserChatBox;
