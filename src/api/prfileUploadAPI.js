import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../jwt/jwt";

// TO HANDLE CHANGE IN PROFILE FIELD
export async function handleChangeClickAPI(
  event,
  setProfilePic,
  setProfilePicUrl
) {
  const selectedFile = event.target.files[0];
  setProfilePic(selectedFile);

  const fileURL = URL.createObjectURL(selectedFile);

  setProfilePicUrl(fileURL);
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

    // axios
    //   .post("https://api.cloudinary.com/v1_1/da05006gl/image/upload", formData)
    //   .then((response) => {
    //     console.log("Your profile picture:", response);
    //     console.log("and the url of profilePicture:", response.data.secure_url);
    //     // setUserDetails(response.data.secure_url)
    //     sendProfileImgUrl(response.data.secure_url, setUserDetails);
    //     //   navigate("/");
    //   });
  } catch (error) {
    console.log("error during handleUploadClickAPI :", error);
  }
}

// SENDING PROFILE PIC AND USER ID TO BACKEND THEN UPDATES THE CONTEXT
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
