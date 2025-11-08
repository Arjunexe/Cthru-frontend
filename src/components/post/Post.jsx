import React, { useContext, useEffect, useState } from "react";
// import MainContext from "../../hooks/context";
import ProfileField from "../profileLayouts/ProfileField";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { handleFollowAPI, handleUnfollowApi } from "../../api/followAPI";
import MainContext from "../../context/context";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { handleLikeApi } from "../../api/prfileUploadAPI";
import { FcLike } from "react-icons/fc";
import CommentModal from "../modals/commentModal/CommentModal";
import OptionsModal from "../modals/optionsModal/OptionsModal";

function Post({ post }) {
  const [realImg, setrealImg] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicUrl, setDp] = useState("");
  const [following, setFollowing] = useState("");
  const [flowstate, setflowState] = useState("");
  // const [likeState, setLikeState] = useState(false);

  const [commentModal, setCommentModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const navigate = useNavigate();
  // const { toggleCommentModal } = useOutletContext();
  const { setImgUploaded, userDetails, setUserDetails } =
    useContext(MainContext);
  const [likeState, setLikeState] = useState(
    post.like.includes(userDetails?.userData?._id),
  );
  const followInfo = userDetails?.userFollowData?.following || [];
  const loggedUserId = userDetails?.userData?._id || "";

  let imagee = post.postImage;
  let usernamee = post.userId.Username;
  let profilepic = post.userId.ProfilePic;
  let userID = post.userId._id; // User Id of the post
  let postId = post._id; // Id of the post
  let saved = post.saved;

  useEffect(() => {
    //Accessing from prop was here
    setFollowing(userID);
    setrealImg(imagee); // Update state with the fetched image URL
    setUsername(usernamee);
    setDp(profilepic);

    if (followInfo.includes(following)) {
      setflowState(true);
    } else {
      setflowState(false);
    }
    // --------Like and Unlike ting---------
    // if (likesId.includes(loggedUserId)) {
    //   setLikeState(true);
    // } else {
    //   setLikeState(false);
    // }
  }, [
    post.postImage,
    post.userId.ProfilePic,
    post.userId.Username,
    post.userId._id,
    followInfo,
    following,
  ]);

  if (!post || post.length === 0) {
    return <div>Loading...</div>;
  }

  function handleProfileClick() {
    // console.log("random profile Id: ", usernamee);
    // it doesn't work when its 671fad17ad017a8d3070fbe7
    const urlUsername = usernamee;
    navigate(`/${urlUsername}`);
  }

  // Handle follow $ unfollow
  function handleFollow() {
    handleFollowAPI(following, setUserDetails);
  }
  function handleUnfollow() {
    handleUnfollowApi(following, setUserDetails);
  }

  // Handle Like $ unlike
  async function handleLikeOrUnlike() {
    try {
      const postLiked = await handleLikeApi(loggedUserId, postId, likeState);

      if (postLiked) {
        setLikeState(true);
      } else {
        setLikeState(false);
      }
    } catch (error) {
      console.log("error during handleLikeApi: ", error);
    }
  }

  return (
    <div
      className="mt-5 bg-white/15 rounded-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_8px_32px_rgba(0,0,0,0.3)]
      hover:bg-white/20 transition p-4 "
    >
      {/* Actual post content sits ABOVE the blur */}
      <div className=" flex items-center space-x-2 justify-between mb-3">
        {/* profile pic & userName */}
        <div
          className=" flex items-center space-x-2 cursor-pointer"
          onClick={handleProfileClick}
        >
          <ProfileField width="2" height="2" profilePicUrl={profilePicUrl} />
          <span className="font-medium text-white">{username} •</span>

          {/* -------------------------------------------------------- */}

          <div className="" onClick={(e) => e.stopPropagation()}>
            {!flowstate && (
              <button
                className="bg-black ml-3 cursor-pointer px-2 py-1 text-xs rounded "
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
        </div>

        <button
          className="cursor-pointer"
          onClick={() => {
            setOptionsModal(true);
          }}
        >
          <SlOptionsVertical />
        </button>
      </div>

      <img
        className=" rounded-xl border border-white/10 w-full max-w-[468px] max-h-[585px] h-auto flex items-center justify-center  object-contain transition-transform "
        src={realImg}
        alt=""
      />
      {/* ----------Like and Comment------------ */}
      <div className="flex mt-3 text-white/80">
        <button className="cursor-pointer" onClick={handleLikeOrUnlike}>
          {likeState ? <FcLike size={25} /> : <FaRegHeart size={25} />}
        </button>
        {/* -----------Comment--------- */}
        <button className="ml-3" onClick={() => setCommentModal(true)}>
          <FaRegComment size={25} />
        </button>

        {commentModal && (
          <CommentModal
            onClose={() => setCommentModal(false)}
            postId={postId}
            loggedUserId={loggedUserId}
          />
        )}
      </div>

      {optionsModal && (
        <OptionsModal
          realImg={realImg}
          onClose={() => setOptionsModal(false)}
          setImgUploaded={setImgUploaded}
          flowstate={flowstate}
          handleUnfollow={handleUnfollow}
          loggedUserId={loggedUserId}
          postId={postId}
          saved={saved}
          postUserId={following}
        />
      )}
    </div>
  );
}

export default Post;
