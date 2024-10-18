import React from "react";
import "./Sidebar.css";
import logo from "../../assests/IconAsests/YouTube Logo Png.png";
import { useNavigate } from "react-router-dom";

function Siidebar({ openCreateModal }) {
  const navigate = useNavigate();

  function handleHomeClick(){
    navigate("/")
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleMessageClick() {
    navigate("/message")
  }


  return (
    <div className="w-72 h-screen flex flex-col justify-between z-1 "> 
      <img className="w-32 m-4" src={logo} alt="failed to upload" />

      <div className="flex flex-col">
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4 " onClick={handleHomeClick}>
          home</button>
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">Search</button>
         
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4" onClick={openCreateModal}>
          Create
        </button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4" onClick={handleMessageClick}>
          Messages
          </button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">Notifications</button>

        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4" onClick={handleProfileClick}>
          Profile
        </button>
      </div>

      <div className="bottom-1">
        <button className="flex flex-row items-center mx-2.5 my-1 py-2.5 px-4">More</button>
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
