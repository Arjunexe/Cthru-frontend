import { useContext, useEffect, useState } from "react";
import { handleFollowAPI, handleUnfollowApi } from "../../api/followAPI";
import MainContext from "../../context/context";

export default function FollowButton({ userID, setFollowCountStatus }) {
  // const [following, setFollowing] = useState("");
  const [flowstate, setflowState] = useState(null);

  const { userDetails, setUserDetails } = useContext(MainContext);

  const followInfo = userDetails?.userFollowData?.following;

  console.log("followInfo and UserId: ", userID);

  useEffect(() => {
    if (!followInfo || !userID) return;
    setflowState(followInfo.includes(userID));
  }, [followInfo, userID]);

  function handleFollow() {
    setflowState(true);
    setFollowCountStatus((prev) => prev + 1);
    handleFollowAPI(userID, setUserDetails);
  }
  function handleUnfollow() {
    setflowState(false);
    setFollowCountStatus((prev) => prev - 1);
    handleUnfollowApi(userID, setUserDetails);
  }

  return (
    <div>
      {flowstate === null ? null : flowstate ? (
        <button
          className="px-5 py-2 rounded-md bg-gray-500 text-white font-semibold text-sm hover:bg-gray-400 transition-all shadow-lg shadow-gray-600/20"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="px-7 py-2 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </div>
  );
}
