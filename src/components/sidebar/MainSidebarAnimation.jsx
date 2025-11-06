import React, { useContext, useState } from "react";
import {
  Bell,
  Pencil,
  LogOut,
  Bookmark,
  Heart,
  Ban,
  House,
  Compass,
  ImagePlus,
  Mail,
} from "lucide-react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileField from "../profileLayouts/ProfileField";
import MainContext from "../../context/context";
import Notification from "../../pages/notification/Notification";
import Redbell from "../button/Redbell";
import { flagChangeApi } from "../../api/prfileUploadAPI";

function MainSidebarAnimation({ openCreateModal, redDot, setRedDot }) {
  const { urlUsername } = useParams();
  const { userDetails, setUserDetails } = useContext(MainContext);
  const [openNotification, setOpenNotification] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dP = userDetails?.userData?.ProfilePic || "Guest";
  const userName = userDetails?.userData?.Username || "";
  const userID = userDetails?.userData?._id || "";
  const flagRed = userDetails?.userData?.notificatoinFlag || "";

  async function flagCheck() {
    if (!flagRed && !redDot) return;
    try {
      await flagChangeApi(userID, false);
      setUserDetails((prev) => ({
        ...prev,
        userData: { ...prev.userData, notificatoinFlag: false },
      }));
      setRedDot(false);
    } catch (error) {
      console.log("error during : ", error);
    }
  }

  function handleProfileclick() {
    if (userName) navigate(`/${userName}`);
  }
  function openNotificationModal() {
    setOpenNotification(true);
  }

  const endsWith = [
    "/saved",
    "/liked",
    "/logout",
    "/edit",
    "/blocked_accounts",
  ];
  const settings = endsWith.some((ending) =>
    location.pathname.endsWith(ending),
  );

  const options = [
    { label: "Home", icon: <House />, path: `/` },
    ...(!settings
      ? [
          { label: "Explore", icon: <Compass />, path: `/explore` },
          {
            label: "Create",
            icon: <ImagePlus size={25} />,
            onClick: openCreateModal,
          },
          { label: "Message", icon: <Mail />, path: `/message` },
          {
            label: "Notification",
            icon: !redDot && !flagRed ? <Bell /> : <Redbell />,
            onClick: () => {
              flagCheck();
              openNotificationModal();
            },
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

  const baseItemClasses =
    "w-full flex items-center space-x-3 text-white hover:bg-white/30 px-4 py-2 rounded-lg transition-all";

  return (
    <motion.div
      animate={{ x: settings ? 50 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex mt-32 ml-10"
    >
      <div className="relative w-60 p-6 rounded-3xl backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl flex flex-col justify-center space-y-4">
        <AnimatePresence mode="popLayout">
          {options.map(({ label, icon, path, onClick }) => {
            const content = (
              <>
                <span className="flex items-center justify-center w-5 h-5">
                  {icon}
                </span>
                <span className="text-sm font-medium">{label}</span>
              </>
            );

            const item = path ? (
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
                  `${baseItemClasses} ${isActive ? "bg-white/20" : ""}`
                }
              >
                {content}
              </NavLink>
            ) : (
              <button key={label} onClick={onClick} className={baseItemClasses}>
                {content}
              </button>
            );

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {openNotification && (
        <Notification onClose={() => setOpenNotification(false)} />
      )}
    </motion.div>
  );
}

export default MainSidebarAnimation;
