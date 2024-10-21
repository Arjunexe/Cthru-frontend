import React, { useEffect, useState } from "react";

export default function ProfileField({width = '3', height = '3', profilePicUrl }) {
  const [Dp, setDp] = useState("");

  useEffect(() => {
    if (profilePicUrl) {
      setDp(profilePicUrl);
    }
  }, [profilePicUrl]);

  return (
    <>
      <div className="">
        <img className="rounded-full object-cover" style={{width: `${width}rem`, height: `${height}rem`}} src={Dp} alt="" />
        <div className=""></div>
      </div>
    </>
  );
}
