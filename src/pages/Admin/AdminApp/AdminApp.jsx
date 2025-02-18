import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

function Admin() {
  // If it's not loggedIn navigate to login otherwise navigate to dashboard
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default Admin;
