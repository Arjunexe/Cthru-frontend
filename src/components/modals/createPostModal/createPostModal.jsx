import "./createPostModal.css";
// import axios from "axios";
import API from "../../../api/axios";
import ImageContext from "../../../context/context";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../../../jwt/jwt";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/imageCropper";

function CreatePostModal({ PostModalProp }) {
  const [img, setImg] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  //  const [croppedImg, setCroppedImg] = useState(null)
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
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  //Passing image crop data to getCroppedImg
  async function handleUpload() {
    try {
      setLoading(true);

      const croppedImage = await getCroppedImg(img, croppedAreaPixels);
      // console.log("finalImage: ", croppedImage);
      // setCroppedImg(croppedImage)
      handleClick(croppedImage);
    } catch (error) {
      console.log("upload error: ", error);
    }
  }

  // UPLOADING IMAGE TO CLOUDINARY
  function handleClick(image) {
    // let image = event.target.files[0];

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "E-commerceee");
    try {
      API.post(
        "https://api.cloudinary.com/v1_1/da05006gl/image/upload",
        formData,
      ).then((response) => {
        PostModalProp();
        setLoading(false);

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
        const response = await API.post("/user/imgUrl", {
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
      {/* Modal body */}
      <div
        className="w-[500px] h-[500px] bg-white bg-opacity-10 border border-white border-opacity-30 rounded-2xl relative flex-col flex p-5 backdrop-blur-lg shadow-xl noise-textur"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="bg-blue-700 flex"> */}
        <input
          className="inputType"
          name="image"
          type="file"
          onChange={handleCreateClick}
        />
        {/* </div> */}
        {/* Cropper Starts */}

        {img && (
          <div className="cropper-wrapper">
            <div>
              <button
                className="croper-button relative disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
                    <div className="w-5 h-5 border-[3px] border-current border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <span
                  className={`block ${loading ? "opacity-0 mx-4" : "opacity-100"} transition-opacity duration-200`}
                >
                  Upload
                </span>
              </button>
            </div>
            <div className="crop-container">
              <Cropper
                image={img}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
        )}

        {/* Cropper Ends */}
      </div>
    </div>
  );
}

export default CreatePostModal;
