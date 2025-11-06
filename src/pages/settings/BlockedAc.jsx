import React, { useContext, useEffect, useState } from "react";
import UserChatBox from "../../components/chat/UserChatBox";
import MainContext from "../../context/context";
import { fetchBockList } from "../../api/settingsAPi";

function BlockedAc() {
  const [blockedList, setBlockedList] = useState([]);
  const { userDetails } = useContext(MainContext);
  const loggedUserId = userDetails?.userData?._id || "";

  useEffect(() => {
    async function getBlockedList() {
      try {
        const blockedList = await fetchBockList(loggedUserId);
        setBlockedList(blockedList);
      } catch (error) {
        console.log("error during getBlockList: ", error);
      }
    }
    getBlockedList();
  }, []);

  return (
    <div className="h-full bg-slate-950 pt-24 w-1/2">
      <div className=" bg-slate-900">
        <h1>Blocked Accounts</h1>
        <div>
          {blockedList.map((list, index) => {
            return <UserChatBox key={index} user={list} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default BlockedAc;
