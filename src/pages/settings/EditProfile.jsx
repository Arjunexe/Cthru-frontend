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
    " w-1/2 px-4 py-2 m-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelStyle = "mr-72 p-0 text-sm font-medium text-white ";

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
        setUserDetails,
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
    <div className="h-screen w-1/2  flex pt-12 items-center  flex-col">
      <div className="   flex justify-center ">
        <div className=" relative inline-block ">
          <input
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            name="image"
            type="file"
            onChange={handleChangeClick}
          />

          <div className="w-fit relative  z-0">
            <ProfileField width="14" height="14" profilePicUrl={dP} />
            {loader && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 rounded-full pointer-events-none">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-300">
        Tap to change profile picutre
      </div>
      {/* ----------------------- */}
      <div className="w-full mb-6 ">
        <label className="block text-sm mb-2 text-gray-300">Bio</label>
        <textarea
          className="w-full p-3 rounded-lg bg-white/10 border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-white placeholder-gray-400"
          rows="3"
          placeholder="Write something about yourself..."
        ></textarea>
      </div>

      {/* Input Fields */}
      <div className="w-full space-y-5 flex flex-col justify-center">
        <div>
          <label className="block text-sm mb-1 text-gray-300">Username</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Full Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Email or Phone
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full mt-8">
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all shadow-md font-semibold">
          Save Changes
        </button>
      </div>

      {/* Change Password */}
      <div className="mt-6 w-full text-center">
        <button className="text-base text-gray-400 hover:text-blue-500 transition">
          Change Password
        </button>
      </div>

      {/* -------------------------- */}
      <div className=" flex w-full flex-col justify-center mt-9 items-center">
        <label className={labelStyle}>Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setEmailorPh(e.target.value)}
          className={inputStyle}
        />

        <label className={labelStyle}>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setEmailorPh(e.target.value)}
          className={inputStyle}
        />

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
