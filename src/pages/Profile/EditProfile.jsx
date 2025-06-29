import React, { useContext, useState } from "react";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../context/context";
import { handleUploadClickAPI } from "../../api/prfileUploadAPI";

function EditProfile() {
  const { userDetails, setUserDetails } = useContext(MainContext);

  const dP = userDetails?.userData?.ProfilePic || "";

  async function handleChangeClick(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const newPicUploaded = await handleUploadClickAPI(
        selectedFile,
        setUserDetails
      );
      return newPicUploaded;
    }
  }

  return (
    <div className="  h-screen w-screen  bg-slate-700 ">
      <div className=" bg-red-700 w-1/2 ml-72 flex justify-center items-center">
        <div className="bg-yellow-500 relative inline-block ">
          <input
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            name="image"
            type="file"
            onChange={handleChangeClick}
          />
          <div className="pt-4">
            <ProfileField width="11" height="11" profilePicUrl={dP} />
          </div>
        </div>

        <div className="bg-blue-700">hi</div>
      </div>
    </div>
  );
}

export default EditProfile;
