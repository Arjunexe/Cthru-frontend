import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// import MainContext from "./context";
import SessionContext from "./SessionContext";

function ProtectedRoutes({ element }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(SessionContext);

  useEffect(() => {
     if (!isLoggedIn) {
    navigate("/login");
    
  }

  },[])

 

  return isLoggedIn? element : null;
}

export default ProtectedRoutes;
