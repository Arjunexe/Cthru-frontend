import React, { useContext, useEffect, useState } from "react";
import "./Timeline.css";
// import Suggestion from "../suggestion/Suggestion";
import Post from "../post/Post";
import ImageContext from "../../context/context";
import { getPostData } from "../../api/prfileUploadAPI";

function Timeline() {
  const { imgUploaded } = useContext(ImageContext);
  const [postImagee, setPostImage] = useState([]);

  useEffect(() => {
    async function getImageUrl() {
      try {
        // GET ALL POST IMAGE AND BASED ID GET ALL USER DATA
        const response = await getPostData();
        setPostImage(response.data);
        // console.log("all dataa", response.data);
      } catch (error) {
        console.log("error duing getImageUrl frontend :", error);
      }
    }

    getImageUrl();
  }, [imgUploaded]);

  return (
    <div className=" md:h-full flex flex-row  ">
      <div className="">
        {postImagee.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
