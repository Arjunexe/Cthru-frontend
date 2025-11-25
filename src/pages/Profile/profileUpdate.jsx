import React, { useContext, useEffect, useState } from "react";
import ProfileField from "../../components/profileLayouts/ProfileField";
import MainContext from "../../context/context";
import { getPostData } from "../../api/prfileUploadAPI";
import SessionContext from "../../context/SessionContext";
import ProfileGrid from "../../components/profileLayouts/profileGrid";
import { useNavigate, useParams } from "react-router-dom";
import SettingsModal from "../../components/modals/settingsModal/SettingsModal";

export default function Profile() {
  // --- CONTEXT & STATE ---
  const { logout } = useContext(SessionContext);
  const { userDetails, imgUploaded } = useContext(MainContext);
  const { urlUsername } = useParams();
  const navigate = useNavigate();

  const [profilePicUrl, setProfilePic] = useState("");
  const [UserName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [post, setPost] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [settingsModal, setSettingsModal] = useState(false);

  // --- DATA HELPERS ---
  const contextUserName = userDetails?.userData?.Username || "Guest";
  const contextDP = userDetails?.userData?.ProfilePic || "";
  const contextUserId = userDetails?.userData?._id || "Guest";

  // Determine which data source to use (Context if logged in, API if public)
  const currentProfileData = loggedIn
    ? userDetails?.userData
    : profileData?.userData;

  // Calculate Stats safely (defaults to 0 if data is missing)
  const postCount = post?.length || 0;
  const followerCount = currentProfileData?.Followers?.length || 0;
  const followingCount = currentProfileData?.Following?.length || 0;
  // Placeholder for Bio since it wasn't in your original state, but good for UI
  const bioText = currentProfileData?.Bio || "";

  // --- EFFECTS ---

  // 1. Check if User is Logged In
  useEffect(() => {
    if (contextUserName === urlUsername) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [contextUserName, urlUsername]);

  // 2. Fetch Public Profile Data (if not logged in)
  useEffect(() => {
    async function getProfile() {
      if (loggedIn) return;
      try {
        const response = await getPostData(urlUsername);
        if (response.status === 200) {
          setProfileData(response.data);
        } else {
          // navigate("/error"); // Optional: Uncomment if you want to redirect on error
          console.log("User not found");
        }
      } catch (error) {
        console.log("error during getProfile: ", error);
        navigate("/error");
      }
    }
    getProfile();
  }, [loggedIn, urlUsername, navigate]);

  // 3. Set Display Data (Profile Pic & Username)
  useEffect(() => {
    if (loggedIn) {
      setProfilePic(contextDP);
      setUserName(contextUserName);
    } else if (profileData?.userData) {
      setProfilePic(profileData.userData.ProfilePic);
      setUserName(profileData.userData.Username);
    }
  }, [contextDP, userDetails, profileData, loggedIn, contextUserName]);

  // 4. Get Posts
  useEffect(() => {
    async function getPost() {
      const userInfo = loggedIn ? contextUserId : urlUsername;
      if (!userInfo || userInfo === "Guest") return;

      try {
        const Data = await getPostData(userInfo);
        if (Data?.data?.userPost) {
          setPost(Data.data.userPost);
        }
      } catch (err) {
        console.error("error during getPost:", err);
      }
    }
    getPost();
  }, [imgUploaded, loggedIn, urlUsername, contextUserId]);

  // --- HANDLERS ---

  function handleSettingsModal() {
    setSettingsModal(true);
  }

  function handleClick() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    logout();
  }

  // --- RENDER ---
  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-y-auto bg-[#0f0f0f] text-white">
      {/* ------------- Settings Modal --------------- */}
      {settingsModal && (
        <SettingsModal
          logout={handleClick}
          onClose={() => setSettingsModal(false)}
          loggedIn={loggedIn}
          urlUsername={urlUsername}
        />
      )}

      {/* ------------- New Profile Header Design --------------- */}
      <div className="w-full relative mb-8">
        {/* 1. Artificial "Cover Photo" Gradient */}
        <div className="h-48 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-80"></div>

        {/* 2. Floating Profile Content */}
        <div className="relative -mt-24 flex flex-col items-center px-4">
          {/* Avatar with thick border to pop against the background */}
          <div className="p-1 bg-[#0f0f0f] rounded-full">
            <div className="p-1 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full">
              <div className="bg-black rounded-full border-[4px] border-[#0f0f0f] overflow-hidden">
                {/* Increased size to 32 to match the grander layout */}
                <ProfileField
                  width="10"
                  height="10"
                  profilePicUrl={profilePicUrl}
                />
              </div>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold tracking-wide text-white">
              {UserName}
            </h1>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              {bioText || "Digital Creator • Photographer • Traveler"}
            </p>
          </div>

          {/* Action Button (Pill Shaped) */}
          <div className="mt-6">
            {loggedIn ? (
              <button
                onClick={handleSettingsModal}
                className="px-8 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all shadow-lg shadow-white/10"
              >
                Edit Profile
              </button>
            ) : (
              <button className="px-8 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                Follow
              </button>
            )}
          </div>

          {/* Stats Row - "Card Style" */}
          <div className="flex items-center gap-4 mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-6 py-3 rounded-2xl shadow-xl">
            <div className="flex flex-col items-center px-4">
              <span className="text-xl font-bold text-white">{postCount}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Posts
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-gray-700"></div>

            <div className="flex flex-col items-center px-4 cursor-pointer hover:opacity-80 transition">
              <span className="text-xl font-bold text-white">
                {followerCount}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Followers
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-gray-700"></div>

            <div className="flex flex-col items-center px-4 cursor-pointer hover:opacity-80 transition">
              <span className="text-xl font-bold text-white">
                {followingCount}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Following
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- Posts Grid ----------------- */}
      <div className="w-full max-w-6xl px-2 md:px-8 pb-12">
        <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm font-medium uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          Recent Posts
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
          {post.map((postItem, index) => (
            <ProfileGrid key={index} post={postItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
