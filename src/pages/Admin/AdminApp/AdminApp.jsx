import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

function Admin() {
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default Admin;
