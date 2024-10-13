import React, { useEffect, useState } from "react";
import "../post/Post.css";

function Post({post}) {

  const [realImg, setrealImg] = useState("")
  const [username, setUsername] = useState("")


  useEffect(() => {
    
      let imagee = post.postImage;
      let username = post.userId.Username;
      // console.log("I got it hereee:", imagee);
      console.log("userName in POST Component: ",username);
      
      setrealImg(imagee); // Update state with the fetched image URL
      setUsername(username)
    
  }, [post.postImage]);


  if (!post || post.length === 0) {
    return <div>Loading...</div>;
  }


  



  // const [postImage, setPostImage] = useState([]);

  // useEffect(() => {
  //   async function getImageUrl() {
  //     console.log("kinda working");
  //     const response = await axios.get("http://localhost:5000/user/getUrl");
  //     setPostImage(response.data[0]);
  //     console.log("kkkkkkkkkfffffffffffffffkkkkkk", response.data[0]);
  //   }

  //   getImageUrl();
  // }, []);
  // let imagee = postImagee[0].postImage
  // console.log("I got it hereee :",imagee );
  // setrealImg(imagee)


  let Profile_image =
    "https://media.wired.co.uk/photos/64f8ce9745eea1aad84ccc6c/16:9/w_2560%2Cc_limit/Studio-Ghibli-Ranked-Culture-HERON_img_1.jpg";

  // let post_image =
    /* "" */

    // "https://s3.amazonaws.com/media.thecrimson.com/photos/2020/11/06/010534_1346719.gif";

  return (
    // <div className="post">
    //   {/* PROFILE PICTURE AND NAME AND TIME */}
    //   <div className="post_header">
    //     <div className="post_author">
    //       <img className="timeline_profilePic" src={Profile_image} alt="" />
    //       Arjun • <span>12 h</span>
    //     </div>
    //     •••
    //   </div>

    //   {/* IMAGE */}
    //   <div className="post_image">

    //     {postImage.map(post => (

    //             <div key={post._id} className="image-item">
    //             <img className="post_image" src={post.postImage} alt="" />
    //             </div>

    //     ))}

    //   </div>

    //   {/* FOOTER */}
    //   <div className="post_footer">

    //   </div>
    //    </div>

    //   )

    

    //fffffffffffffffff




    
      <div className="post">
        {/* PROFILE PICTURE AND NAME AND TIME */}
        <div className="post_header">
          <div className="post_author">
            <img className="timeline_profilePic" src={Profile_image} alt="" />
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
