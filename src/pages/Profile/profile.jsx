import React, { useContext, useEffect, useState } from "react";
// import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../context/context";
import { getPostData } from "../../api/prfileUploadAPI";
import SessionContext from "../../context/SessionContext";
import ProfileGrid from "../../components/profileLayouts/profileGrid";
import { useNavigate, useParams } from "react-router-dom";
import SettingsModal from "../../components/modals/settingsModal/SettingsModal";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  // CONTEXT & STATE
  const [profilePicUrl, setProfilePic] = useState("");
  const [UserName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [postImage, setPost] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [settingsModal, setSettingsModal] = useState(false);

  const navigate = useNavigate();
  const { urlUsername } = useParams();
  const { userDetails, imgUploaded } = useContext(MainContext);
  const { logout } = useContext(SessionContext);

  const userName = userDetails?.userData?.Username || "Guest";
  const DP = userDetails?.userData?.ProfilePic || "Guest";
  const userId = userDetails?.userData?._id || "Guest";

  // PROFILE DATA FOR STATS
  // const currentProfileData = loggedIn
  //   ? userDetails?.userData
  //   : profileData?.userData;

  // FOLLOWER DATA FOR STATS
  const currentFollowerData = loggedIn
    ? userDetails?.userFollowData
    : profileData?.userFollowData;

  const currnetProfileId = profileData?.userData?._id;
  const followerCount = currentFollowerData?.followers?.length || 0;
  const followingCount = currentFollowerData?.following?.length || 0;
  const postCount = postImage?.length || 0;
  const bioText = userDetails?.userData?.Bio || "";

  // CHECK IF THE USER IS LOGGED IN OR NOT
  useEffect(() => {
    function checkLoggedIn() {
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

  // GET POSTS
  useEffect(() => {
    async function getPost() {
      let userInfo = loggedIn ? userId : urlUsername;
      const response = await getPostData(userInfo);
      console.log("the userPost :", response);
      setPost(response.data.userPost);
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
    <div className=" h-screen w-screen flex flex-col items-center overflow-auto">
      {/* --------------Header----------- */}

      <ProfileHeader
        profilePicUrl={profilePicUrl}
        handleSettingsModal={handleSettingsModal}
        UserName={UserName}
        bioText={bioText}
        postCount={postCount}
        followingCount={followingCount}
        followerCount={followerCount}
        loggedIn={loggedIn}
        currnetProfileId={currnetProfileId}
        urlUsername={urlUsername}
      />

      {/* -----------------Posts grid----------------- */}
      <div className="xl:px-56 lg:px-4 grid grid-cols-3 gap-1 sm:gap-1 md:gap-1 w-full ">
        {/* <div className="px-56 grid grid-cols-3 gap-1 sm:gap-2 md:gap-4"> */}
        {postImage.map((post, index) => (
          <ProfileGrid key={index} post={post} />
        ))}
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
    </div>
  );
}
