import React, { useContext } from "react";
import SessionContext from "../../context/SessionContext";

function Logout() {
  const { logout } = useContext(SessionContext);
  async function handleLogout() {
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userData");
      logout();
    } catch (error) {
      console.log("error during handleLogout: ", error);
    }
  }
  return (
    <div className="h-full bg-slate-950 p-24 w-1/2">
      <div className="bg-slate-900">
        <button className="" onClick={handleLogout}>
          <span>logout</span>
        </button>
      </div>
    </div>
  );
}

export default Logout;
