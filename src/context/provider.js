import { useEffect, useState } from "react";
import MainContext from "./context";
import { userData } from "../jwt/jwt";

function MainContextProvider({ children }) {
  const [imgUploaded, setImgUploaded] = useState(false);
  // PASSING A FUNCTION TO USESTATE FOR A ONE TIME USE
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem(userData);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // IF userDetails EXIST PASS THAT TO LOCAL STORAGE
  useEffect(() => {
    try {
      if (userDetails) {
        localStorage.setItem(userData, JSON.stringify(userDetails));
      } else {
        localStorage.removeItem(userData);
      }
    } catch (error) {
      console.log("error during Provider :", error);
    }
  }, [userDetails]);

  return (
    <MainContext.Provider
      value={{ imgUploaded, setImgUploaded, userDetails, setUserDetails }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
