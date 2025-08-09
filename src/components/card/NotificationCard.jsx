import { useEffect, useState } from "react";
import ProfileField from "../profileLayouts/ProfileField";

export default function NotificationCard({ data }) {
  const [types, setTypes] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  console.log("bruh this shit lowkey: ", data.sender.Username);

  // started following you
  // liked your post
  // commented on your post

  useEffect(() => {
    setProfilePic(data.sender.ProfilePic);
    setName(data.sender.Username);

    if (data.type === "follow") {
      setTypes(`started ${data.type} you.`);
    } else if (data.type === "like") {
      setTypes("liked your post.");
    } else if (data.type === "comment") {
      setTypes("commented on your post.");
    }
  }, [data]);

  return (
    <div className="border p-3 m-3 rounded-2xl  ">
      <div className="flex">
        <ProfileField width="3" height="3" profilePicUrl={profilePic} />
        <span className="pl-1">{name}</span>
        <span className="pl-1">{types}</span>
      </div>
    </div>
  );
}
