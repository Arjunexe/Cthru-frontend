import React, { useContext, useEffect, useState } from "react";
import { getNotification } from "../../api/prfileUploadAPI";
import NotificationCard from "../../components/card/NotificationCard";
import MainContext from "../../context/context";

function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const { userDetails } = useContext(MainContext);

  const userId = userDetails?.userData?._id || "Guest";

  useEffect(() => {
    async function fetchNotification() {
      try {
        if (userId) {
          const notificationData = await getNotification(userId);
          setNotifications(notificationData);
        }
      } catch (error) {
        console.log("error during fetchNotification: ", error);
      }
    }
    fetchNotification();
  }, []);

  return (
    <div
      className="w-screen flex  inset-0 fixed h-screen bg-black/20 "
      onClick={onClose}
    >
      <div className="ml-96 mt-11 relative w-96 h-[70vh]  rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl flex flex-col space-y-4 before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.15\'/></svg>')] before:bg-repeat before:z-[-1] before:rounded-2xl overflow-auto no-scrollbar">
        <div className="p-1">
          {notifications ? (
            notifications.map((data, index) => (
              <NotificationCard key={index} data={data} />
            ))
          ) : (
            <NotificationCard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
