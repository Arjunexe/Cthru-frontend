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
      <div className="font-semibold text-xl pl-9">Active users</div>
      <div>
        {allUsers.map((alluser, index) => (
          <UserListBox key={index} alluser={alluser} />
        ))}
      </div>
    </div>
  );
}

export default UsersAdmin;
