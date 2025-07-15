import React, { useEffect, useState } from "react";
import ProfileField from "../profileLayouts/ProfileField";

function UserChatBox({ user }) {
  // console.log("the dataaaaaaaaaaa", user.Username);
  const [userName, setUsername] = useState("");
  const [dp, setDp] = useState("");

  useEffect(() => {
    if (user) {
      console.log("stuffff: ", user);

      const username = user.Username;
      const profilePic = user.ProfilePic;
      setUsername(username);
      setDp(profilePic);
    } else {
      const username = "Start following to stay connected!";
      setUsername(username);
    }
  });

  return (
    <div className="border py-3 bg-amber-400 cursor-pointer ">
      <div className="flex">
        <ProfileField width="3" height="3" profilePicUrl={dp} />
        <div className="pl-1">{userName}</div>
      </div>
    </div>
  );
}

export default UserChatBox;
