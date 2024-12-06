import React, { useEffect, useState } from 'react'

function UserChatBox({user}) {
  // console.log("the dataaaaaaaaaaa", user.Username);
  const [ userName, setUsername ] = useState("")

  useEffect (() => {
    const username = user.Username

    setUsername(username)

  })
  
  
  return (
    <div className='border bg-amber-400 cursor-pointer '>
      {userName}
    </div>
  )
}

export default UserChatBox