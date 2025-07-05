import React from "react";
import { Outlet } from "react-router-dom";
import SettingSidebar from "./SettingSidebar";

function SettingsLayout() {
  return (
    <div className="flex-grow flex pr-60 bg-slate-500 h-screen w-full justify-center items-center">
      <div className="pb-52">
        <SettingSidebar />
      </div>
      <Outlet />
    </div>
  );
}

export default SettingsLayout;
