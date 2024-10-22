import React, { useEffect, useState } from "react";
import "../post/Post.css";
// import MainContext from "../../hooks/context";
import ProfileField from "../profileLayouts/ProfileField";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { handleFollowAPI } from "../../api/followAPI";



function Post({ post }) {
  const [realImg, setrealImg] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicUrl, setDp] = useState("");
  const [following, setFollowing ] = useState("")

  useEffect(() => {
    let imagee = post.postImage;
    let username = post.userId.Username;
    let profilepic = post.userId.ProfilePic;
    let userID = post.userId._id
    console.log("userName in POST Component: ", userID);
  
    setFollowing(userID)
    setrealImg(imagee); // Update state with the fetched image URL
    setUsername(username);
    setDp(profilepic);

  }, [post.postImage, post.userId.ProfilePic, post.userId.Username, post.userId._id]);

  if (!post || post.length === 0) {
    return <div>Loading...</div>;
  }
  function handleFollow (){
   
    handleFollowAPI(following)
    
  }

  return (
    <div className="mt-5 ">

      <div className="flex {*bg-orange-700*} ">
        <div className="">
          <div className="">
            <ProfileField width="2" height="2" profilePicUrl={profilePicUrl} />
          </div>
          {username} • 
{/* -------------------------------------------------------- */}
          <span className="bg-white ml-3 cursor-pointer" onClick={handleFollow}>Follow</span>

        </div>
      </div>

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
