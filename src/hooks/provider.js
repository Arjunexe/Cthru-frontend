import { useState } from "react";
import ImageContext from "./context";

function ImageProvider({ children }) {
  const [imgUploaded, setImgUploaded] = useState(false);
  const [userDetails, setUserDetails] = useState("")

  return (
    <ImageContext.Provider value={{ imgUploaded, setImgUploaded , userDetails, setUserDetails }}>
      {children}
    </ImageContext.Provider>
  );
}


export default ImageProvider;
