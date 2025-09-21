// import API from "API";
import API from "./axios.js";

// SAVE POST
export async function savePost(loggedUserId, postId) {
  try {
    const postSaved = await API.post("/user/savePost", {
      loggedUserId,
      postId,
    });

    return postSaved.data.saved;
  } catch (error) {
    console.log("error during savePost: ", error);
  }
}

// FETCH SAVED POST
export async function fetchSavedPost(loggedUserId) {
  try {
    const savedPost = await API.post("/user/fetchPost", { loggedUserId });
    return savedPost.data.savedPosts;
  } catch (error) {
    console.log("error during fetchSavePost: ", error);
  }
}

// FETCH LIKE POST
export async function fetchLikedPost(loggedUserId) {
  try {
    const likedPost = await API.post("/user/fetchLikedPost", {
      loggedUserId,
    });
    return likedPost.data.fetchedLikedPost;
  } catch (error) {
    console.log("error during fetchLikedPost: ", error);
  }
}

// BLOCK A USER
export async function blockUser(loggedUserId, postUserId) {
  try {
    const blockedUser = await API.post("/user/blockUser", {
      loggedUserId,
      postUserId,
    });
    return blockedUser.data;
  } catch (error) {
    console.log("error during blockUser: ", error);
    return false;
  }
}

// FETCH BLOCKED USERS
export async function fetchBockList(loggedUserId) {
  try {
    const blockedList = await API.post("/user/fetchBlockedUsers", {
      loggedUserId,
    });
    return blockedList.data.blockedList.blocked;
  } catch (error) {
    console.log("error during fetchBlockList: ", error);
  }
}

