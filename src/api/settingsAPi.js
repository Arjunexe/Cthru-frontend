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
export async function fetchSavedPost (loggedUserId){
  try {
    const savedPost = await axios.post("/user/fetchPost", {loggedUserId})
    
  } catch (error) {
    console.log("error during fetchSavePost: ", error);
    
    
  }
}