import React, { useEffect, useState } from "react";
import "../profileLayouts/profileModal.css";
import Post from "../post/Post";

function ProfileGrid({ post }) {
  const [img, setImage] = useState("");
  const [postExpand, setPostExpand] = useState(false);

  console.log("the post: ", post);
  const image = post.postImage;

  useEffect(() => {
    setImage(image);
  }, [post.postImage]);

  function handleProfilePost() {
    setPostExpand((prev) => !prev);
  }

  return (
    <div className="w-full">
      <div
        className="aspect-square overflow-hidden cursor-pointer"
        onClick={handleProfilePost}
      >
        <img className="w-full h-full object-cover p-1" src={img} alt="" />
      </div>

      {postExpand && (
        //  Modal Body
        <div
          className=" w-full h-full fixed top-0  left-0 flex justify-center items-center z-50 custom-modal"
          onClick={handleProfilePost}
        >
          {/* CHANGE THE BLUR THING LATER */}

          {/* Modal Content */}
          <div
            className=" relative   items-center  justify-center object-fill flex "
            onClick={(e) => e.stopPropagation()}
          >
            <Post post={post} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileGrid;
