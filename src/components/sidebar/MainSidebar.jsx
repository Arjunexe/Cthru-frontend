import React, { useContext, useState } from "react";
import {
  Bell,
  Pencil,
  LogOut,
  Bookmark,
  Heart,
  X,
  Ban,
  House,
} from "lucide-react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileField from "../profileLayouts/ProfileField";
import MainContext from "../../context/context";

function MainSidebar({ openCreateModal }) {
  const { urlUsername } = useParams();
  const [home, setHome] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = useContext(MainContext);
  const dP = userDetails?.userData?.ProfilePic || "Guest";
  const userName = userDetails?.userData?.Username || "";

  function handleProfileclick() {
    if (userName) {
      navigate(`/${userName}`);
    }
  }

  //   const message = location.pathname("/messages");
  const endsWith = [
    "/saved",
    "/liked",
    "/logout",
    "/edit",
    "/blocked_accounts",
  ];
  const settings = endsWith.some((ending) =>
    location.pathname.endsWith(ending)
  );

  const options = [
    {
      label: "Home",
      icon: <House />,
      path: `/`,
    },
    // { label: "Notifications", icon: <Bell /> },  NOT rn

    ...(!settings
      ? [
          {
            label: "Explore",
            icon: <Bookmark />,
            path: `/message`,
          },
          {
            label: "Create",
            icon: <Heart />,
            onClick: openCreateModal,
          },
          {
            label: "Message",
            icon: <Ban />,
            path: `/message`,
          },
          {
            label: "Notification",
            icon: <Bookmark />,
            path: `/message`,
          },
        ]
      : [
          {
            label: "Edit Profile",
            icon: <Pencil />,
            path: `/${urlUsername}/settings/edit`,
          },
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
            label: "Blocked",
            icon: <Ban />,
            path: `/${urlUsername}/settings/blocked_accounts`,
          },
          {
            label: "Logout",
            icon: <LogOut />,
            path: `/${urlUsername}/settings/logout`,
          },
        ]),
    {
      label: "Profile",
      icon: <ProfileField width="2.8" height="1.8" />,
      onClick: handleProfileclick,
    },
  ];

  return (
    <div className="flex bg-slate-400 items-center justify-center bg-gradient-to-br ">
      <div className="relative w-72 p-6 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl flex flex-col justify-center space-y-4">
        {options.map(({ label, icon, path, onClick }) =>
          path ? (
            <NavLink
              key={label}
              to={path}
              onClick={(e) => {
                if (onClick) {
                  e.preventDefault();
                  onClick();
                }
              }}
              className={({ isActive }) =>
                `flex items-center space-x-3 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all ${
                  isActive ? " bg-white/20" : ""
                }`
              }
            >
              <span className="w-5 h-5">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ) : (
            <button
              key={label}
              onClick={onClick}
              className="flex items-center space-x-3 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
            >
              <span className="w-5 h-5">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default MainSidebar;
