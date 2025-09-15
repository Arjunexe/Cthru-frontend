import React, { useContext } from "react";
import Chat from "../../components/chat/Chat";
import UserChatList from "../../components/chat/UserChatList";

function Message() {
  return (
    <div className="flex h-screen bg-gray-400 w-full">
      <div className="">
        <UserChatList />
      </div>
      <div className="flex-1 ">
        <Chat />
      </div>
    </div>
  );
}

export default Message;
