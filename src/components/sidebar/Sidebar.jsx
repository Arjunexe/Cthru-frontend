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
    <div className="sidebar"> 
      <img className="sidebar_logo" src={logo} alt="failed to upload" />

      <div className="sidebar_buttons">
        <button className="sidebutton" onClick={handleHomeClick}>
          home</button>
        <button className="sidebutton">Search</button>
        <button className="sidebutton" onClick={openCreateModal}>
          Create
        </button>
        <button className="sidebutton" onClick={handleMessageClick}>
          Messages
          </button>
        <button className="sidebutton">Notifications</button>
        <button className="sidebutton" onClick={handleProfileClick}>
          Profile
        </button>
      </div>

      <div className="sidebar_more">
        <button className="sidebutton">More</button>
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
