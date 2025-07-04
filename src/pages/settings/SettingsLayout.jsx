import React from "react";
import { Outlet } from "react-router-dom";
import SettingSidebar from "./SettingSidebar";

function SettingsLayout() {
  return (
    <div className="flex bg-slate-500 h-screen w-full">
      <SettingSidebar />

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;

