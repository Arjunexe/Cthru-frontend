import React, { useContext, useEffect, useState } from "react";
import "../post/Post.css";
// import MainContext from "../../hooks/context";
import { useOutletContext } from "react-router-dom";
import ProfileField from "../profileLayouts/ProfileField";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { handleFollowAPI, handleUnfollowApi } from "../../api/followAPI";
import MainContext from "../../context/context";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { extractPublicId } from "cloudinary-build-url";
import { deletePost, handleLikeApi } from "../../api/prfileUploadAPI";
import { FcLike } from "react-icons/fc";
import PortalModal from "../modals/commentModal/PortalModal";
import Exampl from "../modals/commentModal/exampl";
import CommentModal from "../modals/commentModal/CommentModal";
import OptionsModal from "../modals/optionsModal/OptionsModal";

function Post({ post }) {
  const [realImg, setrealImg] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicUrl, setDp] = useState("");
  const [following, setFollowing] = useState("");
  const [flowstate, setflowState] = useState("");
  // const [likeState, setLikeState] = useState(false);

  const [modal, setModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const navigate = useNavigate();
  // const { toggleCommentModal } = useOutletContext();
  const { setImgUploaded, userDetails, setUserDetails } =
    useContext(MainContext);
  const [likeState, setLikeState] = useState(
    post.like.includes(userDetails?.userData?._id)
  );
  const followInfo = userDetails?.userFollowData?.following || [];
  const loggedUserId = userDetails?.userData?._id || "";

  // if(followInfo.includes(following)){
  //   setflowState(followInfo)
  //  } else {
  //   setflowState("")
  //  }

  let imagee = post.postImage;
  let usernamee = post.userId.Username;
  let profilepic = post.userId.ProfilePic;
  let userID = post.userId._id; // User Id of the post
  let postId = post._id; // Id of the post
  let likesId = post.like;

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

  // Move this to OptionsModal component later!
  // To delete post
  function handleOptions() {
    const publicId = extractPublicId(realImg);
    deletePost(publicId, realImg, setImgUploaded);
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

  function handleComment() {}

  return (
    <div className="mt-5 bg-yellow-300 rounded-lg">
      {/* <div className="flex {*bg-orange-700*} "> */}
      <div className=" flex items-center space-x-2 justify-between">
        {/* profile pic & userName */}
        <div
          className=" flex items-center space-x-2 cursor-pointer bg-red-600"
          onClick={handleProfileClick}
        >
          <ProfileField width="2" height="2" profilePicUrl={profilePicUrl} />
          <span className="text-white">{username} •</span>

          {/* -------------------------------------------------------- */}

          <div className="" onClick={(e) => e.stopPropagation()}>
            {!flowstate && (
              <span
                className="bg-white ml-3 cursor-pointer px-2 py-1 text-xs rounded "
                onClick={handleFollow}
              >
                Follow
              </span>
            )}
          </div>
        </div>

        <div
          className="bg-lime-700 cursor-pointer"
          onClick={() => {
            setOptionsModal(true);
          }}
        >
          <SlOptionsVertical />
        </div>
      </div>

      {/* </div> */}

      <img
        className="w-full max-w-[468px] max-h-[585px] h-auto flex items-center justify-center  object-contain border-2 border-[#969696] transition-transform "
        src={realImg}
        alt=""
      />
      {/* ----------Like and Comment------------ */}
      <div className="flex mt-2">
        <div className="cursor-pointer" onClick={handleLikeOrUnlike}>
          {likeState ? <FcLike size={25} /> : <FaRegHeart size={25} />}
        </div>
        {/* -----------Comment--------- */}
        <div
          className="ml-3"
          // onClick={() =>
          //   toggleCommentModal({
          //     postId,
          //     loggedUserId,
          //   })
          // }
          onClick={() => setCommentModal(true)}
        >
          <FaRegComment size={25} />
        </div>

        {commentModal && (
          <CommentModal
            onClose={() => setCommentModal(false)}
            postId={postId}
            loggedUserId={loggedUserId}
          />
        )}
        {/* 
        <button className="bg-blue-600" onClick={() => setCommentModal(true)}>
          Close
        </button>

        <button className="bg-red-600" onClick={() => setModal(true)}>
          Close
        </button>
        {modal && <Exampl onClose={() => setModal(false)} />} */}
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
        />
      )}
    </div>
  );
}

export default Post;
