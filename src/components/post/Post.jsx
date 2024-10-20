import React, { useEffect, useState } from "react";
import "../post/Post.css";
// import MainContext from "../../hooks/context";
import ProfileField from "../profileLayouts/ProfileField";

function Post({ post }) {
  const [realImg, setrealImg] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicUrl, setDp] = useState("");

  useEffect(() => {
    let imagee = post.postImage;
    let username = post.userId.Username;
    let profilepic = post.userId.ProfilePic;
    console.log("userName in POST Component: ", profilepic);

    setrealImg(imagee); // Update state with the fetched image URL
    setUsername(username);
    setDp(profilepic);
  }, [post.postImage, post.userId.ProfilePic, post.userId.Username]);

  if (!post || post.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 bg-amber-900">

      <div className="flex bg-orange-700">
        <div className="post_author">
          <div className="">
            <ProfileField profilePicUrl={profilePicUrl} />
          </div>
          {username} • <span>12 h</span>
        </div>
      </div>

      <img
        className="w-full max-w-[468px] h-auto flex items-center justify-center  object-contain border-4 border-[#17171b] transition-transform "
        src={realImg}
        alt=""
      />
      {/* FOOTER */}
      <div className="footer">
        comment
      </div>
    </div>
  );
}

export default Post;
