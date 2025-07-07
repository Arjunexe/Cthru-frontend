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
