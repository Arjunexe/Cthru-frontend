import axios from "axios";

// SAVE POST
export async function savePost(loggedUserId, postId) {
  try {
    const postSaved = await axios.post("/user/savePost", {
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
    const savedPost = await axios.post("/user/fetchPost", { loggedUserId });
    return savedPost.data.savedPosts;
  } catch (error) {
    console.log("error during fetchSavePost: ", error);
  }
}

// FETCH LIKE POST
export async function fetchLikedPost(loggedUserId) {
  try {
    const likedPost = await axios.post("/user/fetchLikedPost", {
      loggedUserId,
    });
    return likedPost.data.fetchedLikedPost;
  } catch (error) {
    console.log("error during fetchLikedPost: ", error);
  }
}
