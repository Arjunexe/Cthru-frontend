import "./createPostModal.css";
import axios from "axios"
import ImageContext from "../../hooks/context";
import { useContext } from "react";
import {jwtDecode} from 'jwt-decode'
import { jwtToken } from "../../jwt/jwt";


function CreatePostModal({ PostModalProp }) {
   const { setImgUploaded } = useContext(ImageContext)
 


   // UPLOADING IMAGE TO CLOUDINARY
    function  handleClick (event) {
    let image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset","E-commerceee");
    try{
     axios.post("https://api.cloudinary.com/v1_1/da05006gl/image/upload", formData).then((response) => {
      // URL OF THE POST IMAGE
       sendImgUrl(response.data.secure_url)
     })
    
    } catch (error){
      console.log("error during createPost handleclick", error);
    }
  }



  // SENDING IMAGE TO BACKEND
  async function sendImgUrl  (url){
    const Token = localStorage.getItem(jwtToken)
    if(Token){
    try {
      const decode = jwtDecode(Token)
      const userId = decode.userId
     // SENDING IMAGE LINK AND USER ID
      const response = await axios.post("http://localhost:5000/user/imgUrl",{imgUrl:url,userId:userId})
      setImgUploaded(response)
      
    } catch (error) {
      console.log("error during sendImgUrl :",error);
    }
  }
}


  return (
    <div className="modal" onClick={PostModalProp}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        Hi this is Modal
        <input
          className="inputType"
          name="image"
          type="file"
          onChange={handleClick}
        />
        <div></div>
      </div>
    </div>
  );
}

export default CreatePostModal;
