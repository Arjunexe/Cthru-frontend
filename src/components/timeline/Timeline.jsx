import React, { useContext, useEffect, useState } from "react";
// import Suggestion from "../suggestion/Suggestion";
import Post from "../post/Post";
import ImageContext from "../../context/context";
import { getHomePostData, getPostData } from "../../api/prfileUploadAPI";
import MainContext from "../../context/context";

function Timeline() {
  const [postImagee, setPostImage] = useState([]);

  const { imgUploaded } = useContext(ImageContext);
  const { userDetails } = useContext(MainContext);

  const userId = userDetails?.userData?._id | "";

  useEffect(() => {
    async function getImageUrl() {
      try {
        // GET ALL POST IMAGE AND BASED ID GET ALL USER DATA
        const response = await getPostData();
        // const response = await getHomePostData(userId);
        setPostImage(response.data);
        console.log("all dataa", response.data);
      } catch (error) {
        console.log("error duing getImageUrl frontend :", error);
      }
    }

    getImageUrl();
  }, [imgUploaded]);

  return (
    <div className=" md:h-full block">
      <div className="">
        {postImagee.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
