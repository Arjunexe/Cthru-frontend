import React from "react";

function SettingsModal({ onClose }) {
  const buttonStyle =
    "w-80 h-12 items-center justify-center hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-150 shadow shadow-black/20";
  const spanStyle = "font-medium";

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-25 z-30 flex justify-center items-center"
      onClick={onClose}
    >
      {/* modal body */}
      <div
        className="w-80 items-center relative flex flex-col bg-[rgba(255,255,255,0.35)]  shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] backdrop-blur-md rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={buttonStyle}>
          <span className={spanStyle}>Edit Profile</span>
        </button>

        <button className={buttonStyle}>
          <span className={spanStyle}>Saved</span>
        </button>

        <button className={buttonStyle}>
          <span className={spanStyle}>Logout</span>
        </button>

        <button className={buttonStyle}>
          <span className={spanStyle}>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
