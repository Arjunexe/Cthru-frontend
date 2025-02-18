import React, { useEffect, useState } from 'react'

function UserListBox({user}) {
    const [ userName, setUsername ] = useState("")
    
useEffect(() => {
  if(user) {
    const username = user
    setUsername(username)
  } else {
    const username = "Nothing to show"
    setUsername(username)
  }

},[])


  return (
    <div className='border bg-red-600 cursor-pointer'>{userName}</div>
  )
}

export default UserListBox