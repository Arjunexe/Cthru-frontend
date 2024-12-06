import React, { useContext, useEffect, useState } from "react";
import UserChatBox from "./UserChatBox";
import MainContext from "../../hooks/context";
import axios from "axios";
import { getFollowing } from "../../api/followAPI";

function UserChatList() {
  const { userDetails } = useContext(MainContext);
  const [following, setFollowing] = useState([]);

  const userId = userDetails?.userFollowData?.userId || "";


  // GET ALL THE FOLLOWING LIST, DON’T NEED TO MATCH ANYTHING !!!!!!!!!!!!!!!!!


  useEffect(() => {
   async function fetchData (userId) {
    const data = await getFollowing(userId)
    setFollowing(data)
    // console.log(followInfo);
   }
  fetchData(userId).catch((error) => {
    console.error("error during fetchData :", error);
  })
  }, []);

  console.log("hopefully it the details :", following);


  return (
    <div className="bg-gray-600 h-screen w-80  ">
      <div className=" font-bold bg-yellow-200 justify-center flex">
        <h1>Messages</h1>
      </div>
      <div className=" pt-4 bg-red-800 w-auto ">
    { following.map((user, index) => (
                <UserChatBox key={index} user= {user} />
    ))}

      </div>
    </div>
  );
}

export default UserChatList;
