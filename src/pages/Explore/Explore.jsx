import React, { useEffect, useState } from "react";
import { getPostData } from "../../api/prfileUploadAPI";
import ProfileGrid from "../../components/profileLayouts/profileGrid";

function Explore() {
  const [postImage, setPostImage] = useState([]);

  useEffect(() => {
    async function getImageUrl() {
      try {
        const response = await getPostData();
        setPostImage(response.data);
      } catch (error) {
        console.log("error during getImageUrl: ", error);
      }
    }
    getImageUrl();
  }, []);

  return (
    <div className="w-full bg-slate-600 h-screen">
      <div className="p-4 m-8 grid grid-cols-4">
        {postImage.map((post, index) => {
          return <ProfileGrid key={index} post={post} />;
        })}
      </div>
    </div>
  );
}

export default Explore;
