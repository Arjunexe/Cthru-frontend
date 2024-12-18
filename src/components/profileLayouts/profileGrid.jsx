import React, { useEffect, useState } from "react";
import Post from "../post/Post";

function ProfileGrid({ post }) {
  const [img, setImage] = useState("");
  const [postExpand, setPostExpand] = useState(false);

  const image = post.postImage;

  useEffect(() => {
    setImage(image);
  }, [post.postImage]);

  function handleProfilePost() {
    setPostExpand((prev) => !prev);
  }

  return (
    <div>
      <div
        className="aspect-square bg-lime-600 overflow-hidden cursor-pointer"
        onClick={handleProfilePost}
      >
        <img className="w-full h-full object-cover" src={img} alt="" />
      </div>

      {postExpand && (
        //  Modal Body
        <div
          className="bg-red-600 w-full h-full fixed top-0 left-0 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleProfilePost}
        >
          {/* Modal Content */}
          <div className="bg-white rounded shadow-lg relative  h-modal w-1/2 flex items-center justify-center object-contain " onClick={(e) => e.stopPropagation()}>
            <Post post={post} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileGrid;
