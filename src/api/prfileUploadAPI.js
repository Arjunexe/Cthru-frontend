import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../jwt/jwt";
import { extractPublicId } from "cloudinary-build-url";
// import { useId } from "react";

//------------ PROFILE AND POST ----------------

// TO HANDLE CHANGE IN PROFILE FIELD  || COMMENTED THIS CODE CAUSE ITS ALREADY IN profileUplaod.jsx
// export async function handleChangeClickAPI(
//   event,
//   setProfilePic,
//   setProfilePicUrl
// ) {
//   try {
//     const selectedFile = event.target.files[0];
//     setProfilePic(selectedFile);

//     const fileURL = URL.createObjectURL(selectedFile);

//     setProfilePicUrl(fileURL);
//   } catch (error) {
//     console.log("error during handleChangeClickAPI", error);
//   }
// }

// HANDLE UPLOAD CLICK PROFILE PICTURE
export async function handleUploadClickAPI(profilePic, setUserDetails) {
  if (!profilePic) {
    alert("no image detected");
    return;
  }

  const formData = new FormData();
  formData.append("file", profilePic);
  formData.append("upload_preset", "E-commerceee");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/da05006gl/image/upload",
      formData,
    );
    const sendImgResult = await sendProfileImgUrl(
      response.data.secure_url,
      setUserDetails,
    );
    return sendImgResult;
  } catch (error) {
    console.log("error during handleUploadClickAPI :", error);
  }
}

// SENDING PROFILE PIC AND USER ID TO BACKEND THEN UPDATES THE CONTEXT | NOT USING EXPORT CAUSE ITS IN THE SAME PAGE!
async function sendProfileImgUrl(url, setUserDetails) {
  const Token = localStorage.getItem(jwtToken);
  if (Token) {
    try {
      const decode = jwtDecode(Token);
      const userId = decode.userId;
      const response = await axios.post("/user/profileImgUrl", {
        ProfilePic: url,
        userId: userId,
      });
      // COPIES response.data.ProfilePicData INTO userData OBJECT( ALSO INSIDE ANOTHER OBJECT )
      setUserDetails({ userData: { ...response.data.ProfilePicData } });
      return response;
    } catch (error) {
      console.log("error during sendImgUrl :", error);
    }
  }
}

// HOME PAGE FOR USER DATA AND PROFILE PAGE FOR POST
export async function getPostData(userId) {
  console.log("optional id: ", userId);

  try {
    const url = userId ? `/user/getUser/${userId}` : "/user/getUrl";

    const response = await axios.get(url);
    console.log("responseeeeee: ", response);

    return response;
  } catch (error) {
    console.log("error during getPostData: ", error);
    return error;
  }
}

// DELETE POST BY SENDING PUBLIC ID AND POST LINK
export async function deletePost(publicId, postImg, setImgUploaded) {
  try {
    const deleted = await axios.post("/user/deletePost", {
      publicId,
      postImg,
    });
    console.log("its hereeeeeee: ", deleted.data.success);
    setImgUploaded(deleted.data.success);
    if (deleted.data.success) return deleted.data.success;
  } catch (error) {
    console.log("error during deletePost: ", error);
  }
}

// DELTE PROFILE PIC ONLY FROM CLOUDINARY
export async function delteFromCloudinaryAPI(image) {
  const publicId = extractPublicId(image);
  try {
    const deleteFromCloudinary = await axios.post("/user/deleteFromCloud", {
      publicId,
    });
    if (!deleteFromCloudinary) {
      console.error("image not deleted form the cloud: ", deleteFromCloudinary);
    }
  } catch (error) {
    console.log("error during delteFromCloudinaryAPI: ", error);
  }
}

// Handle Like post
export async function handleLikeApi(loggedUserId, postId, likeState) {
  try {
    const postLiked = await axios.post("/user/likePost", {
      loggedUserId,
      postId,
      likeState,
    });

    return postLiked.data.liked;
  } catch (error) {
    console.log("error during handleLikeApi: ", error);
  }
}

// GET COMMENT LIST
export async function getCommentList(postId, pageNum) {
  try {
    const commentList = await axios.get("/user/getCommentList", {
      params: {
        postId: postId,
        pageNum: pageNum,
      },
    });
    console.log("somehow :", commentList.data.commentList);

    return commentList.data.commentList;
  } catch (error) {
    console.log("error during getCommentList: ", error);
  }
}

// POST A COMMENT
export async function handleComment(comment, commentId) {
  try {
    const commented = await axios.post("/user/commentPost", {
      comment,
      commentId,
    });
    console.log("I am here :", commented.data);

    return true;
  } catch (error) {
    console.log("error during handlComment: ", error);
    throw error;
  }
}

// FETCH NOTIFICATION DATA
export async function getNotification(userId) {
  try {
    const response = await axios.get(`/user/getNotificationData/${userId}`);
    return response.data.notificationData;
  } catch (error) {
    console.log("error during getNotification: ", error);
  }
}

// CHANGE NOTIFICATION FLAG
export async function flagChangeApi(userID, flag) {
  try {
    console.log("its herer but");
    const { data } = await axios.patch("/user/changeFlag", {
      userID,
      flag,
    });
    console.log("kjfla falkfj  fkadfaj: ", data.notificationFlag);
    return !!data.notificationFlag;
  } catch (error) {
    console.log("error during flagChangeApi: ", error);
  }
}
