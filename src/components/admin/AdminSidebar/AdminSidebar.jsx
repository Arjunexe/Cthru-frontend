import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "User List", path: "/admin/UsersAdmin" },
    { name: "All Post", path: "/admin/allPost" },
    { name: "Report", path: "/admin/report" },
  ];

  return (
    <div className="w-64  h-screen bg-yellow-800 text-white">
      <h1 className="text-xl font-bold p-4 bg-amber-300">Admin Panel</h1>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block py-2 px-4 hover:bg-gray-700 font-medium ${
                isActive ? "bg-gray-700 text-blue-400 " : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
