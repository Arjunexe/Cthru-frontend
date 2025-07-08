import React, { useContext, useEffect } from 'react'
import Post from '../../components/post/Post'
import { fetchLikedPost } from '../../api/settingsAPi';
import MainContext from '../../context/context';

function LIkedPosts() {

  const {userDetails} = useContext(MainContext)
  const loggedUserId = userDetails?.userData?._id || ""


  useEffect(() => {
    
    async function getLikedPost (){
      try {
       const likePost = await fetchLikedPost(loggedUserId)
      } catch (error) {
       console.log("error during fetchLikedPost: ", error);
        
      }
    } 

    getLikedPost ()
    
  }, [])
  

  return (
    <div className='h-screen w-2/2'>
      <div>
<h1>hi</h1>        {/* <Post /> */} 
      </div>
    </div>
  )
}

export default LIkedPosts