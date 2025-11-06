import React, { useEffect, useState } from "react";

export default function ProfileField({
  width = "3",
  height = "3",
  profilePicUrl,
}) {
  const [Dp, setDp] = useState("");
  const pic =
    "https://res.cloudinary.com/da05006gl/image/upload/v1759860907/nu3mfyiy4vcli7vberbu.jpg";

  useEffect(() => {
    if (profilePicUrl) {
      setDp(profilePicUrl);
    } else {
      setDp(pic);
    }
  }, [profilePicUrl]);

  return (
    <>
      <div>
        <img
          className="rounded-full  border-2 border-white object-cover"
          style={{ width: `${width}rem`, height: `${height}rem` }}
          src={Dp}
          alt=""
        />
      </div>
    </>
  );
}
