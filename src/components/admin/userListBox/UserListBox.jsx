import React, { useEffect, useState } from "react";

function UserListBox({ alluser }) {
  const username = alluser.Username || "Nothing to show";

  return <div className="border bg-red-600 cursor-pointer">{username}</div>;
}

export default UserListBox;
