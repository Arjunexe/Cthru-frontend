import React, { useContext, useEffect, useState } from "react";
import "./Timeline.css";
// import Suggestion from "../suggestion/Suggestion";
import Post from "../post/Post";
import axios from "axios";
import ImageContext from "../../hooks/context";

function Timeline() {
  const { imgUploaded } = useContext(ImageContext);
  const [postImagee, setPostImage] = useState([]);

  useEffect(() => {
    async function getImageUrl() {
      try {
        console.log("working");
        // GET ALL POST IMAGE AND BASED ID GET ALL USER DATA
        const response = await axios.get("http://localhost:5000/user/getUrl");
        setPostImage(response.data);
        console.log("all data", response.data);
      } catch (error) {
        console.log("error duing getImageUrl frontend :", error);
      }
    }

    getImageUrl();
  }, [imgUploaded]);

  return (
    <div className="h-full flex flex-row overflow-auto no-scrollbar bg-lime-500">
      <div className="left_timeline">
        <div className="timeline_post">
          {postImagee.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>

      {/* <div className="right_timeline">
        <Suggestion />
      </div> */}
    </div>
  );
}

export default Timeline;
