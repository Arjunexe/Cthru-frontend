import React, { useContext, useEffect, useState } from "react";
import ProfileGrid from "../../components/profileLayouts/profileGrid";
import MainContext from "../../context/context";
import { fetchSavedPost } from "../../api/settingsAPi";

function SavedPosts() {
  const [post, setPost] = useState([]);
  const { userDetails } = useContext(MainContext);
  const loggedUserId = userDetails?.userData?._id || "";

  useEffect(() => {
    async function getSavedPost() {
      const savedPost = await fetchSavedPost(loggedUserId);
      
      setPost(savedPost);
    }

    getSavedPost();
  }, [loggedUserId]);

  return (
    <div className="h-screen bg-yellow-300 w-1/2">
      <div className="grid grid-cols-3 ">
        {post.map((post, index) => {
          return (
            <ProfileGrid key={index} post={post} />  /*Have to use return if there is no normal brackets*/
          );
        })}
      </div>
    </div>
  );
}

export default SavedPosts;
