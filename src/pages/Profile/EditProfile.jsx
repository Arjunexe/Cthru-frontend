import React, { useContext, useState } from "react";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../context/context";
import { delteFromCloudinaryAPI, handleUploadClickAPI } from "../../api/prfileUploadAPI";

function EditProfile() {
  const [loader, setLoader] = useState(false);

  const { userDetails, setUserDetails } = useContext(MainContext);
  const dP = userDetails?.userData?.ProfilePic || "";

  async function handleChangeClick(event) {
    setLoader(true);
    const profiePicDeleted = await delteFromCloudinaryAPI(dP)
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const newPicUploaded = await handleUploadClickAPI(
        selectedFile,
        setUserDetails
      );
      if (newPicUploaded) {
        setLoader(false);
        return newPicUploaded;
      }
    }
  }

  return (
    <div className="  h-screen w-screen  bg-slate-700 ">
      <div className=" bg-red-700 w-1/2 ml-72 flex justify-center items-center">
        <div className="bg-yellow-500 relative inline-block ">
          <input
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            name="image"
            type="file"
            onChange={handleChangeClick}
          />

          <div className="pt-4 w-fit relative z-0">
            <ProfileField width="11" height="11" profilePicUrl={dP} />
            {loader && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 rounded-full pointer-events-none">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-700">hi</div>
      </div>
    </div>
  );
}

export default EditProfile;
