import React, { useContext, useState } from 'react'
import UserChatBox from './UserChatBox'
import MainContext from '../../hooks/context'
import axios from 'axios'

function UserChatList() {
const { userDetails } = useContext (MainContext)
const [ following, setFollowing ] = useState([])

const followInfo = userDetails?.userFollowData?.following || []
console.log("sssssssssssssssssss", followInfo);

async function getFollowing () {
  try {
    const response = await axios.post('http://localhost:5000/messages/getFollowing',{ followingId : following})
    
  } catch (error) {
    console.log("error during getFollowing: ", error);
    
  }
}



  return (
    <div className='bg-gray-600 h-screen w-80  '>
        <div className=' font-bold bg-yellow-200 justify-center flex'>
          <h1>Messages</h1>
          </div>
          <div className=' pt-4 bg-red-800 w-auto '>
             <UserChatBox />
          </div>   
    
  </div>
  )
}

export default UserChatList