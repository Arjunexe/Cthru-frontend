import React from 'react'
import ProfileField from '../profileLayouts/ProfileField'

function Comment({comment}) {
  
  return (
    <div className='bg-red-600 flex'>
       <ProfileField />
      {comment.text}
    </div>
  )
}

export default Comment