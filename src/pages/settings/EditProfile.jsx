import React, { useContext, useEffect, useState } from "react";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../context/context";
import {
  delteFromCloudinaryAPI,
  handleUploadClickAPI,
} from "../../api/prfileUploadAPI";

function EditProfile() {
  const [loader, setLoader] = useState(false);
  const [emailOrPh, setEmailorPh] = useState("");

  const { userDetails, setUserDetails } = useContext(MainContext);
  const dP = userDetails?.userData?.ProfilePic || "";
  const userName = userDetails?.userData?.Username || "";
  const fullName = userDetails?.userData?.Fullname || "";
  const emailOrPhnumber = userDetails?.userData?.EmailOrMobile || "";

  const inputStyle =
    " w-1/2 px-4 py-2 m-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "mr-72 p-0 text-sm font-medium text-gray-700 w-24";

  useEffect(() => {
    setEmailorPh(emailOrPhnumber);
  }, []);

  // Changing DP
  async function handleChangeClick(event) {
    setLoader(true);
    const profiePicDeleted = await delteFromCloudinaryAPI(dP);
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const newPicUploaded = await handleUploadClickAPI(
        selectedFile, 
        setUserDetails
      );
      if (newPicUploaded) {
        setTimeout(() => {
          setLoader(false);
        }, 1500);
        return newPicUploaded;
      }
    }
  }

  return (
    <div className="h-screen w-full bg-slate-700 flex justify-center flex-col">
      <div className=" bg-red-700  flex justify-center ">
        <div className="bg-yellow-500 relative inline-block ">
          <input
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            name="image"
            type="file"
            onChange={handleChangeClick}
          />

          <div className="pt-4 w-fit relative bg-gray-100 z-0">
            <ProfileField width="11" height="11" profilePicUrl={dP} />
            {loader && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 rounded-full pointer-events-none">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-pink-500">
        BIO
      </div>

      <div className="bg-yellow-200 flex ml-80 w-1/2 flex-col justify-center mt-9 items-center">
        <label className={labelStyle}>Username</label>
        <input type="text" value={userName} className={inputStyle} />

        <label className={labelStyle}>Full Name</label>
        <input type="text" value={fullName} className={inputStyle} />

        <label className={labelStyle}>Email or Phone</label>
        <input
          type="text"
          value={emailOrPh}
          onChange={(e) => setEmailorPh(e.target.value)}
          className={inputStyle}
        />

        <div className="bg-gray-400 px-4 py-2 rounded cursor-pointer hover:bg-gray-500 transition mt-4">
          Submit
        </div>
      </div>

      <div className="bg-orange-600">Change password</div>
    </div>
  );
}

export default EditProfile;
