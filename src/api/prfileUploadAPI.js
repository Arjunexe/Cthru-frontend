import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../jwt/jwt";



export async function handleChangeClickAPI( event, setProfilePic, setProfilePicUrl ) {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);

    const fileURL = URL.createObjectURL(selectedFile);
    console.log("temp file in api :",fileURL);

    setProfilePicUrl(fileURL)
    
}

export async function handleUploadClickAPI (profilePic) {
    if(!profilePic){
        alert("no image detected")
        return;
    }

    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("upload_preset", "E-commerceee");
    try {
        
        axios
        .post(
          "https://api.cloudinary.com/v1_1/da05006gl/image/upload",
          formData
        )
        .then((response) => {
          console.log("Your profile picture:", response);
          console.log(
            "and the url of profilePicture:",
            response.data.secure_url
          );
          sendProfileImgUrl(response.data.secure_url);
        //   navigate("/");
        });

    } catch (error) {
        console.log("error during handleUploadClickAPI :",error);
        
    }
}


async function sendProfileImgUrl (url){
    
    const Token = localStorage.getItem(jwtToken);
    if (Token) {
      try {
        // decode has all the token detials
        const decode = jwtDecode(Token);
        const userId = decode.userId;
        // SENDING IMAGE TO BACKEND ACCORDING TO THE USER ID
        const response = await axios.post(
          "http://localhost:5000/user/profileImgUrl",
          { ProfilePic: url, userId: userId }
        );
        console.log("backend img url response :", response);
        // setUserDetails(response);
        //   setImgUploaded(response)
      } catch (error) {
        console.log("error during sendImgUrl :", error);
      }
    }
}
