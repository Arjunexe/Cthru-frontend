import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Signup from "../../pages/signup/signup";
import Login from "../../pages/login/login";
import Home from "../../pages/home/home";
import App from "../../App";
import Profile from "../../pages/Profile/profile";
import Xample from "../../pages/egxample/xample";
import Message from "../../pages/Message/Message";
import ProfileUpload from "../../pages/Profile/ProfileUpload";
import ProtectedRoutes from "../../context/ProtectedRoutes";
import NonProtectedRoutes from "../../context/nonProtectedRoutes";
import Error from "../../pages/error/Error";
import adminRouter from "../adminRoutes/adminRouter";
import EditProfile from "../../pages/settings/EditProfile";
import SettingsLayout from "../../pages/settings/SettingsLayout";
import PrevModal from "../../pages/settings/DEMO/prevModal";
import SavedPosts from "../../pages/settings/SavedPosts";
import LIkedPosts from "../../pages/settings/LIkedPosts";
import Logout from "../../pages/settings/Logout";
import BlockedAc from "../../pages/settings/BlockedAc";
import MainSidebar from "../../components/sidebar/MainSidebar";
import Explore from "../../pages/Explore/Explore";
import MessagePage from "../../pages/egxample/XampleChat";
// import { adminRouter } from "../adminRoutes/adminRouter";
// import ProtectedRoutes from "../../context/ProtectedRoutes";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <NonProtectedRoutes element={<Login />} />,
      },

      {
        path: "signup",
        element: <NonProtectedRoutes element={<Signup />} />,
      },

      {
        path: "/",
        element: <Home />,
      },

      {
        path: ":urlUsername",
        element: <ProtectedRoutes element={<Profile />} />,
      },

      // {
      //   path: ":urlUsername/edit",
      //   element: <EditProfile />,
      // },

      {
        path: "a",
        element: <MessagePage />, // <MainSidebar /> <Xample />,    <PrevModal />,
      },
      {
        path: "explore",
        element: <Explore />,
      },

      {
        path: "message",
        element: <Message />,
      },
      {
        path: "profileUpload",
        element: <ProfileUpload />,
      },

      {
        path: "error",
        element: <Error />,
      },
      {
        path: ":urlUsername/settings",
        element: <SettingsLayout />,
        children: [
          {
            path: "edit",
            element: <EditProfile />,
          },
          {
            path: "saved",
            element: <SavedPosts />,
          },
          {
            path: "liked",
            element: <LIkedPosts />,
          },
          {
            path: "blocked_accounts",
            element: <BlockedAc />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
  adminRouter,
]);

export default Router;
