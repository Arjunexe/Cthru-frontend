import React, { useContext, useEffect, useState } from "react";
// import Siidebar from "../../components/sidebar/Sidebar";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../context/context";
import { getPostData, handleUploadClickAPI } from "../../api/prfileUploadAPI";
import SessionContext from "../../context/SessionContext";
import ProfileGrid from "../../components/profileLayouts/profileGrid";
import { useNavigate, useParams } from "react-router-dom";
import SettingsModal from "../../components/modals/settingsModal/SettingsModal";

export default function Profile() {
  const { logout } = useContext(SessionContext);
  const [profilePicUrl, setProfilePic] = useState("");
  const [UserName, setUserName] = useState("");
  const [profilePic, setProfilePics] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [post, setPost] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [settingsModal, setSettingsModal] = useState(false);
  const navigate = useNavigate();
  const { urlUsername } = useParams();
  const { userDetails, setUserDetails, imgUploaded } = useContext(MainContext);
  const userName = userDetails?.userData?.Username || "Guest";
  const DP = userDetails?.userData?.ProfilePic || "Guest";
  const userId = userDetails?.userData?._id || "Guest";

  // CHECK IF THE USER IS LOGGED IN OR NOT
  useEffect(() => {
    function checkLoggedIn() {
        console.log("lowkeyyyyyyyy: ", userId);

      if (userName === urlUsername) {
        console.log("its the logged user");
        setLoggedIn(true);
      } else {
        console.log("its NOT the logged user");

        setLoggedIn(false);
      }
    }
    checkLoggedIn();
  }, [userName, urlUsername]);

  // FETCH PUBLIC USER DATA
  useEffect(() => {
    async function getProfile() {
      if (loggedIn) {
        return;
      }
      try {
        const response = await getPostData(urlUsername);
        if (response.status === 200) {
          setProfileData(response.data);
        } else { 
          navigate("/error");
        }
      } catch (error) {
        console.log("error during getProfile: ", error);
        navigate("/error");
      }
    }
    getProfile();
  }, [loggedIn, urlUsername]);

  // SET DP
  useEffect(() => {
    if (loggedIn) {
      setProfilePic(DP);
    } else if (profileData?.userData?.ProfilePic) {
      setProfilePic(profileData.userData.ProfilePic);
    }
  }, [DP, userDetails, profileData, urlUsername, loggedIn]);

  // SET USERNAME
  useEffect(() => {
    if (loggedIn) {
      setUserName(userName);
    } else if (profileData?.userData?.Username) {
      setUserName(profileData?.userData?.Username);
    }
  }, [loggedIn, profileData?.userData?.Username, userName]);

  // SEND PROFILEPIC TO UPLOAD FUNCTION || NO NEED
  // useEffect(() => {
  //   if (profilePic) {
  //     async function uploadProfileImage() {
  //       const uploadedImg = await handleUploadClickAPI(
  //         profilePic,
  //         setUserDetails
  //       );
  //       return uploadedImg;
  //     }
  //     uploadProfileImage();
  //   }
  // }, [profilePic, setUserDetails]);

   // HANDLES THE PROFILE PIC UPLOAD CHANGE
  // async function handleChangeClick(event) {
  //   const selectedFile = event.target.files[0];
  //   setProfilePics(selectedFile);
  // }

  // GET POSTS
  useEffect(() => {
    async function getPost() {
      let userInfo = loggedIn ? userId : urlUsername;
      const Data = await getPostData(userInfo);
      setPost(Data.data.userPost);
    }
    getPost().catch((err) => console.error("error during getPost:", err));
  }, [imgUploaded, loggedIn, urlUsername]);

 
  // TOGGLE SETTINGS MODAL
  function handleSettingsModal() {
    setSettingsModal(true);
  }

  // NAVIGATE TO EDIT PROFILE || its on settingsModal
  // function handleEditProfile() {
  //   if (loggedIn) {
  //     navigate(`/settings/${urlUsername}/edit`);
  //   }
  // }

  // REMOVES LOGGEDIN USER DATA UPON LOGGING OUT
  function handleClick() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    logout();
  }

  return (
    <div className=" h-screen w-screen bg-slate-500 overflow-auto">
      {/* Header */}
      <div className="w-96  bg-gray-400 flex ml-10 items-center  justify-between">
        <div className=" relative inline-block bg-red-500">
          {/* CONDITIONAL RENDERING */}
          {/* <input
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            name="image"
            type="file"
            onChange={handleChangeClick}
          /> */}
          <div>
            <ProfileField width="8" height="8" profilePicUrl={profilePicUrl} />
          </div>
          {/* CONDITIONAL RENDERING */}
        </div>

        <div className="text-green-500 ml-6 text-2xl md:text-red-500 lg:text-blue-500">
          {UserName}
        </div>

        <div
          className="bg-amber-400 cursor-pointer"
          onClick={handleSettingsModal}
        >
          Settings
        </div>
      </div>
      {/* ------------SETTINGS MODAL------------- */}

      {settingsModal && (
        <SettingsModal
          logout={handleClick}
          onClose={() => setSettingsModal()}
          loggedIn={loggedIn}
          urlUsername={urlUsername}
        />
      )}

      {/* The grid */}
      <div className="bg-slate-500 grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
        {/* MAYBE ProfileGrid NEEDS A STABLE KEY */}
        {post.map((post, index) => (
          <ProfileGrid key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
