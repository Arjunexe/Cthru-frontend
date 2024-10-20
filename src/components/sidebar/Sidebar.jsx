import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import logo from "../../assests/IconAsests/YouTube Logo Png.png";
import { useNavigate } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiSolidMessageDots } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import ProfileField from "../profileLayouts/ProfileField";
import MainContext from "../../hooks/context";


function Siidebar({ openCreateModal }) {
  const [profilePicUrl, setDp] = useState("")
  const { userDetails } = useContext(MainContext)
  const navigate = useNavigate();
  const profile = userDetails?.userData?.ProfilePic || "Guest";

  useEffect(() => {
    setDp(profile)
  },[profile])

  function handleHomeClick() {
    navigate("/");
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleMessageClick() {
    navigate("/message");
  }

  return (
    <div className=" mt-10 md:w-36  flex flex-col justify-between z-1 bg-orange-500 ">
      {/* <img className="w-32 m-4" src={logo} alt="failed to upload" /> */}

      <div className="flex flex-col">
        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 "
          onClick={handleHomeClick}
        >
          <GoHomeFill /> <span className=" hidden xl:block">Home</span> 
        </button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">
         <FaSearch /> <span className=" hidden xl:block">Search</span> 
        </button>

        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
          onClick={openCreateModal}
        >
         <BsPlusSquareFill /> <span className=" hidden xl:block">Create</span> 
        </button>

        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
          onClick={handleMessageClick}
        >
         <BiSolidMessageDots /><span className=" hidden xl:block">Messages</span> 
        </button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">
        <IoIosNotifications />  <span className=" hidden xl:block">Notifications</span> 
        </button>

        <button
          className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4"
          onClick={handleProfileClick}
        >
        <ProfileField profilePicUrl={profilePicUrl} />  <span className=" hidden xl:block">Profile</span> 
        </button>
      </div>

      <div className="bottom-1">
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">
          More
        </button>
      </div>
    </div>
  );
}

// import { Sidebar } from 'flowbite-react';
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

// function Siidebar() {
//   return (
//     <Sidebar aria-label="Default sidebar example">
//       <Sidebar.Items>
//         <Sidebar.ItemGroup>
//           <Sidebar.Item href="#" icon={HiChartPie}>
//             Dashboard
//           </Sidebar.Item>
//           <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
//             Kanban
//           </Sidebar.Item>
//           <Sidebar.Item href="#" icon={HiInbox} label="3">
//             Inbox
//           </Sidebar.Item>
//           <Sidebar.Item href="#" icon={HiUser}>
//             Users
//           </Sidebar.Item>
//           <Sidebar.Item href="#" icon={HiShoppingBag}>
//             Products
//           </Sidebar.Item>
//           <Sidebar.Item href="#" icon={HiArrowSmRight}>
//             Sign In
//           </Sidebar.Item>
//           <Sidebar.Item href="#" icon={HiTable}>
//             Sign Up
//           </Sidebar.Item>
//         </Sidebar.ItemGroup>
//       </Sidebar.Items>
//     </Sidebar>
//   );
// }

export default Siidebar;
