import React from "react";
import "../settingsModal/settingsModal.css";
import { useNavigate } from "react-router-dom";
// import texture from "../../../assests/textures/Mesh.png"

function SettingsModal({ onClose, logout, loggedIn, urlUsername }) {
  const navigate = useNavigate();
  const buttonStyle =
    "w-80 h-12 items-center justify-center hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-150 shadow shadow-black/20 ";
  const spanStyle = "text-white text-opacity-95";

  return (
    <div
      className="w-full h-full fixed inset-0 top-0 left-0   bg-black bg-opacity-10 z-30 flex justify-center items-center"
      onClick={onClose}
    >
      {/* modal body */}
      <div
        className="w-80 items-center relative flex flex-col bg-white bg-opacity-10 backdrop-blur-lg 
        border border-white border-opacity-30
        rounded-2xl shadow-xl noise-texture overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {loggedIn && (
          <>
            {/* <button className={buttonStyle} onClick={()=>{navigate(`/settings/${urlUsername}/edit`)}}>
              <span className={spanStyle}>Edit Profile</span>
            </button> */}

            <button
              className={buttonStyle}
              onClick={() => {
                navigate(`/${urlUsername}/settings/edit`);
              }}
            >
              <span className={spanStyle}>Settings</span>
            </button>

            <button className={buttonStyle} onClick={logout}>
              <span className={spanStyle}>Logout</span>
            </button>
          </>
        )}

        {!loggedIn && (
          <>
            {/* <button className={buttonStyle}> */}
            {/*   <span className={spanStyle}>Send Message</span> */}
            {/* </button> */}
            {/**/}
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
