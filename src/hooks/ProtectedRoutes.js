import React, { useContext } from "react";
import UserSessionContext from "./sessionProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ element }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserSessionContext);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return element;
}

export default ProtectedRoutes;
