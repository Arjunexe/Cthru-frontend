import React, { useContext, useEffect, useState } from "react";
import UserChatBox from "./UserChatBox";
import MainContext from "../../context/context";
import axios from "axios";
import { getFollowing } from "../../api/followAPI";

function UserChatList() {
  const { userDetails } = useContext(MainContext);
  const [following, setFollowing] = useState([]);

  const userId = userDetails?.userFollowData?.userId || "";


  // GET ALL THE FOLLOWING LIST, DON’T NEED TO MATCH ANYTHING !!!!!!!!!!!!!!!!!


  useEffect(() => {
   async function fetchData () {
    const data = await getFollowing(userId)
    setFollowing(data)
   // console.log(following);
   }
  fetchData().catch(err => console.error("error during fetchData: ", err))
  }, []);

  console.log("userNames: ", following);


  return (
    <div className="bg-gray-600 h-screen w-80  ">
      <div className=" font-bold bg-yellow-200 justify-center flex">
        <h1>Messages</h1>
      </div>
      <div className=" pt-4 bg-red-800 w-auto ">

    {following?   following.map((user, index) => (
                <UserChatBox key={index} user= {user} />
    ))  : <UserChatBox /> }

   

      </div>
    </div>
  );
}

export default UserChatList;
