import FollowButton from "../../components/button/FollowButton";
import ProfileField from "../../components/profileLayouts/ProfileField";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({
  profilePicUrl,
  handleSettingsModal,
  UserName,
  bioText,
  postCount,
  followingCount,
  followerCount,
  loggedIn,
  currnetProfileId,
  urlUsername,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full relative mb-8 mt-32">
      {/* 1. Artificial "Cover Photo" Gradient */}
      {/* <div className="h-48 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-80"></div> */}
      {/**/}
      {/* 2. Floating Profile Content */}
      <div className="relative -mt-24 flex flex-col items-center px-4">
        {/* Avatar with thick border to pop against the background */}
        <div className="p-1 bg-[#0f0f0f] rounded-full">
          {/* <div className="p-1 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full"> */}
          <div className="bg-black rounded-full border-[4px] border-[#0f0f0f] overflow-hidden">
            {/* Increased size to 32 to match the grander layout */}
            <ProfileField
              width="10"
              height="10"
              profilePicUrl={profilePicUrl}
            />
          </div>
          {/* </div> */}
        </div>

        {/* Name & Bio */}
        <div className="mt-4 text-center">
          <h1 className="text-3xl font-bold tracking-wide text-white">
            {UserName}
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            {bioText}
          </p>
        </div>

        {/* Action Button (Pill Shaped) */}
        <div className="flex mt-6">
          {loggedIn === null ? null : loggedIn ? (
            <button
              className="px-4 py-2 rounded-md bg-gray-500 text-white font-semibold text-sm hover:bg-gray-400 transition-all shadow-lg shadow-gray-600/20"
              onClick={() => {
                navigate(`/${urlUsername}/settings/edit`);
              }}
            >
              Edit Profile
            </button>
          ) : (
            <FollowButton userID={currnetProfileId} />
          )}

          <button
            onClick={handleSettingsModal}
            className="ml-2 px-2 py-1 rounded-md bg-white text-black font-semibold text-sm hover:bg-gray-300 transition-all shadow-lg shadow-white/10"
          >
            <Settings />
          </button>
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
  );
}
