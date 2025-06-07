import React from "react";
import { createPortal } from "react-dom";

function PortalModal() {
  return createPortal(
    <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-5 z-30 flex justify-center items-center">
      {/* MODAL BODY */}
      <div className="w-[750px] h-[800px] p-5 relative flex flex-col rounded-[10px] bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.18)]">
        <div className="bg-orange-400">
          <button className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600">
            Post
          </button>
        </div>
      </div>
    </div>,
     document.body 
  );
}

export default PortalModal;
