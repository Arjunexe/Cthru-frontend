import ChatBubble from "./ChatBubble";

export default function Chat() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-600 to-gray-500 h-screen shadow-2xl p-4 overflow-y-auto">
      {/* <div className="flex bg-gradient-to-br from-gray-600  to-gray-500 h-screen shadow-2xl"> */}
      <div className="">
        <ChatBubble />
      </div>
    </div>
  );
}
