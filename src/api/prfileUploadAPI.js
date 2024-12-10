import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../jwt/jwt";
// import { useId } from "react";

// TO HANDLE CHANGE IN PROFILE FIELD
export async function handleChangeClickAPI(
  event,
  setProfilePic,
  setProfilePicUrl
) {
  try {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);

    const fileURL = URL.createObjectURL(selectedFile);

    setProfilePicUrl(fileURL);
  } catch (error) {
    console.log("error during handleChangeClickAPI", error);
  }
}

// HANDLE UPLOAD CLICK
export async function handleUploadClickAPI(profilePic, setUserDetails) {
  if (!profilePic) {
    alert("no image detected");
    return;
  }

  const formData = new FormData();
  formData.append("file", profilePic);
  formData.append("upload_preset", "E-commerceee");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/da05006gl/image/upload",
      formData
    );
    const sendImgResult = await sendProfileImgUrl(
      response.data.secure_url,
      setUserDetails
    );
    return sendImgResult;
  } catch (error) {
    console.log("error during handleUploadClickAPI :", error);
  }
}

// SENDING PROFILE PIC AND USER ID TO BACKEND THEN UPDATES THE CONTEXT | NOT USING EXPORT CAUSE ITS IN THE SAME PAGE!
async function sendProfileImgUrl(url, setUserDetails) {
  const Token = localStorage.getItem(jwtToken);
  if (Token) {
    try {
      const decode = jwtDecode(Token);
      const userId = decode.userId;
      const response = await axios.post(
        "http://localhost:5000/user/profileImgUrl",
        { ProfilePic: url, userId: userId }
      );
      // COPIES response.data.ProfilePicData INTO userData OBJECT( ALSO INSIDE ANOTHER OBJECT )
      setUserDetails({ userData: { ...response.data.ProfilePicData } });
      return response;
    } catch (error) {
      console.log("error during sendImgUrl :", error);
    }
  }
}

// HOME PAGE AND PROFILE PAGE GET POST AND USER DATA
export async function getPostData(userId) {
  try {
    const url = userId
      ? `http://localhost:5000/user/getUser/${userId}`
      : "http://localhost:5000/user/getUrl";

    const response = await axios.get(url);

    return response;
  } catch (error) {}
}
