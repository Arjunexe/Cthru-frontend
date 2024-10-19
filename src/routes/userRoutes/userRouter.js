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
import ProtectedRoutes from "../../hooks/ProtectedRoutes";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/",
        element:<ProtectedRoutes element={<Home />} />,
      },
      
      {
        path: "profile",
        element:<ProtectedRoutes element={<Profile />} />,
      },
      {
        path:"a",
        element: <Xample />
      },
      {
        path:"message",
        element: <Message />
      },
      {
        path:"profileUpload",
        element: <ProfileUpload />
      }
    ],
  },
]);

export default Router;
