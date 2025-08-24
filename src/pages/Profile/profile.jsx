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
    <div className="bg-slate-500 min-h-screen w-screen flex flex-col items-center overflow-auto">
      {/* Top section */}
      <div className="w-full flex flex-col items-center mt-6">
        <div className="relative inline-block">
          <ProfileField width="10" height="10" profilePicUrl={profilePicUrl} />
        </div>

        <div className="text-green-500 text-2xl mt-2">{UserName}</div>

        <div
          className="bg-amber-400 cursor-pointer px-4 py-1 mt-2 rounded"
          onClick={handleSettingsModal}
        >
          Settings
        </div>
      </div>

      {/* -------------Settings Modal--------------- */}
      {settingsModal && (
        <SettingsModal
          logout={handleClick}
          onClose={() => setSettingsModal(false)}
          loggedIn={loggedIn}
          urlUsername={urlUsername}
        />
      )}

      {/* -----------------Posts grid----------------- */}
      <div className="xl:px-56 lg:px-4 grid grid-cols-3 gap-1 sm:gap-1 md:gap-1 w-full ">
        {/* <div className="px-56 grid grid-cols-3 gap-1 sm:gap-2 md:gap-4"> */}
        {post.map((post, index) => (
          <ProfileGrid key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
