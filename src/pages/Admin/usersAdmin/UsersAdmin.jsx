import React, { useEffect, useState } from "react";
import UserListBox from "../../../components/admin/userListBox/UserListBox";
import { getAllUser } from "../../../api/adminAPI";

function UsersAdmin() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchAllUser() {
      try {
        const allUser = await getAllUser();
        setAllUsers(allUser);
        console.log("allUser in user: ", allUser);
      } catch (error) {
        console.log("error during fetchAllUser: ", error);
      }
    }

    fetchAllUser();
  }, []);

  return (
    <div className="bg-slate-400 w-full ">
      <div className="font-semibold text-xl pl-9">Search</div>
      <div>
        <div className="border bg-white cursor-pointer flex items-center p-4">
          <div className="w-1/4">Name</div>
          <div className="w-1/4">Email</div>
          <div className="w-1/4">Status</div>
          <div className="w-1/4">Action</div>
        </div>
      </div>
      <div>
        {allUsers.map((alluser, index) => (
          <UserListBox key={index} alluser={alluser} />
        ))}
      </div>
    </div>
  );
}

export default UsersAdmin;
