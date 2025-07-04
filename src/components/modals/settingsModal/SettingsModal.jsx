import React from "react";
import { useNavigate } from "react-router-dom";
import texture from "../../../assests/textures/Mesh.png"

function SettingsModal({ onClose, logout, loggedIn, urlUsername }) {
  const navigate = useNavigate()
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
        className="w-80 items-center relative flex flex-col bg-[rgba(255,255,255,0.49)]  shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] backdrop-blur rounded-2xl overflow-hidden"
        style={{ backgroundImage: `url(${texture})` }}
        onClick={(e) => e.stopPropagation()}
      >
        {loggedIn && (
          <>
            <button className={buttonStyle} onClick={()=>{navigate(`/settings/${urlUsername}/edit`)}}>
              <span className={spanStyle}>Edit Profile</span>
            </button>

            <button className={buttonStyle} onClick={()=>{navigate(`/settings/${urlUsername}/edit`)}}>
              <span className={spanStyle}>Settings</span>
            </button>

            <button className={buttonStyle}>
              <span className={spanStyle}>Saved</span>
            </button>

            <button className={buttonStyle}>
              <span className={spanStyle}>Notifications</span>
            </button>

            <button className={buttonStyle} onClick={logout}>
              <span className={spanStyle}>Logout</span>
            </button>
          </>
        )}

        {!loggedIn && (
          <>
            <button className={buttonStyle}>
              <span className={spanStyle}>Send Message</span>
            </button>

            <button className={buttonStyle}>
              <span className={spanStyle}>Report</span>
            </button>

            <button className={buttonStyle}>
              <span className={spanStyle}>Block</span>
            </button>
          </>
        )}

        <button className={buttonStyle} onClick={onClose}>
          <span className={spanStyle}>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
