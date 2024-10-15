import React, { useEffect, useState } from "react";
import "../post/Post.css";
// import MainContext from "../../hooks/context";
// import ProfileField from "../profileLayouts/ProfileField";

function Post({ post }) {
  const [realImg, setrealImg] = useState("");
  const [username, setUsername] = useState("");
  const [Dp, setDp] = useState("");
  // const { userDetails } = useContext(MainContext);

  useEffect(() => {
    let imagee = post.postImage;
    let username = post.userId.Username;
    let profilepic = post.userId.ProfilePic;
    // console.log("I got it hereee:", imagee);
    console.log("userName in POST Component: ", profilepic);

    setrealImg(imagee); // Update state with the fetched image URL
    setUsername(username);
    setDp(profilepic);
  }, [post.postImage, post.userId.ProfilePic,post.userId.Username ]);

  if (!post || post.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post">
      {/* PROFILE PICTURE AND NAME AND TIME */}
      <div className="post_header">
        <div className="post_author">
          <img className="timeline_profilePic" src={Dp} alt="" />
          {/* <ProfileField /> */}
          {username} • <span>12 h</span>
        </div>
        •••
      </div>

      {/* IMAGE */}
      <div className="post_image">
        <img className="post_image" src={realImg} alt="" />
      </div>

      {/* FOOTER */}
      <div className="post_footer"></div>
    </div>
  );
}

export default Post;
