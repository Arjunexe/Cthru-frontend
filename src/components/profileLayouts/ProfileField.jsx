import React, { useEffect, useState } from "react";

export default function ProfileField({ profilePicUrl }) {
  const [Dp, setDp] = useState("");

  useEffect(() => {
    if (profilePicUrl) {
      setDp(profilePicUrl);
    }
  }, [profilePicUrl]);

  return (
    <>
      <div className="">
        <img className="w-12 h-12 rounded-full object-cover" src={Dp} alt="" />
        <div className=""></div>
      </div>
    </>
  );
}
