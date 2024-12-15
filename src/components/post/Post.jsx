import React, { useContext, useEffect, useState } from "react";
import "../post/Post.css";
// import MainContext from "../../hooks/context";
import ProfileField from "../profileLayouts/ProfileField";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { handleFollowAPI, handleUnfollowApi } from "../../api/followAPI";
import MainContext from "../../hooks/context";
import { useNavigate } from "react-router-dom";



function Post({ post }) {
  const [ realImg, setrealImg] = useState("");
  const [ username, setUsername] = useState("");
  const [ profilePicUrl, setDp] = useState("");
  const [ following, setFollowing ] = useState("")
  const [ flowstate, setflowState ] = useState("")
  const navigate = useNavigate()
  const { userDetails, setUserDetails } = useContext(MainContext)
  const followInfo = userDetails?.userFollowData?.following || []
 
  // if(followInfo.includes(following)){
  //   setflowState(followInfo)
  //  } else {
  //   setflowState("")
  //  }

    let imagee = post.postImage;
    let usernamee = post.userId.Username;
    let profilepic = post.userId.ProfilePic;
    let userID = post.userId._id
  useEffect(() => {
 
    //Accessing from prop was here
 
    setFollowing(userID)
    setrealImg(imagee); // Update state with the fetched image URL
    setUsername(usernamee);
    setDp(profilepic);

    if (followInfo.includes(following)) {
      setflowState(true);
    } else {
      setflowState(false);
    }

  }, [post.postImage, post.userId.ProfilePic, post.userId.Username, post.userId._id,  followInfo, following  ]);

  if (!post || post.length === 0) {
    return <div>Loading...</div>;
  }

  function handleProfileClick(){
    console.log("random profile Id: ", usernamee);
    // it doesn't work when its 671fad17ad017a8d3070fbe7
    const urlUsername = usernamee
    navigate(`/${urlUsername}`)
  }
  
  // Handle follow $ unfollow
  function handleFollow (){
    handleFollowAPI(following, setUserDetails)
  }

  function handleUnfollow () {
    handleUnfollowApi( following, setUserDetails )
  }



  return (
    <div className="mt-5 ">

      {/* <div className="flex {*bg-orange-700*} "> */}
        <div className=" flex items-center space-x-2">
          {/* profile pic & userName */}
          <div className=" flex items-center space-x-2 cursor-pointer bg-red-600" onClick={handleProfileClick}>
            <ProfileField width="2" height="2" profilePicUrl={profilePicUrl} />
            <span className="text-white">{username} •</span>
          </div>
          
{/* -------------------------------------------------------- */}
            {flowstate ?( 
              <span className="bg-white ml-3 cursor-pointer px-2 py-1 text-xs rounded" onClick={handleUnfollow} >Unfollow</span>
            ) : (
              <span className="bg-white ml-3 cursor-pointer px-2 py-1 text-xs rounded" onClick={handleFollow}>Follow</span>
            )}        

        </div>
      {/* </div> */} 

      <img
        className="w-full max-w-[468px] max-h-[585px] h-auto flex items-center justify-center  object-contain border-2 border-[#969696] transition-transform "
        src={realImg}
        alt=""
      />
      {/* FOOTER */}
      <div className="flex mt-2">
        <div><FaRegHeart size={26} /></div>
        <div className="ml-3"> <FaRegComment size={26} /></div>
      
      </div>
    </div>
  );
}

export default Post;
