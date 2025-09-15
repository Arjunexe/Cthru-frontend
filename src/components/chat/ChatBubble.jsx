// export default function ChatBubble() {
//   let user = false;
//
//   return (
//     <div className="overflow-y-auto p-4 space-y-4">
//       <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-white/20 text-white rounded-tl-none break-words">
//         hii
//       </div>
//     </div>
//   );
// }
//

export default function ChatBubble() {
  let isUser = false;
  return (
    <div
      className={`flex w-full ${isUser ? "justify-start" : "justify-end"} mb-2`}
    >
      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-2 rounded-2xl break-words
          ${
            isUser
              ? "bg-white/20 text-white rounded-tl-none"
              : "bg-blue-500 text-white rounded-tr-none"
          }
        `}
      >
        hi
      </div>
    </div>
  );
}
