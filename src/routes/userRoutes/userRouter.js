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

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home /> ,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
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
