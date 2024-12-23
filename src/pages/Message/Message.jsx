import React, { useContext } from 'react'
import UserChatList from '../../components/chat/UserChatList'
import MainContext from '../../context/context'

function Message() {

  // const { userDetails } = useContext(MainContext)
  // const followingData = userDetails?.userFollowData?.following || []
  // console.log("followind DAtatat  :", followingData);

  return (
    
    <>
    <UserChatList />
    </>

  )
}

export default Message