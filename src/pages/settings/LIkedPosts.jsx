import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { fetchLikedPost } from "../../api/settingsAPi";
import MainContext from "../../context/context";

function LIkedPosts() {
  const [post, setPost] = useState([]);
  const { userDetails } = useContext(MainContext);
  const loggedUserId = userDetails?.userData?._id || "";

  useEffect(() => {
    async function getLikedPost() {
      try {
        const likePost = await fetchLikedPost(loggedUserId);
        if (likePost) {
          setPost(likePost);
        }
      } catch (error) {
        console.log("error during fetchLikedPost: ", error);
      }
    }

    getLikedPost();
  }, []);

  return (
    <div className="h-screen scrollbar no-scrollbar bg-slate-950  flex flex-row overflow-auto w-1/2">
      <div className="scrollbar no-scrollbar h-full bg-slate-950">
        {post.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
    </div>
  );
}

export default LIkedPosts;
