import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserListBox({ alluser }) {
  const username = alluser.Username || "Nothing to show";
  const navigate = useNavigate();

  function handleProfileClick() {
    const userName = username;
    navigate(`/${userName}`);
  }

  return (
    <div className="border bg-red-600 flex items-center p-4">
      <div className="w-1/4 cursor-pointer">{username}</div>
      <div className="w-1/4 cursor-pointer">{alluser.EmailOrMobile}</div>
      <div className="w-1/4 cursor-pointer">status</div>
      <div
        onClick={handleProfileClick}
        className="w-1/4 underline cursor-pointer"
      >
        View Profile
      </div>
    </div>
  );
}

export default UserListBox;
