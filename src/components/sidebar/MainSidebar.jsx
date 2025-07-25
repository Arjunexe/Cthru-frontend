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
  Compass,
  ImagePlus,
  Mail,
} from "lucide-react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileField from "../profileLayouts/ProfileField";
import MainContext from "../../context/context";
import Notification from "../../pages/notification/Notification";

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
            icon: <Compass />,
            path: `/explore`,
          },
          {
            label: "Create",
            icon: <ImagePlus size={25} />,
            onClick: openCreateModal,
          },
          {
            label: "Message",
            icon: <Mail />,
            path: `/message`,
          },
          {
            label: "Notification",
            icon: <Bell />,
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
      icon: <ProfileField width="1.5" height="1.5" profilePicUrl={dP} />,
      onClick: handleProfileclick,
    },
  ];

  return (
    <div className="flex mt-32   ml-10  bg-gradient-to-br ">
      <div className="relative w-60 p-6 rounded-2xl  backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl flex flex-col justify-center space-y-4">
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
              <span className="w-5 h-5 ">{icon}</span>
              <span className="text-sm font-medium ">{label}</span>
            </NavLink>
          ) : (
            <button
              key={label}
              onClick={onClick}
              className="flex items-center space-x-2 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
            >
              <span className="items-center flex overflow-hidden">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          )
        )}
      </div>
      {/* <Notification /> */}
    </div>
  );
}

export default MainSidebar;
