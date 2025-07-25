import React, { useContext, useEffect, useState } from "react";
import logo from "../../assests/IconAsests/YouTube Logo Png.png";
import { useLocation, useNavigate } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiSolidMessageDots } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import ProfileField from "../profileLayouts/ProfileField";
import MainContext from "../../context/context";

function Siidebar({ openCreateModal }) {
  const [profilePicUrl, setDp] = useState("");
  const { userDetails } = useContext(MainContext);
  const navigate = useNavigate();
  const profile = userDetails?.userData?.ProfilePic || "Guest";
  const UserName = userDetails?.userData?.Username || "";

  const location = useLocation();
  const messagePage = location.pathname === "/message";

  useEffect(() => {
    setDp(profile);
  }, [profile]);

  function handleHomeClick() {
    navigate("/");
  }

  function handleProfileClick() {
    const urlUsername = UserName;
    if (urlUsername) {
      navigate(`/${urlUsername}`);
    }
  }

  function handleMessageClick() {
    navigate("/message");
  }

  if (messagePage) {
    return (
      <div className=" mt-32 flex flex-col justify-between z-1 bg-red-700 ">
        {/* <img className="w-32 m-4" src={logo} alt="failed to upload" /> */}

        <div className="flex flex-col bg-neutral-700">
          <button
            className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 bg-neutral-700"
            onClick={handleHomeClick}
          >
            <GoHomeFill size={29} className="bg-neutral-700" />

            <span className="ml-4 hidden  bg-neutral-700">Home</span>
          </button>

          <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 ">
            <FaSearch size={28} className="bg-neutral-700" />{" "}
            <span className="ml-4 hidden  bg-neutral-700">Search</span>
          </button>

          <button
            className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
            onClick={openCreateModal}
          >
            <BsPlusSquareFill size={23} className="bg-neutral-700" />{" "}
            <span className="ml-4 hidden  bg-neutral-700">Create</span>
          </button>

          <button
            className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
            onClick={handleMessageClick}
          >
            <BiSolidMessageDots size={27} className="bg-neutral-700" />
            <span className="ml-3 hidden  bg-neutral-700">Messages</span>
          </button>

          <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">
            <IoIosNotifications size={29} className="bg-neutral-700" />{" "}
            <span className=" ml-3 hidden  bg-neutral-700">Notifications</span>
          </button>

          <button
            className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 "
            onClick={handleProfileClick}
          >
            <ProfileField
              width="1.8"
              height="1.8"
              profilePicUrl={profilePicUrl}
              className="bg-neutral-700"
            />
            <span className="ml-2 hidden  ">Profile</span>
          </button>
        </div>

        {/* <div className="bottom-1">
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 bg-neutral-700">
          More
        </button>
      </div> */}
      </div>
    );
  }

  return (
    <div className=" mt-40 ml-20 md:w-36 xl:w-56 flex flex-col justify-between z-1 bg-slate-400 rounded-2xl">
      {/* <img className="w-32 m-4" src={logo} alt="failed to upload" /> */}

      <div className="flex flex-col ">
        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 "
          onClick={handleHomeClick}
        >
          <GoHomeFill size={29} className="" />

          <span className="ml-4 hidden xl:block ">Home</span>
        </button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 ">
          <FaSearch size={29} className="" />{" "}
          <span className="ml-4 hidden xl:block ">Search</span>
        </button>

        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
          onClick={openCreateModal}
        >
          <BsPlusSquareFill size={24} className="" />{" "}
          <span className="ml-4 hidden xl:block ">Create</span>
        </button>

        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
          onClick={handleMessageClick}
        >
          <BiSolidMessageDots size={29} className="" />
          <span className="ml-3 hidden xl:block ">Messages</span>
        </button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">
          <IoIosNotifications size={29} className="" />{" "}
          <span className=" ml-3 hidden xl:block ">Notifications</span>
        </button>

        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 "
          onClick={handleProfileClick}
        >
          <ProfileField
            width="2"
            height="2"
            profilePicUrl={profilePicUrl}
            className=""
          />
          <span className="ml-2 hidden xl:block ">Profile</span>
        </button>
      </div>

      {/* <div className="bottom-1">
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 bg-neutral-700">
          More
        </button>
      </div> */}
    </div>
  );
}

export default Siidebar;
