import React, { useContext, useEffect } from "react";
import ProfileGrid from "../../components/profileLayouts/profileGrid";
import MainContext from "../../context/context";
import { fetchSavedPost } from "../../api/settingsAPi";

function SavedPosts() {

  const { userDetails, setUserDetails } = useContext(MainContext)
  const loggedUserId = userDetails?.userData?._id || "meh"
  console.log("current user: ", loggedUserId);
  
  useEffect(() => {
    async function getSavedPost (){
      const savedPost = fetchSavedPost(loggedUserId)
      
    }

    getSavedPost() 
  
  }, [])
  


  return (
    <div className="h-screen bg-yellow-300 w-1/2">
      <div>
        {/* <ProfileGrid /> */}
      </div>
    </div>
  );
}

export default SavedPosts;
