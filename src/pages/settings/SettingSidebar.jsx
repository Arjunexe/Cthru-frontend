import React from "react";
import { Bell, Pencil, LogOut, Bookmark, Heart, X } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

function SettingSidebar() {
  const { urlUsername } = useParams();
  const options = [
    {
      label: "Edit Profile",
      icon: <Pencil />,
      path: `/${urlUsername}/settings/edit`,
    },
    // { label: "Notifications", icon: <Bell /> },  NOT rn
    {
      label: "Saved",
      icon: <Bookmark />,
      path: `/${urlUsername}/settings/saved`,
    },
    {
      label: "Liked Post",
      icon: <Heart />,
      path: `/${urlUsername}/settings/liked`,
    },
    {
      label: "Logout",
      icon: <LogOut />,
      path: `/${urlUsername}/settings/logout`,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br ">
      <div className="relative w-64 h-72 p-6 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl flex flex-col justify-center space-y-4 before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.15\'/></svg>')] before:bg-repeat before:z-[-1] before:rounded-2xl">
        {options.map(({ label, icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className="flex items-center space-x-3 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
          >
            <span className="w-5 h-5">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SettingSidebar;
