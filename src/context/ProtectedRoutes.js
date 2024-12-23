import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import SessionContext from "./SessionContext";

function ProtectedRoutes({ element }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext (SessionContext );

  useEffect(() => {
     if (!isLoggedIn) {
    navigate("/login");
    
  }

  },[isLoggedIn, navigate])

 console.log("I was here at protectedRoutes", isLoggedIn);
 

  return isLoggedIn?  element : null;
}

export default ProtectedRoutes;
