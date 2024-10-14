import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/userRoutes/userRouter";
import "./index.css";
import MainContextProvider from "./hooks/provider";
/* eslint-disable import/no-webpack-loader-syntax */
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainContextProvider>
    <RouterProvider router={Router}>
      <App />
    </RouterProvider>
  </MainContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
