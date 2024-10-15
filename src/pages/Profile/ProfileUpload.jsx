import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ProfileField from "../../components/profileLayouts/ProfileField";
import { jwtToken } from "../../jwt/jwt";
import { jwtDecode } from "jwt-decode";


function ProfileUpload() {
const [profilePic, setProfilePic] = useState("")
const [profilePicUrl, setProfilePicUrl] = useState("")
  const navigate = useNavigate();

  function handleChangeClick(event){
    const selectedFile = event.target.files[0]
    setProfilePic(selectedFile)

    const fileURL = URL.createObjectURL(selectedFile);
    console.log("temp file :",fileURL);
    
    setProfilePicUrl(fileURL)

  }

 async function handleUploadClick() {

    if(!profilePic){
        alert("Select and image")
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
          console.log("and the url of profilePicture:", response.data.secure_url);
          sendProfileImgUrl(response.data.secure_url);
          navigate("/")
        });
    } catch (error) {
      console.log("error during createPost handleclick", error);
    }
  }

  // Sending ProfilePic URL to backend
  async function sendProfileImgUrl (url){
    const Token = localStorage.getItem(jwtToken)
    if(Token){
    try {
      // decode has all the token detials
      const decode = jwtDecode(Token)
      const userId = decode.userId
     // SENDING IMAGE TO BACKEND ACCORDING TO THE USER ID
      const response = await axios.post("http://localhost:5000/user/profileImgUrl",{ProfilePic:url,userId:userId})
      console.log("backend img url response :",response);
    //   setImgUploaded(response)
      
    } catch (error) {
      console.log("error during sendImgUrl :",error);
    }
  }
  }




  function handleSkipClick() {
    navigate("/");
  }
  return (
    <div>
        <ProfileField profilePicUrl={profilePicUrl} />
      <div>
        <input className="inputType" name="image" type="file" onChange={handleChangeClick}/>
      </div>
      <div>
        <button onClick={handleUploadClick}>Upload</button>
      </div>
      <div>
        <button onClick={handleSkipClick}>Skip</button>
      </div>
    </div>
  );
}

export default ProfileUpload;
