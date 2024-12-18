import React, { useEffect, useState } from "react";

export default function ProfileField({width = '3', height = '3', profilePicUrl }) {
  const [Dp, setDp] = useState("");
  const pic = "https://res.cloudinary.com/da05006gl/image/upload/v1734407310/ywkv9vho9dn3l7lehsyo.png"

  useEffect(() => {
    if (profilePicUrl) {
      setDp(profilePicUrl);
    } else {
      setDp(pic)
    }
  }, [profilePicUrl]);

  return (
    <>
      <div className="">
        <img className="rounded-full object-cover" style={{width: `${width}rem`, height: `${height}rem`}} src={Dp} alt="" />
      </div>
    </>
  );
}
