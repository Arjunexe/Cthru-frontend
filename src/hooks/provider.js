import { useEffect, useState } from "react";
import MainContext from "./context";
import { userData } from "../jwt/jwt";

function MainContextProvider({ children }) {
  const [imgUploaded, setImgUploaded] = useState(false);
  // Passing a function to useState for a one time use
  const [userDetails, setUserDetails] = useState(()=>{
    const storedUser = localStorage.getItem(userData)
    return storedUser ? JSON.parse(storedUser) : null;
  })

  // If useDetails exist pass that to local storage
  useEffect(() => {
    try{
    if(userDetails){
      
      localStorage.setItem(userData, JSON.stringify(userDetails))
    } else {
      localStorage.removeItem(userData);
    }
  } catch (error) {
    console.log("error during Provider :",error);
    
  }
  },[userDetails])



  return (
    <MainContext.Provider value={{ imgUploaded, setImgUploaded , userDetails, setUserDetails }}>
      {children}
    </MainContext.Provider>
  );
}


export default MainContextProvider;
