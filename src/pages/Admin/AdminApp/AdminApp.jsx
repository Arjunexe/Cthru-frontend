import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

function Admin() {
  const navigate = useNavigate()
  // If it's not loggedIn navigate to login otherwise navigate to dashboard
  useEffect(() =>{
    navigate("/admin/dashboard")
  },[])
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default Admin;
