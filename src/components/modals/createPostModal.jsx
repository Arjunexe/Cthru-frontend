import "./createPostModal.css";
import axios from "axios";
import ImageContext from "../../hooks/context";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../../jwt/jwt";
import Cropper from "react-easy-crop";

function CreatePostModal({ PostModalProp }) {
  const [img, setImg] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const { setImgUploaded } = useContext(ImageContext);

  // Replace the function name witht handleClick | crop the image then pass it to handleClick
  function handleCreateClick(event) {
    let image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setImg(reader.result);
      reader.readAsDataURL(image);
    }
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  // UPLOADING IMAGE TO CLOUDINARY
  function handleClick(event) {
    let image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "E-commerceee");
    try {
      axios
        .post(
          "https://api.cloudinary.com/v1_1/da05006gl/image/upload",
          formData
        )
        .then((response) => {
          // URL OF THE POST IMAGE
          sendImgUrl(response.data.secure_url);
        });
    } catch (error) {
      console.log("error during createPost handleclick", error);
    }
  }

  // SENDING IMAGE TO BACKEND
  async function sendImgUrl(url) {
    const Token = localStorage.getItem(jwtToken);
    if (Token) {
      try {
        const decode = jwtDecode(Token);
        const userId = decode.userId;
        // SENDING IMAGE LINK AND USER ID
        const response = await axios.post("http://localhost:5000/user/imgUrl", {
          imgUrl: url,
          userId: userId,
        });
        setImgUploaded(response);
      } catch (error) {
        console.log("error during sendImgUrl :", error);
      }
    }
  }

  return (
    <div className="modal" onClick={PostModalProp}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <div className="bg-red-700 z-20 flex">
          <input
            className="inputType"
            name="image"
            type="file"
            onChange={handleCreateClick}
          />
        </div>
        {/* Hi this is Modal */}

        {/* {img &&( */}
        <div className=" bg-red-600">
          <Cropper
            image={img}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default CreatePostModal;
