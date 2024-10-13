import { useState } from "react";
import MainContext from "./context";

function MainContextProvider({ children }) {
  const [imgUploaded, setImgUploaded] = useState(false);
  const [userDetails, setUserDetails] = useState("")

  return (
    <MainContext.Provider value={{ imgUploaded, setImgUploaded , userDetails, setUserDetails }}>
      {children}
    </MainContext.Provider>
  );
}


export default MainContextProvider;
